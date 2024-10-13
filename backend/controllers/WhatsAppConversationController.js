import WhatsAppConversation from "../models/WhatsAppConversation.model.js";
import { v4 as uuidv4 } from "uuid";
export async function storeMessage(req, res) {
  const { sender, recipient, message, message_type } = req.body;

  if (!sender || !recipient || !message) {
    return res.status(400).send({
      message: "Conversation ID, sender, recipient, and message are required.",
    });
  }

  const newMessage = {
    conversation_id: uuidv4(),
    sender,
    recipient,
    message,
    message_type: message_type || "text",
  };

  try {
    const messageId = await WhatsAppConversation.create(newMessage);

    res.status(200).send({
      message: "Message send successfully",
      status: "success",
      messageId: messageId,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Error storing the message." });
  }
}

export async function getConversationById(req, res) {
  const { conversation_id } = req.params;

  if (!conversation_id) {
    return res.status(400).send({ message: "Conversation ID is required." });
  }

  try {
    const conversation = await WhatsAppConversation.findByConversationID(
      conversation_id
    );
    res.send(conversation);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Error retrieving conversation." });
  }
}
export async function getConversationByParticipants(req, res) {
  const { sender, recipient } = req.query;
  console.log(req?.query)
  if (!sender || !recipient) {
    return res.status(400).send({
      message:
        "Sender and recipient are required to retrieve the conversation.",
    });
  }

  try {
    const conversation = await WhatsAppConversation.findByParticipants(
      sender,
      recipient
    );
    res.send(conversation);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Error retrieving conversation." });
  }
}
