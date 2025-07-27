
import express from 'express';
import { db } from './database.js';
import auth from './routes/auth.js'
import userRoutes from './routes/user.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', auth);
app.use('/user', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});