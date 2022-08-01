import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Users'
    // },
    user: {
      type: String,
    },

    postId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// we registered the model with mongoose
var CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;