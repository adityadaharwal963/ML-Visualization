import ollama from 'ollama'
import { Router } from 'express'
import axios from 'axios';
import dotenv from 'dotenv';
const route  = Router();
dotenv.config();
const modelDetails = "http://localhost:" + process.env.LLAMA_PORT + "/api/tags";

route.get('/run', async (req, res) => {
    const response = await axios.get(modelDetails, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log({'model-name':response.data.models});
    res.send('ollama is running');
});

// const response = await ollama.chat({
//   model: 'deepseek-coder:latest',
//   messages: [{ role: 'user', content: 'programming language u know?' }],
// })
// console.log(response.message.content)

export default route;