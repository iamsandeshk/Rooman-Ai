const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getChatResponse } = require('./src/gemini');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// API Endpoint to handle chat
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Missing message' });
    }

    try {
        // Get response from Gemini (without history)
        const botResponse = await getChatResponse(message);

        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error processing chat:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API Endpoint for initial recommendations
app.get('/api/recommendations', (req, res) => {
    res.json({
        questions: [
            "What courses does Rooman offer?",
            "How do I enroll in a certification program?",
            "Tell me about Rooman's placement support.",
            "Where are your centers located?"
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
