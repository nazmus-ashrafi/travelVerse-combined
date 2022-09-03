import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: false
        },
        firstname: {
            type: String,
            required: true
        },
        lastname : {
            type: String,
            required: true
        },
        isAdmin : {
            type: Boolean,
            default: false,
        },
        profileImage : {
            type: Array
            
        },
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt: String,
        relationship: String,
        followers: [] ,
        following: [] ,
        notifications: {
            type: Array
        },
        description: String,

        isVendor: {
            type: Boolean,
            default: false
        },
        resetToken: {
            type: String,
            default: ''
        },
        expireToken: {
            type: Date,
        }

    },
    {timestamps: true}
)

const UserModel= mongoose.model("Users", UserSchema);
export default UserModel