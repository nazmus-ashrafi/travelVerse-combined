import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new mongoose.Schema(
  {


    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },

   
  },
  { timestamps: true }
);

// we registered the model with mongoose
var MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;