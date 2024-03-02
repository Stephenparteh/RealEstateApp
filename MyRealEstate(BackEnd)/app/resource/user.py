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
from app.models import User
from app.schemas.user import UserSchemas

user_schemas = UserSchemas()
users_schemas = UserSchemas(many = True)

class UserRegister(Resource):
    @classmethod
    def post(cls):
        user = user_schemas.load(request.get_json()) #step 37

        if user.find_by_email(user.email):
            return {"message": "An user with that email already exist."}, 400
        
        if user.find_by_phoneNumber(user.phoneNumber):
            return {"message": "An user with that Phone Number already exist."}, 400
        
        user.set_password(user.password)

        user.save_to_db()

        return {"message": "User created successfully."},201
    
class UserLoginResource(Resource):
    @classmethod
    def post(cls):

        user_data = user_schemas.load(request.get_json())

        userEmail = User.find_by_email(user_data.email)
        userNumber = User.find_by_phoneNumber(user_data.phoneNumber)

        if userEmail and userEmail.check_password(user_data.password):
            user=userEmail
        elif userNumber and userNumber.check_password(user_data.password):
            user=userNumber
        else:
            return {"message": "Invalid Credentials"},401
        
        access_token = create_access_token(identity=user.id,fresh=True)
        refresh_token = create_refresh_token(user.id)

        return{
            "access_token" : access_token,
            "refresh_token" : refresh_token,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "id": user.id,
            "phoneNumber": user.phoneNumber,
            "address": user.address
        },200
    
class UserDetailResource(Resource):
    @classmethod
    def get (cls, userid: int):
        user = User.find_by_id(userid)

        if not user:
            return {"message": "Admin is not found"},404
        return user_schemas.dump(user),200
    

class UpdateUserDetailResource(Resource):
    @classmethod
    def put(cls, userId: int):
        data = user_schemas.load(request.get_json())
        user = User.find_by_id(userId)

        if user:
            user.firstName = data.firstName
            user.lastName = data.lastName
            user.email = data.email
            user.phoneNumber = data.phoneNumber
            user.save_to_db()
        else:
            return {"message": "User not found"}
        return user_schemas.dump(user),200
    
class UserPasswordUpdateResource(Resource):
    @classmethod
    def put(cls):
        user_data = user_schemas.load(request.get_json())

        user = User.find_by_email(user_data.email) or User.find_by_phoneNumber(user_data.phoneNumber)

        if user:
            user.set_password(user_data.password)
            user.save_to_db()
            return user_schemas.dump(user),200
        else:
            return {"message": "user not found."},404
        
class GetAllUserResource(Resource):
    @classmethod
    def get(cls):
        users = User.query.all()

        results = users_schemas.dump(users)
        return {'users': results}, 200
        
class UserDeleteResource(Resource):
    @classmethod
    def delete(cls,userid:int):
        user = User.find_by_id(userid)

        if not user:
            return {"message": "User is not found"},404
        user.delete_from_db()
        return {"message": "User deleted Successfully."}