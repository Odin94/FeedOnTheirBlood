import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { startWork, Work } from "./features/work";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>')
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


interface LoginFormInputs {
    email: string,
    password: string
}

interface WorkFormInputs {
    duration: 1 | 2 | 3 | 4 | 5,
    type: "someWork"
}

// Array of example users for testing purposes
const users = [
    {
        id: 1,
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123'
    },
    {
        id: 2,
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123'
    }
];

// route login
app.post('/login', (req: Request, res: Response) => {
    const { email, password }: LoginFormInputs = req.body;

    const user = users.find(user => {
        return user.email === email && user.password === password
    });

    if (!user) {
        return res.status(404).send('User Not Found!')
    }

    return res.status(200).json(user)
});


app.post('/work', (req: Request, res: Response) => {
    const { duration, type }: WorkFormInputs = req.body;
    const userId = "Pretend we have a cookie lel"

    const work = startWork(userId, duration, type)

    if (work) {
        return res.status(200).json(work)
    }
    return res.status(400).json({ error: "already working" })
});
