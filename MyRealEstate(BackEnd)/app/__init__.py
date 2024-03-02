# Importation of the various packages install in the terminal/command prompt
from flask import Flask
from flask_restful import Api 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import configure_uploads
from app.libs.image_helper import IMAGE_SET #Importation of IMAGE_SET from the "libs" folder
from config import Config #Importaion of Config from the "config.py" file

# Initialization of various packages
app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)
db = SQLAlchemy(app)
CORS(app)
jwt = JWTManager(app)
migrate = Migrate(app,db)
ma = Marshmallow(app)
configure_uploads(app, IMAGE_SET)

from app import routes #importing the "routes.py" file from the app folder