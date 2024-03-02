from datetime import datetime, date, timedelta
import json
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Admin
from app.schemas.admin import AdminSchemas

admin_schemas = AdminSchemas()
admins_schemas = AdminSchemas(many = True)

class AdminRegister(Resource):
    @classmethod
    def post(cls):
        admin = admin_schemas.load(request.get_json()) #step 37

        if admin.find_by_email(admin.email):
            return {"message": "An admin with that email already exist."}, 400
        
        if admin.find_by_phoneNumber(admin.phoneNumber):
            return {"message": "An admin with that Phone Number already exist."}, 400
        
        admin.set_password(admin.password)

        admin.save_to_db()

        return {"message": "Admin created successfully."},201
    
class AdminLogin(Resource):
    @classmethod
    def post(cls):

        admin_data = admin_schemas.load(request.get_json())

        adminEmail = Admin.find_by_email(admin_data.email)
        adminNumber = Admin.find_by_phoneNumber(admin_data.phoneNumber)

        if adminEmail and adminEmail.check_password(admin_data.password):
            admin=adminEmail
        elif adminNumber and adminNumber.check_password(admin_data.password):
            admin=adminNumber
        else:
            return {"message": "Invalid Credentials"},401
        
        access_token = create_access_token(identity=admin.id,fresh=True)
        refresh_token = create_refresh_token(admin.id)

        return{
            "access_token" : access_token,
            "refresh_token" : refresh_token,
            "email": admin.email,
            "firstName": admin.firstName,
            "lastName": admin.lastName,
            "id": admin.id,
            "phoneNumber": admin.phoneNumber,
            "address": admin.address
        },200
    
class AdminDetailResource(Resource):
    @classmethod
    def get (cls, adminid: int):
        admin = Admin.find_by_id(adminid)

        if not admin:
            return {"message": "Admin is not found"},404
        return admin_schemas.dump(admin),200
    
class AdminPasswordUpdateResource(Resource):
    @classmethod
    def put(cls):
        admin_data = admin_schemas.load(request.get_json())

        admin = Admin.find_by_email(admin_data.email) or Admin.find_by_phoneNumber(admin_data.phoneNumber)

        if admin:
            admin.set_password(admin_data.password)
            admin.save_to_db()
            return admin_schemas.dump(admin),200
        else:
            return {"message": "Admin not found."},404
        
class UpdateAdminDetailResource(Resource):
    @classmethod
    def put(cls, adminId: int):
        data = admin_schemas.load(request.get_json())
        admin = Admin.find_by_id(adminId)

        if admin:
            admin.firstName = data.firstName
            admin.lastName = data.lastName
            admin.email = data.email
            admin.phoneNumber = data.phoneNumber
            admin.save_to_db()
        else:
            return {"message": "Admin not found"}
        return admin_schemas.dump(admin),200
        
class GetAllAdminResource(Resource):
    @classmethod
    def get(cls):
        admins = Admin.query.all()

        results = admins_schemas.dump(admins)
        return {'admins': results}, 200
        
class AdminDeleteResource(Resource):
    @classmethod
    def delete(cls,adminid:int):
        admin = Admin.find_by_id(adminid)

        if not admin:
            return {"message": "Admin is not found"},404
        admin.delete_from_db()
        return {"message": "Admin deleted Successfully."}