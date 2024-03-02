# 
from datetime import datetime
import json
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from app.models import Property
from app.schemas.property import PropertySchemas

property_schema = PropertySchemas()
properties_schema = PropertySchemas(many=True)

class CreatePropertyResource(Resource):
    @classmethod
    def post(cls):
            #  , propertyid:int):
        property_data = request.get_json()
        images = property_data.pop('images', [])

        property_data['images'] = images  # Assign images directly without converting to JSON string

        property = property_schema.load(property_data)
        property.save_to_db()

        # propertyid = Property.find_by_id(id)

        return {"message": "Property created successfully."},201
                # , "propertyid": propertyid}, 201
    
class AdminPropertyResource(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        admin_id = get_jwt_identity()
        admin_properties = Property.query.filter_by(admin_id=admin_id).all()
        serialized_properties = properties_schema.dump(admin_properties)

        return {"properties": serialized_properties}, 200
# class AdminPropertyResource(Resource):
#     @classmethod
#     @jwt_required()
#     def get(cls):
#         admin_id = get_jwt_identity()
#         admin_properties = Property.query.filter_by(admin_id=admin_id).all()
#         serialized_properties = properties_schema.dump(admin_properties)

#         return {"properties": serialized_properties}, 200

class GetAllPropertyResource(Resource):
    @classmethod
    def get(cls):
        properties = Property.query.all()
        serialized_properties = properties_schema.dump(properties)
        return {"properties": serialized_properties}, 200

class PropertyUpdateResource(Resource):
    @classmethod
    def put(cls, propertyid):
        property_data = property_schema.load(request.get_json())

        property = Property.find_by_id(propertyid)

        if property:
            property.title = property_data.title
            property.description = property_data.description
            property.price = property_data.price
            property.bedrooms = property_data.bedrooms
            property.bathrooms = property_data.bathrooms
            property.location  = property_data.location
            property.contact = property_data.contact
            property.type = property_data.type

            property.save_to_db()
        else:
            return {"message": "Property not found"}, 404
        return property_schema.dump(property), 200
        
            

class PropertyDeleteResource(Resource):
    @classmethod
    def delete(cls, propertyid:int):    
        property = Property.find_by_id(propertyid)

        if property:
            property.delete_from_db()
            return {"message": "Property deleted successfully."}, 200
        else:
            return {"message": "Property not found"}, 404
