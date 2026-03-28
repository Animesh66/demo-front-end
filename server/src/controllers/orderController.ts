import { Response } from 'express';
import { OrderModel } from '../db';
import { AuthRequest } from '../middleware/authMiddleware';

export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    const { items, total, paymentMethod } = req.body;
    const userId = req.userId; // Extract from authenticated token

    if (!items || items.length === 0) {
        res.status(400).json({ message: 'Invalid order data' });
        return;
    }

    const newOrder = new OrderModel({
        userId,
        items,
        total,
        date:          new Date().toISOString(),
        paymentMethod: paymentMethod || 'Not specified',
        status:        'Completed',
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId; // Extract from authenticated token

    const userOrders = await OrderModel.find({ userId });
    res.json(userOrders);
};
