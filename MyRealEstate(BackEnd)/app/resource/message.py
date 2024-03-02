from datetime import datetime,date,timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Message
from app.schemas.message import MessageSchemas

message_schemas = MessageSchemas()

class MessageResource(Resource):
    @classmethod
    def post(cls):

        message = message_schemas.load(request.get_json())
        
        message.save_to_db()

        return{"message" :"message created successfully."},201
    

class MessageDetailResource(Resource):
    @classmethod
    def get (cls, messageid: int):
        message = Message.find_by_id(messageid)

        if not message:
            return {"message": "message was not made"},404
        return message_schemas.dump(message),200
    
class MessageUpdateResource(Resource):
    @classmethod
    def put(cls):
        message_data = message_schemas.load(request.get_json())

        message = Message.find_by_id(message_data.id)

        if message:
            Message.save_to_db()
            return message_data.dump(message),200
        else:
            return {"message": "message is not found."},404
        
class MessageDeleteResource(Resource):
    @classmethod
    def delete(cls, messageid:int):
        message = Message.find_by_id(messageid)

        if not message:
            return {"message": "message is not found"},404
        message.delete_from_db()
        return {"message": "message remove Successfully."}