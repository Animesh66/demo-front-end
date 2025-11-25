import { Request, Response } from 'express';
import { orders, Order } from '../db';

export const placeOrder = (req: Request, res: Response) => {
    const { userId, items, total, paymentMethod } = req.body;

    if (!userId || !items || items.length === 0) {
        res.status(400).json({ message: 'Invalid order data' });
        return;
    }

    const newOrder: Order = {
        id: Date.now().toString(),
        userId,
        items,
        total,
        date: new Date().toISOString(),
        paymentMethod: paymentMethod || 'Not specified',
        status: 'Completed'
    };

    orders.push(newOrder);

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
};

export const getOrders = (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    if (!userId) {
        res.status(400).json({ message: 'User ID required' });
        return;
    }

    const userOrders = orders.filter(o => o.userId === userId);
    res.json(userOrders);
};
