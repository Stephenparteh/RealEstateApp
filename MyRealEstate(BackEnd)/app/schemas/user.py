from app import ma 
from app.models import User

class UserSchemas(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password", )
        dump_only = ("id", )
        load_instance = True
