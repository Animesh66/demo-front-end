import { Request, Response } from 'express';
import { ProductModel } from '../db';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await ProductModel.find();
    res.json(products);
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json(product);
};
