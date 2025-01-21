import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/aAddB', (req, res) => {

    const { a, b } = req.body

    console.log("a + b", "a =", a, "b =", b);

    if (a === undefined || typeof a !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: a must be a number' });
    }

    if (b === undefined || typeof b !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: b must be a number' });
    }

    const result = a + b;

    const response = { message: 'success', result };

    res.json(response);
})

app.post('/a2AddB2', (req, res) => {

    const { a, b } = req.body

    if (a === undefined || typeof a !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: a must be a number' });
    }

    if (b === undefined || typeof b !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: b must be a number' });
    }

    const result = (a ** 2) + (b ** 2);

    console.log("a^2 + b^2", "a =", a, "b =", b, "result => ", result);

    const response = { message: 'success', result };

    res.json(response);
})

app.post('/aPowB', (req, res) => {

    const { a, b } = req.body

    if (a === undefined || typeof a !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: a must be a number' });
    }

    if (b === undefined || typeof b !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: b must be a number' });
    }

    // const result = Math.sqrt((a) + (b ** 2));
    const result = a ** b;

    console.log("a^b", "a =", a, "b =", b, "result => ", result);

    const response = { message: 'success', result };

    res.json(response);
})

app.post('/aMulB', (req, res) => {
    const { a, b } = req.body

    if (a === undefined || typeof a !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: a must be a number' });
    }

    if (b === undefined || typeof b !== 'number') {
        return res.status(400).json({ message: 'Invalid parameter: b must be a number' });
    }

    const result = a * b;

    console.log("a x b", "a =", a, "b =", b, "result => ", result);

    const response = { message: 'success', result };

    res.json(response);
})

const host = 'localhost'
const port = 3000

app.listen(port, () => {
    console.log(`Server is running on port http://${host}:${port}`)
})