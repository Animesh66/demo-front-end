import { Router } from 'express';
import { register, login } from './controllers/authController';
import { getProducts, getProduct } from './controllers/productController';
import { placeOrder, getOrders } from './controllers/orderController';

const router = Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);

// Products
router.get('/products', getProducts);
router.get('/products/:id', getProduct);

// Orders
router.post('/orders', placeOrder);
router.get('/orders', getOrders);

export default router;
