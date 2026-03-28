import { Router } from 'express';
import { register, login } from './controllers/authController';
import { getProducts, getProduct } from './controllers/productController';
import { placeOrder, getOrders } from './controllers/orderController';
import { authenticate } from './middleware/authMiddleware';

const router = Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);

// Products
router.get('/products', getProducts);
router.get('/products/:id', getProduct);

// Orders (Protected - require authentication)
router.post('/orders', authenticate, placeOrder);
router.get('/orders', authenticate, getOrders);

export default router;
