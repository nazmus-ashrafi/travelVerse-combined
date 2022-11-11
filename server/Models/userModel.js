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
        shopname : {
            type: String,
            required: false
        },

        // shop location
        latitude: {
            type: Number,
            required: [false,'Please add a longitude and latitude'],
            min: -90,
            max: 90,
        },
        longitude: {
            type: Number,
            required: [false,'Please add a longitude and latitude'],
            min: -180,
            max: 180,
        },
        //
        
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
        resetToken: {
            type: String,
            default: ''
        },
        expireToken: {
            type: Date,
        },
        isShop: {
            type: Boolean,
            default: false
        },
        shopnumber: {
            type: String,
            default: '',
            required: false
        }

    },
    {timestamps: true}
)

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel