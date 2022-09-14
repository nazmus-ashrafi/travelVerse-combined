import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new mongoose.Schema(
  {


    members: {
      type: Array,
    },


   
  },
  { timestamps: true }
);

// we registered the model with mongoose
var ConversationModel = mongoose.model("Conversation", ConversationSchema);

export default ConversationModel;