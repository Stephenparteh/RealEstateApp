from datetime import datetime,date,timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Inquiry
from app.schemas.inquiry import InquirySchemas

inquiry_schemas = InquirySchemas()

class InquiryResource(Resource):
    @classmethod
    def post(cls):

        inquiry = inquiry_schemas.load(request.get_json())
        
        inquiry.save_to_db()

        return{"message" :"Inquiry created successfully."},201
    

class InquiryDetailResource(Resource):
    @classmethod
    def get (cls, inquiryid: int):
        inquiry = Inquiry.find_by_id(inquiryid)

        if not inquiry:
            return {"message": "Inquiry was not made"},404
        return inquiry_schemas.dump(inquiry),200
    
class InquiryUpdateResource(Resource):
    @classmethod
    def put(cls):
        inquiry_data = inquiry_schemas.load(request.get_json())

        inquiry = Inquiry.find_by_id(inquiry_data.id)

        if inquiry:
            Inquiry.save_to_db()
            return inquiry_data.dump(inquiry),200
        else:
            return {"message": "Inquiry is not found."},404
        
class InquiryDeleteResource(Resource):
    @classmethod
    def delete(cls, inquiryid:int):
        inquiry = Inquiry.find_by_id(inquiryid)

        if not inquiry:
            return {"message": "Inquiry is not found"},404
        inquiry.delete_from_db()
        return {"message": "Inquiry remove Successfully."}