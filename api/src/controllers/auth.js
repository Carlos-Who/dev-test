import { db } from '../database.js';

export async function logInWithEmailAndPassword(req, res) {
    await db.read();

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = db.data.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.redirect(`/user/profile?userId=${user._id}`);

}