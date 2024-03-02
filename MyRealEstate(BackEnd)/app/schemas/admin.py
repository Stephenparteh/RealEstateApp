from app import ma 
from app.models import Admin

class AdminSchemas(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Admin
        load_only = ("password", )
        dump_only = ("id", )
        load_instance = True
