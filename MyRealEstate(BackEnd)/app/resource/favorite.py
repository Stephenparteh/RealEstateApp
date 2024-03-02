from datetime import datetime,date,timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Favorite
from app.schemas.favorite import FavoriteSchemas

favorite_schemas = FavoriteSchemas()

class FavoriteResource(Resource):
    @classmethod
    def post(cls):

        favorite = favorite_schemas.load(request.get_json())
        
        favorite.save_to_db()

        return{"message":"Property added to favorite list successfully."},201
    

class FavoriteDetailResource(Resource):
    @classmethod
    def get (cls, favoriteid: int):
        favorite = Favorite.find_by_id(favoriteid)

        if not favorite:
            return {"message": "Favorite property is not found"},404
        return favorite_schemas.dump(favorite),200
    
class FavoriteUpdateResource(Resource):
    @classmethod
    def put(cls):
        favorite_data = favorite_schemas.load(request.get_json())

        favorite = Favorite.find_by_id(favorite_data.id)

        if favorite:
            Favorite.save_to_db()
            return favorite_schemas.dump(property),200
        else:
            return {"message": "Favorite Property not found."},404
        
class FavoritePropertyDeleteResource(Resource):
    @classmethod
    def delete(cls, favoriteid:int):
        favorite = Favorite.find_by_id(favoriteid)

        if not favorite:
            return {"message": "Favorite property is not found"},404
        favorite.delete_from_db()
        return {"message": "Favorite property remove Successfully."}