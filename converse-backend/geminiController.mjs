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
            maxOutputTokens: 5000
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