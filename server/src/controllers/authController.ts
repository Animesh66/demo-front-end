import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../db';

const SECRET_KEY = 'supersecretkey';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name, gender, dateOfBirth } = req.body;

    if (!email || !password || !name) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ email, passwordHash, name, gender, dateOfBirth });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user: IUser | null = await UserModel.findOne({ email: email?.toLowerCase() });
    if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        token,
        user: {
            id:          user._id,
            name:        user.name,
            email:       user.email,
            gender:      user.gender,
            dateOfBirth: user.dateOfBirth,
        },
    });
};
