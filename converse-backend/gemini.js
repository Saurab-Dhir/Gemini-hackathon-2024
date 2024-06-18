import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import readline from 'readline';
import test from 'node:test';
import { read } from 'node:fs';

// Loading environment variables from a specific file
dotenv.config({ path: "./cred.env" });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function chatWithGemini() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500
        }
    });

    async function chatRoutine(){
        rl.question('You: ', async (msg) => {
            if (msg === 'exit') {
                rl.close();
                return;
            }
            else{
                const result = await chat.sendMessage(msg);
                const response = result.response;
                const text = response.candidates[0].content.parts.map(part => part.text).join(' ');
                console.log('Gemini:', text);
                chatRoutine();
            }
        });
    }
    chatRoutine();
}

chatWithGemini();

async function generateText(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    try {
        const result = await model.generateContent(prompt);
        // Check if candidates array exists and has content
        if (result.response && result.response.candidates && result.response.candidates.length > 0) {
            // Accessing the nested text in the 'parts' array of the first candidate
            const text = result.response.candidates[0].content.parts.map(part => part.text).join(' ');
            console.log('Input prompt:', prompt);
            console.log('Generated text:', text);
            return text;
        } else {
            console.log('No candidates found in the response.');
            return 'No candidates found.';
        }
    } catch (error) {
        console.error('Error generating text:', error);
    }
}

async function testGenerateText() {
    const prompt = "WHATS UP ITS BIGGIE CHEESE HERE TO SAY HELLO TO ALL MY FANS";
    const text = await generateText(prompt);  // Ensures the text is fetched using the correct function and method
}

// testGenerateText();
