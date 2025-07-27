import { db } from '../database.js';

export async function getUserProfile(req, res) {
    await db.read();

    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const user = db.data.users.find(u => u._id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        isActive: user.isActive
    })
}
