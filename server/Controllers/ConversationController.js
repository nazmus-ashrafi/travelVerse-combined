import ConversationModel from '../Models/conversationModel.js';

export const createConversation = async (req, res) => {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId]
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getConversation = async (req, res) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getTwoUsersConversation = async (req, res) => {
  try {
    const conversation = await ConversationModel.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
}

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await ConversationModel.findByIdAndDelete(req.params.conversationId);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
}