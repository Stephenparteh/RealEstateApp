from app import ma 
from app.models import Message

class MessageSchemas(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        dump_only = ("id",)
        include_fk = True
        load_instance = True