from app import app,jwt,api 
from flask import jsonify
from marshmallow import ValidationError

from app.resource.property import CreatePropertyResource,PropertyUpdateResource,PropertyDeleteResource, AdminPropertyResource, GetAllPropertyResource
from app.resource.favorite import FavoriteResource,FavoriteDetailResource,FavoriteUpdateResource,FavoritePropertyDeleteResource
from app.resource.inquiry import InquiryResource,InquiryDetailResource,InquiryUpdateResource,InquiryDeleteResource
from app.resource.admin import AdminRegister, AdminLogin, AdminPasswordUpdateResource, AdminDetailResource , AdminDeleteResource, GetAllAdminResource,UpdateAdminDetailResource
from app.resource.user import UserRegister,UserLoginResource, UserPasswordUpdateResource, UserDetailResource, UserDeleteResource, GetAllUserResource, UpdateUserDetailResource
from app.resource.image import Avatar, AvatarUpload, ImageUpload, Image, AdminAvatarUpload, AdminAvatar
from app.resource.message import MessageResource,MessageDetailResource,MessageUpdateResource,MessageDeleteResource

api.add_resource(UserRegister, "/register-user")
api.add_resource(UserLoginResource, "/login-user")
api.add_resource(UserPasswordUpdateResource, "/update-userpassword")
api.add_resource(UserDetailResource, "/user-details/<int:userid>")
api.add_resource(UserDeleteResource, "/user-delete/<int:userid>" )
api.add_resource(GetAllUserResource, "/all-users")
api.add_resource(UpdateUserDetailResource, "/update-user/<int:userId>")


api.add_resource(AdminRegister, "/register-admin")
api.add_resource(AdminLogin, "/login-admin")
api.add_resource(AdminPasswordUpdateResource, "/update-adminpassword")
api.add_resource(AdminDetailResource, "/admin-details/<int:adminid>")
api.add_resource(AdminDeleteResource, "/admin-delete/<int:adminid>" )
api.add_resource(GetAllAdminResource, "/all-admins")
api.add_resource(UpdateAdminDetailResource, "/update-admin/<int:adminId>")

api.add_resource(CreatePropertyResource,"/create-property")
api.add_resource(AdminPropertyResource, "/admin-property")
api.add_resource(PropertyUpdateResource,"/update-property/<int:propertyid>")
api.add_resource(PropertyDeleteResource,"/delete-property/<int:propertyid>")
api.add_resource(GetAllPropertyResource, "/all-properties")


api.add_resource(FavoriteResource,"/create-favorite-property")
api.add_resource(FavoriteDetailResource,"/favorite-property-details/<int:favoriteid>")
api.add_resource(FavoriteUpdateResource,"/favorite-property-update")
api.add_resource(FavoritePropertyDeleteResource,"/delete-favorite-property/<int:favoriteid>")

api.add_resource(InquiryResource,"/create-inquiry")
api.add_resource(InquiryDetailResource,"/property-inquiry-details/<int:inquiryid>")
api.add_resource(InquiryUpdateResource,"/update-inquiry")
api.add_resource(InquiryDeleteResource,"/delete-inquiry/<int:inquiryid>")

api.add_resource(MessageResource,"/create-message")
api.add_resource(MessageDetailResource,"/property-message-details/<int:messageid>")
api.add_resource(MessageUpdateResource,"/update-message")
api.add_resource(MessageDeleteResource,"/delete-message/<int:messageid>")


api.add_resource(ImageUpload, "/upload/image/<int:user_id>")  #post
api.add_resource(Image, "/image/<int:user_id>")   #get
api.add_resource(AvatarUpload, "/upload/avatar")    #put
api.add_resource(AdminAvatarUpload, "/upload/admin/avatar") #put
api.add_resource(Avatar, "/avatar/<int:user_id>")   #get
api.add_resource(AdminAvatar, "/admin/avatar/<int:admin_id>")

@app.route('/')
def home():
    return "Welcome to Your Real Estate Portal"