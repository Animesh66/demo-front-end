/**
 * API Configuration
 * Centralized API URL management with environment variable support
 */

// Use environment variable if available, otherwise default to localhost:3000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

export const API_ENDPOINTS = {
    base: API_BASE_URL,
    products: `${API_BASE_URL}/api/products`,
    productById: (id: string) => `${API_BASE_URL}/api/products/${id}`,
    orders: `${API_BASE_URL}/api/orders`,
    orderCancel: (orderId: string) => `${API_BASE_URL}/api/orders/${orderId}/cancel`,
    authRegister: `${API_BASE_URL}/api/auth/register`,
    authLogin: `${API_BASE_URL}/api/auth/login`,
} as const;

export default API_ENDPOINTS;
