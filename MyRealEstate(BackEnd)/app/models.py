# importation of various packages needed for the "models.py" file.
import json
from typing import List
from datetime import date,datetime,timedelta
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy import or_
from werkzeug.security import generate_password_hash,check_password_hash
import hashlib
import pytz
import moment
from sqlalchemy.dialects.postgresql import ARRAY
# from sqlalchemy import JSON

# Importation of app and db from the app folder
from app import app,db


class User(db.Model):  # Creation of class for the user
    id = db.Column(db.Integer,primary_key = True) #Id is automatically generated
    firstName = db.Column(db.String(150))
    lastName = db.Column(db.String(150))
    email = db.Column(db.String(150))
    phoneNumber= db.Column(db.String(150))
    gender = db.Column(db.String(150))
    address = db.Column(db.String(150))
    password = db.Column(db.String(150))
    role = db.Column(db.String(20), nullable = False, default = "user")
    profile_uri = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default = datetime.now()) #Is use to show the current date and time

    def save_to_db(self) -> None:   # A function that is use to save the admin information to the database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:   # A function that is use to delete the admin information from the database
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password: str):      # A function to set the admin password into the database
        self.password = generate_password_hash(password)


    def check_password(self, password: str):    # A function to check the admin password that is set to the database
        return check_password_hash(self.password, password)   

    @classmethod    # A classmethod to find a admin by their id
    def find_by_id(cls, id:int) -> "User":
        return cls.query.filter_by(id=id).first()
 
    @classmethod    # A classmethod to find a admin by their email 
    def find_by_email(cls, email:str) -> "User":
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_phoneNumber(cls, phoneNumber: str) -> "User":
        return cls.query.filter_by(phoneNumber=phoneNumber).first()
    

class Admin(db.Model):  # Creation of class for the admin
    id = db.Column(db.Integer,primary_key = True) #Id is automatically generated
    firstName = db.Column(db.String(150))
    lastName = db.Column(db.String(150))
    email = db.Column(db.String(150))
    phoneNumber= db.Column(db.String(150))
    password = db.Column(db.String(150))
    gender = db.Column(db.String(150))
    address = db.Column(db.String(150))
    role = db.Column(db.String(20), nullable = False, default = "admin")
    profile_uri = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default = datetime.now()) #Is use to show the current date and time

    def save_to_db(self) -> None:   # A function that is use to save the admin information to the database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:   # A function that is use to delete the admin information from the database
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password: str):      # A function to set the admin password into the database
        self.password = generate_password_hash(password)


    def check_password(self, password: str):    # A function to check the admin password that is set to the database
        return check_password_hash(self.password, password)   

    @classmethod    # A classmethod to find a admin by their id
    def find_by_id(cls, id:int) -> "Admin":
        return cls.query.filter_by(id=id).first()
 
    @classmethod    # A classmethod to find a admin by their email 
    def find_by_email(cls, email:str) -> "Admin":
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_phoneNumber(cls, phoneNumber: str) -> "Admin":
        return cls.query.filter_by(phoneNumber=phoneNumber).first()    

class Property(db.Model):   # Creation of a class that contains various columns that needed for the property
    id = db.Column(db.Integer,primary_key = True)
    title = db.Column(db.String(150))
    description = db.Column(db.String(250))
    price = db.Column(db.String(150))
    location = db.Column(db.String(150))
    bedrooms = db.Column(db.String(150))
    bathrooms = db.Column(db.String(150))
    type = db.Column(db.String(150))
    contact = db.Column(db.String(150))
    images = db.Column(db.Text)
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id", name="property_admin_fk")) #The id of the admin that is creating the property
    adminFirstName = db.Column(db.String(150))
    adminLastName = db.Column(db.String(150))
    timestamp = db.Column(db.DateTime, default = datetime.now())


    def save_to_db(self) -> None:   # A function that is use to save the information from the property class to the database

        if isinstance(self.images, list):
            # Convert list to JSON string
            self.images = json.dumps(self.images)

        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:   # A function that is use to delete the information from the property class to the database
        db.session.delete(self)
        db.session.commit()

    @classmethod    # A classmethod that is use to find a property by it's id from the property class
    def find_by_id(cls, id:int) -> "Property":
        return cls.query.filter_by(id=id).first()
    
    @classmethod    # A classmethod to find the admin base on the id
    def find_by_adminid(cls, admin_id: int) -> "Property":
        return cls.query.filter_by(admin_id=admin_id).first()
    

class Favorite(db.Model):   # Creation of a class that contains various columns that is needed for the favorite property
    id = db.Column(db.Integer,primary_key = True) #The id of the favorite property
    user_id = db.Column(db.Integer,db.ForeignKey("user.id")) #The user id that is adding the property to the favorite list
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id")) #The admin id that is adding the property to the favorite list 
    property_id = db.Column(db.Integer,db.ForeignKey("property.id")) #The property id that is been added as favorite
    timestamp = db.Column(db.DateTime, default = datetime.now()) #Time and date it was created

    def save_to_db(self) -> None:   # A function that is use to save the favorite property to the database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:   # A function that is use to delete a favorite property from the database
        db.session.delete(self)
        db.session.commit()

    @classmethod    # A classmethod that is use to find a favorite property by its id
    def find_by_id(cls,id:int) -> "Favorite":
        return cls.query.filter_by(id=id).first()

    @classmethod    # A classmethod that is use to find the user that created or added the favorite property
    def find_by_userid(cls, user_id:int) -> "Favorite":
        return cls.query.filter_by(user_id=user_id).first()
    
    @classmethod #  A classmethod that is use to find the admin that created or added the favorite property
    def find_by_adminid(cls, admin_id: int) -> "Favorite":
        return cls.query.filter_by(admin_id=admin_id).first()

    @classmethod    # A classmethod that is use to find the property id that is added to the to the favorite property
    def find_by_propertyid(cls, property_id: int) -> "Favorite":
        return cls.query.filter_by(property_id=property_id).first()
    

class Inquiry (db.Model):   # An inquiries class that is use for the user to make an inquiry or comment about a property
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))    #The user that is making an inquiry
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id"))
    property_id = db.Column(db.Integer,db.ForeignKey("property.id"))    #The property that they are making the inquiry about
    # message = db.Column(db.String(250))     #The message that is being sent about the property
    # admin_id = db.Column(db.String(150), db.ForeignKey("admin.id")) I'M Confused Here, I'm thinking where this column is needed for the purpose of having an admin that will recieve the inquiry or if it is not needed.
    timestamp = db.Column(db.DateTime,default=datetime.now())  #Time and date it was created
    content = db.Column(db.String(250))

    def save_to_db(self) -> None:   # A function that is use to save the inquiry to the database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:   # A function that is use to delete the inquiry from the database
        db.session.delete(self)
        db.session.commit()

    @classmethod    # A classmethod that is use to find the inquiry by it's unique id
    def find_by_id(cls,id:int) -> "Inquiry":
        return cls.query.filter_by(id=id).first()

    @classmethod    # A classmethod that is use to find the user that is making the inquiry
    def find_by_userid(cls, user_id:int) -> "Inquiry":
        return cls.query.filter_by(user_id=user_id).first()

    @classmethod    # A classmethod that is use to find the property that the inquiry is been made about
    def find_by_propertyid(cls, property_id: int) -> "Inquiry":
        return cls.query.filter_by(property_id=property_id).first()

class Message (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    inquiry_id = db.Column(db.Integer, db.ForeignKey("inquiry.id"))
    sender_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    receiver_id = db.Column(db.Integer, db.ForeignKey("admin.id"))
    content = db.Column(db.String(250))
    timestamp = db.Column(db.DateTime,default=datetime.now())  #Time and date it was created

    def save_to_db(self) -> None:   # A function that is use to save the inquiry to the database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:   # A function that is use to delete the inquiry from the database
        db.session.delete(self)
        db.session.commit()

    @classmethod    # A classmethod that is use to find the message by it's unique id
    def find_by_id(cls,id:int) -> "Message":
        return cls.query.filter_by(id=id).first()

