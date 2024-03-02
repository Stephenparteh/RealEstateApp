from app import ma #Importing marshmallow into the file
from app.models import Favorite #Importing the favorite class from the app folder and the model.py file

# Creating a schemas to validate the user input
class FavoriteSchemas(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Favorite
        dump_only = ("id",)
        include_fk = True
        load_instance = True