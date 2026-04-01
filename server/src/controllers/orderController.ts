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
        status:        'new',
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId; // Extract from authenticated token

    const userOrders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.json(userOrders);
};

export const cancelOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    const { orderId } = req.params;
    const userId = req.userId;

    try {
        const order = await OrderModel.findById(orderId);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Check if the order belongs to the user
        if (order.userId !== userId) {
            res.status(403).json({ message: 'Unauthorized to cancel this order' });
            return;
        }

        // Only allow cancellation for orders in 'new' status
        if (order.status !== 'new') {
            res.status(400).json({ message: `Cannot cancel order with status: ${order.status}` });
            return;
        }

        order.status = 'cancelled';
        await order.save();

        res.json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Error cancelling order' });
    }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    const { orderId } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    // Valid order statuses
    const validStatuses = ['new', 'shipped', 'delivered', 'cancelled'];

    try {
        // Validate status
        if (!status) {
            res.status(400).json({ message: 'Status is required' });
            return;
        }

        if (!validStatuses.includes(status.toLowerCase())) {
            res.status(400).json({ 
                message: 'Invalid status. Valid statuses are: new, shipped, delivered, cancelled' 
            });
            return;
        }

        const order = await OrderModel.findById(orderId);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        // Check if the order belongs to the user
        if (order.userId !== userId) {
            res.status(403).json({ message: 'Unauthorized to update this order' });
            return;
        }

        // Prevent updating an already cancelled order
        if (order.status === 'cancelled' && status !== 'cancelled') {
            res.status(400).json({ message: 'Cannot update a cancelled order' });
            return;
        }

        order.status = status.toLowerCase();
        await order.save();

        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status' });
    }
};

// Function to automatically update order statuses based on time
export const updateOrderStatuses = async (): Promise<void> => {
    try {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

        // Update 'new' orders to 'shipped' after 1 day
        await OrderModel.updateMany(
            {
                status: 'new',
                createdAt: { $lte: oneDayAgo }
            },
            { $set: { status: 'shipped' } }
        );

        // Update 'shipped' orders to 'delivered' after 2 days (1 day after shipped)
        await OrderModel.updateMany(
            {
                status: 'shipped',
                createdAt: { $lte: twoDaysAgo }
            },
            { $set: { status: 'delivered' } }
        );

        console.log('✅ Order statuses updated successfully');
    } catch (error) {
        console.error('❌ Error updating order statuses:', error);
    }
};
