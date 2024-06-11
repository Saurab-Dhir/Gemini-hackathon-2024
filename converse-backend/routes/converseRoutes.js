const express = require('express');
const router = express.Router();
const { createAudioStreamFromText } = require('../controllers/converseController');

// Route to handle specific text "This is James"
router.get('/manualAudioStream', async (req, res) => {
    try {
        const audioContent = await createAudioStreamFromText("This my waife, my name Borat!!");

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

module.exports = router;
