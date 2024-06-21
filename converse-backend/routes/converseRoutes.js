const express = require('express');
const router = express.Router();
const { createAudioStreamFromText } = require('../controllers/elevenlabsController');
const { startChatWithGemini, continueChatWithGemini } = require('../controllers/geminiController');

// Route to handle specific text "This is James"
router.get('/manualAudioStream', async (req, res) => {
    try {
        const audioContent = await createAudioStreamFromText("Wagwan brudda, me munni in da capricciosa bundem, ya follow?");

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioContent.length
        });
        res.end(audioContent);
    } catch (error) {
        console.error("Error streaming audio:", error);
        res.status(500).json({ message: "Failed to stream audio" });
    }
});

// Route to handle dynamic text input via POST request
router.post('/audioStream', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Text is required for audio generation" });
        }

        const audioContent = await createAudioStreamFromText(text);

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioContent.length
        });
        res.end(audioContent);
    } catch (error) {
        console.error("Error streaming audio:", error);
        res.status(500).json({ message: "Failed to stream audio" });
    }
});

// Route to handle chat interaction and generate audio response
router.post('/geminiAudioStream', async (req, res) => {
    try {
        const { message: userMessage } = req.body; // Expecting the message to come in the body of POST request

        if (!userMessage) {
            return res.status(400).json({ message: "Message is required" });
        }

        // Assuming these are stored or retrieved as needed for session management
        let chatSession = req.session.chat || null;
        let chatHistory = req.session.history || [];

        if (!chatSession) {
            const { chat, history } = await startChatWithGemini();
            chatSession = chat;
            chatHistory = history;
            req.session.chat = chatSession;
            req.session.history = chatHistory;
        }

        const text = await continueChatWithGemini(chatSession, chatHistory, userMessage);

        console.log("Gemini response:", text);

        const audioContent = await createAudioStreamFromText(text);

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioContent.length
        });
        res.end(audioContent);
    } catch (error) {
        console.error("Error streaming audio:", error);
        res.status(500).json({ message: "Failed to stream audio" });
    }
});

module.exports = router;