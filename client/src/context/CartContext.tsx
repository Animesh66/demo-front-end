import { createContext, useState, useContext, type ReactNode } from 'react';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    salePrice?: number;
}

export interface CartItemOptions {
    color?: string;
    configuration?: string;
}

export interface CartItem extends Product {
    quantity: number;
    options?: CartItemOptions;
    cartItemId: string; // Unique ID for cart item (product + options combo)
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number, options?: CartItemOptions) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const generateCartItemId = (productId: string, options?: CartItemOptions) => {
        const optionsStr = options ? `_${options.color}_${options.configuration}` : '';
        return `${productId}${optionsStr}`;
    };

    const addToCart = (product: Product, quantity: number = 1, options?: CartItemOptions) => {
        setCart(prev => {
            const cartItemId = generateCartItemId(product.id, options);
            const existing = prev.find(item => item.cartItemId === cartItemId);

            if (existing) {
                return prev.map(item =>
                    item.cartItemId === cartItemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, {
                ...product,
                quantity,
                options,
                cartItemId
            }];
        });
    };

    const removeFromCart = (cartItemId: string) => {
        setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }
        setCart(prev => prev.map(item =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Calculate total using salePrice if available
    const total = cart.reduce((sum, item) => {
        const itemPrice = item.salePrice || item.price;
        return sum + itemPrice * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
