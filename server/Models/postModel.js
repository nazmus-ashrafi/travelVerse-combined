
import mongoose from "mongoose";

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: [false,'Please add a longitude and latitude'],
};

const postSchema = new Schema(
  {
 
    userId: { type: String, required: true },

    title: {
      type: String,
      // required: [true,'Please add a title'],
    },
    description:{
        type: String,
        required: [true,'Please add a description']
    },
    
    images: [{
      type: String,
    }],
    
    latitude: {
      ...requiredNumber, //required
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber, //required
      min: -180,
      max: 180,
    },
    visitDate: {
      // required: [true,'Please add a visit date'],
      type: Date,
    },
    airline:{
      type: String,
    },

    //
    // name: {
    //   type: String,
    // },
    // avatar: {
    //   type: String,
    // },

    // Likes ,comments & date of
    likes: {
      type: Array,
      default: [],
    },
    comments: [],

    date: {
      type: Date,
      default: Date.now,
    },

    shares:{
      type: Array,
      default: [],
    },

    // a post may or maynot be a shared post
    isSharedPost: {
      type: Boolean,
    },
    sharedPostId:{
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: "Post",
    },
    

  },
  //---------------------
  {
    timestamps: true,
  }
);

// we registered the model with mongoose
var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;