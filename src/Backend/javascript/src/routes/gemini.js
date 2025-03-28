import run from '../functions/Gemini.js'
import { Router } from 'express'
const route = Router();

route.post('/run', async (req, res) => {    
    const respond = await run()
    console.log("++++++++++++++++\n" + respond)
    res.send(respond)
}
)