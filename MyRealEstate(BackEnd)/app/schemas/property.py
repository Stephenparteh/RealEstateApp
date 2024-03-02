# property.py schemas folder
from app import ma,db
from app.models import Property
from typing import List
from marshmallow import fields
# from marshmallow_sqlalchemy.fields import List

class PropertySchemas(ma.SQLAlchemyAutoSchema):
    images = fields.List(fields.String())
    class Meta:
        model = Property
        dump_only = ("id",)
        include_fk = True
        load_instance = True