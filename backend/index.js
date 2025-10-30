import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

console.log('GROQ API Key Loaded:', process.env.GROQ_API_KEY ? 'Yes' : 'No - CHECK .env FILE');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const dataPath = path.join(__dirname, 'data', 'diseases.json');
let diseasesData = [];
try {
    diseasesData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log('Successfully loaded diseases.json');
} catch (error) {
    console.error("Could not read diseases.json:", error);
}

app.post('/chat', async (req, res) => {
    const message = req.body.message.toLowerCase();
    let localReply = null;

    for (const item of diseasesData) {
        for (const query of item.queries) {
            if (message.includes(query.toLowerCase())) {
                localReply = item.reply;
                break;
            }
        }
        if (localReply) break;
    }

    if (localReply) {
        return res.json({ reply: localReply });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant for health information.' },
                { role: 'user', content: message },
            ],
            model: 'llama3-8b-8192',
        });
        const aiReply = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't process that.";
        res.json({ reply: aiReply });
    } catch (error) {
        console.error("--- GROQ API CALL FAILED ---");
        console.error("Error Details:", error);
        console.error("--- END OF ERROR REPORT ---");
        res.status(500).json({ reply: "Sorry, I'm having trouble connecting to the AI service." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});