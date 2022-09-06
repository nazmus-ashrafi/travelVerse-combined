import MessageModel from '../Models/messageModel.js';

export const createMessage = async (req, res) => {
  const newMessage = new MessageModel(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getMessage = async (req, res) => {
  try {
    const message = await MessageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
}