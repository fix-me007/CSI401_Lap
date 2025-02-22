import express from "express"
import cors from "cors"

import userRouter from "./routers/userRouter.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', userRouter)


// app.post('/register', (req, res) => {
//     res.status(200).json({ message: 'success' })
// })

const PORT = 3000

app.listen(PORT, () => {
    console.log('sever is running at', PORT);
})
