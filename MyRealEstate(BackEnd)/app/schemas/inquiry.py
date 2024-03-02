from app import ma 
from app.models import Inquiry

class InquirySchemas(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Inquiry
        dump_only = ("id",)
        include_fk = True
        load_instance = True