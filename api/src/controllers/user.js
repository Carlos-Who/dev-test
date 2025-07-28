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
        isActive: user.isActive,
        company: user.company,
        age: user.age,
        eyeColor: user.eyeColor,
        picture: user.picture,
        phone: user.phone,
        address: user.address
    });
}


export async function updateUserProfile(req, res) {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    await db.read();
    const user = db.data.users.find(u => u._id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.company = req.body.company ?? user.company;
    user.name.first = req.body.firstName ?? user.name.first;
    user.name.last = req.body.lastName ?? user.name.last;
    user.isActive = req.body.isActive === 'Yes';
    user.age = parseInt(req.body.age) || user.age;
    user.eyeColor = req.body.eyeColor ?? user.eyeColor;
    user.email = req.body.email ?? user.email;
    user.phone = req.body.phone ?? user.phone;
    user.address = req.body.address ?? user.address;
    user.picture = req.body.picture ?? user.picture;

    await db.write();

    res.json({ message: 'User updated successfully', user });
}