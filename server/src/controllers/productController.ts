import { Request, Response } from 'express';
import { products } from '../db';

export const getProducts = (req: Request, res: Response) => {
    res.json(products);
};

export const getProduct = (req: Request, res: Response) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
};
