import express from 'express';
import cors from 'cors';
import test from './routes/test.js';
import dotenv from 'dotenv';
import chat from './routes/chat.js';
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api', test);
app.use('/chat',chat);
console.log(process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT, () => {
    console.log('Server is running on port' , process.env.SERVER_PORT);
});


