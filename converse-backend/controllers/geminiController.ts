import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as readline from 'readline';

// Loading environment variables from a specific file
dotenv.config({ path: "./cred.env" });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string; // Ensuring the API key is of type string
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface Part {
    text: string;
}

interface Candidate {
    content: {
        parts: Part[];
    };
}

interface Response {
    candidates: Candidate[];
}

async function startChatWithGemini(): Promise<{ chat: any, history: any[] }> {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500
        }
    });

    const history: any[] = [];

    return { chat, history };
}

async function continueChatWithGemini(chat: any, history: any[], msg: string): Promise<string> {
    try {
        const result: { response: Response } = await chat.sendMessage(msg);
        const response = result.response;

        if (response.candidates && response.candidates.length > 0) {
            const text = response.candidates[0].content.parts.map(part => part.text).join(' ');
            history.push({ user: msg, gemini: text });
            return text;
        } else {
            return 'No response received.';
        }
    } catch (error) {
        console.error('Error communicating with Gemini:', error);
        throw error;
    }
}

export { startChatWithGemini, continueChatWithGemini };
