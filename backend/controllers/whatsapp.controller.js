const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());  // Parse incoming request bodies as JSON

// Database connection (update your credentials)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to the database
db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// WhatsApp API credentials (replace with your actual credentials)
const WHATSAPP_API_URL = 'https://graph.facebook.com/v13.0/YOUR_PHONE_NUMBER_ID/messages';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

// Function to store messages in the database
const storeMessage = (message_id, recipient_phone, message_text, direction) => {
  const query = 'INSERT INTO conversations (message_id, recipient_phone, message_text, direction) VALUES (?, ?, ?, ?)';
  db.execute(query, [message_id, recipient_phone, message_text, direction], (err, results) => {
    if (err) throw err;
    console.log('Message stored in database:', results);
  });
};

// Controller to send a WhatsApp message
app.post('/send-message', async (req, res) => {
  const { recipient, message } = req.body;  // Extract recipient and message from request body

  try {
    const response = await axios.post(WHATSAPP_API_URL, {
      messaging_product: 'whatsapp',
      to: recipient,
      text: { body: message }
    }, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const message_id = response.data.messages[0].id;  // Message ID from WhatsApp API
    storeMessage(message_id, recipient, message, 'sent');  // Store sent message in DB

    res.json({ status: 'Message sent', message_id });
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Webhook to receive incoming messages from WhatsApp API
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object && body.entry) {
    body.entry.forEach(entry => {
      if (entry.changes && entry.changes[0].value.messages) {
        const message = entry.changes[0].value.messages[0];
        const message_id = message.id;
        const from = message.from;  // The sender's phone number
        const text = message.text.body;  // The message text

        console.log('Received message:', text);

        // Store received message in DB
        storeMessage(message_id, from, text, 'received');
      }
    });

    res.sendStatus(200);  // Acknowledge the webhook event
  } else {
    res.sendStatus(404);
  }
});

// Webhook verification (optional for initial setup)
app.get('/webhook', (req, res) => {
  const verify_token = "YOUR_VERIFY_TOKEN";
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === verify_token) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const sendMassMessage = async (recipients, message) => {
    for (const recipient of recipients) {
      await sendMessage(recipient, message);  // Reuse the sendMessage function
    }
  };
  