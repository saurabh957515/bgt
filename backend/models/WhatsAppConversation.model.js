import sql from "../db/queryExecution.js"; // Assuming you have a utility for SQL execution

class WhatsAppConversation {
  static async create(newMessage) {
    try {
      const query = `INSERT INTO whatsapp_conversations SET ?`;
      const result = await sql(query, newMessage);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findByConversationID(conversation_id) {
    try {
      const query = `SELECT * FROM whatsapp_conversations WHERE conversation_id = ? ORDER BY created_at ASC`;
      const result = await sql(query, [conversation_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByParticipants(sender, recipient) {
    try {
      const query = `
        SELECT * FROM whatsapp_conversations
        WHERE (sender = ? AND recipient = ?) OR (sender = ? AND recipient = ?)
        ORDER BY created_at ASC
      `;
      const result = await sql(query, [sender, recipient, recipient, sender]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default WhatsAppConversation;
