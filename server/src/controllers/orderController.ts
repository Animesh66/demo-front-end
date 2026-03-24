import { Request, Response } from 'express';
import { OrderModel } from '../db';

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
    const { userId, items, total, paymentMethod } = req.body;

    if (!userId || !items || items.length === 0) {
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

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.userId as string;
    if (!userId) {
        res.status(400).json({ message: 'User ID required' });
        return;
    }

    const userOrders = await OrderModel.find({ userId });
    res.json(userOrders);
};
