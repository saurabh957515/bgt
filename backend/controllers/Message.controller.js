// messages.controller.js
import twilio from "twilio";

// Set up Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

/**
 * Send a single WhatsApp message
 */
export async function sendSingleMessage(req, res) {
  const { to, message } = req.body; // Expects 'to' and 'message' in the request body

  try {
    // Send a single WhatsApp message
    const msg = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // Your Twilio WhatsApp number
      to: `whatsapp:${to}`, // Recipient's WhatsApp number
      body: message, // Message body
    });

    res.status(200).send({ success: true, messageId: msg.sid });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res.status(500).send({ success: false, message: "Failed to send message" });
  }
}

/**
 * Send a mass WhatsApp message
 */
export async function sendMassMessage(req, res) {
  const { recipients, message } = req.body; // Expects 'recipients' array and 'message' in the request body

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "Recipients list cannot be empty" });
  }

  try {
    const messageResults = [];

    // Send a message to each recipient
    for (const recipient of recipients) {
      const msg = await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${recipient}`,
        body: message,
      });
      messageResults.push({ recipient, messageId: msg.sid });
    }

    res.status(200).send({ success: true, results: messageResults });
  } catch (error) {
    console.error("Error sending mass WhatsApp messages:", error);
    res
      .status(500)
      .send({ success: false, message: "Failed to send mass messages" });
  }
}
