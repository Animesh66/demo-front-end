import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, User } from '../db';

const SECRET_KEY = 'supersecretkey';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name, gender, dateOfBirth } = req.body;

    if (!email || !password || !name) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: Date.now().toString(),
        email,
        passwordHash,
        name,
        gender,
        dateOfBirth
    };

    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, gender: user.gender, dateOfBirth: user.dateOfBirth } });
};
