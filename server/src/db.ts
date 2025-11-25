export interface User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    gender?: string;
    dateOfBirth?: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string; // New field for filtering
}

export interface Order {
    id: string;
    userId: string;
    items: { productId: string; quantity: number; productName?: string; productPrice?: number }[];
    total: number;
    date: string;
    paymentMethod?: string;
    status?: string;
}

export const users: User[] = [];
export const products: Product[] = [
    // Electronics
    { id: '1', name: 'Premium Wireless Headphones', price: 299, description: 'High-fidelity audio with noise cancellation.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '2', name: 'Smart Watch Series 7', price: 399, description: 'Stay connected and healthy with the latest tech.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '3', name: 'Mechanical Keyboard', price: 129, description: 'Tactile feedback for the ultimate typing experience.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '4', name: '4K Monitor', price: 499, description: 'Crystal clear display for work and play.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '5', name: 'Bluetooth Speaker', price: 99, description: 'Portable speaker with deep bass.', image: 'https://images.unsplash.com/photo-1518443885006-4c1e6f5e5c1a?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '6', name: 'Fitness Tracker', price: 79, description: 'Track steps, heart rate, and sleep.', image: 'https://images.unsplash.com/photo-1526403225-8a8c5c9c9c2a?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    // Furniture
    { id: '7', name: 'Ergonomic Office Chair', price: 199, description: 'Comfortable chair for long working hours.', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop&q=60', category: 'Furniture' },
    { id: '8', name: 'Modern Wooden Desk', price: 349, description: 'Sleek desk with natural wood finish.', image: 'https://images.unsplash.com/photo-1582582426576-0e5c5f2c9e6c?w=500&auto=format&fit=crop&q=60', category: 'Furniture' },
    { id: '9', name: 'Cozy Sofa', price: 599, description: 'Plush sofa perfect for living rooms.', image: 'https://images.unsplash.com/photo-1588854337112-6b5c5b6c2a3a?w=500&auto=format&fit=crop&q=60', category: 'Furniture' },
    { id: '10', name: 'Gaming Chair', price: 299, description: 'Ergonomic chair for gamers.', image: 'https://images.unsplash.com/photo-1587614382346-6c5e5c8c5c2b?w=500&auto=format&fit=crop&q=60', category: 'Furniture' },
    { id: '11', name: 'Outdoor Patio Set', price: 799, description: 'Complete set for garden gatherings.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500&auto=format&fit=crop&q=60', category: 'Furniture' },
    // Clothing
    { id: '12', name: 'Classic Leather Jacket', price: 199, description: 'Timeless style with premium leather.', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&auto=format&fit=crop&q=60', category: 'Clothing' },
    { id: '13', name: 'Summer Dress', price: 79, description: 'Light and breezy dress for warm days.', image: 'https://images.unsplash.com/photo-1520975923321-5f0c2b5b9c5c?w=500&auto=format&fit=crop&q=60', category: 'Clothing' },
    { id: '14', name: 'Running Sneakers', price: 119, description: 'Comfortable shoes for daily runs.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a0f3?w=500&auto=format&fit=crop&q=60', category: 'Clothing' },
    { id: '15', name: 'Winter Coat', price: 199, description: 'Warm coat for cold weather.', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&auto=format&fit=crop&q=60', category: 'Clothing' },
    { id: '16', name: 'Silk Scarf', price: 49, description: 'Luxurious scarf for any outfit.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60', category: 'Clothing' },
    // Accessories
    { id: '17', name: 'Stainless Steel Watch', price: 149, description: 'Elegant watch with minimalist design.', image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e4?w=500&auto=format&fit=crop&q=60', category: 'Accessories' },
    { id: '18', name: 'Sunglasses', price: 89, description: 'UV protection with stylish frames.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Accessories' },
    { id: '19', name: 'Leather Backpack', price: 149, description: 'Durable backpack for everyday use.', image: 'https://images.unsplash.com/photo-1567016574530-0e9c8c5c9c4f?w=500&auto=format&fit=crop&q=60', category: 'Accessories' },
    { id: '20', name: 'Gold Earrings', price: 89, description: 'Elegant earrings for special occasions.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Accessories' },
    { id: '21', name: 'Yoga Mat', price: 35, description: 'Non‑slip mat for yoga and workouts.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60', category: 'Accessories' },
    // Home Decor
    { id: '22', name: 'Decorative Wall Art', price: 59, description: 'Abstract art to brighten any room.', image: 'https://images.unsplash.com/photo-1504198266284-5c5d2e3b2c1e?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    { id: '23', name: 'Ceramic Vase', price: 45, description: 'Handcrafted vase for fresh flowers.', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    { id: '24', name: 'LED Desk Lamp', price: 39, description: 'Adjustable brightness for work.', image: 'https://images.unsplash.com/photo-1517430816045-df4b7de6c4b5?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    { id: '25', name: 'Floral Throw Pillow', price: 30, description: 'Add color to any sofa.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    { id: '26', name: 'Coffee Maker', price: 99, description: 'Brew the perfect cup every time.', image: 'https://images.unsplash.com/photo-1518972559570-2c5a8c9b5c6a?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    // Miscellaneous
    { id: '27', name: 'Gaming Mouse', price: 59, description: 'High precision for competitive gaming.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '28', name: 'Digital Camera', price: 549, description: 'Capture high‑resolution photos.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '29', name: 'Travel Backpack', price: 129, description: 'Spacious backpack for trips.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Accessories' },
    { id: '30', name: 'Wireless Charger', price: 29, description: 'Fast charging for smartphones.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '31', name: 'Kids Toy Set', price: 49, description: 'Educational toys for children.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    { id: '32', name: 'Smart Home Hub', price: 199, description: 'Control all smart devices from one place.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '33', name: 'Bluetooth Earbuds', price: 79, description: 'Compact earbuds with great sound.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60', category: 'Electronics' },
    { id: '34', name: 'Desk Organizer', price: 25, description: 'Keep your workspace tidy.', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    { id: '35', name: 'Floral Throw Pillow', price: 30, description: 'Add color to any sofa.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60', category: 'Home Decor' },
    // Food
    { id: '36', name: 'Gourmet Coffee Beans', price: 25, description: 'Premium roasted coffee beans.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60', category: 'Food' },
    { id: '37', name: 'Organic Green Tea', price: 15, description: 'Refreshing and healthy green tea.', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60', category: 'Food' },
    { id: '38', name: 'Artisan Dark Chocolate', price: 12, description: 'Rich dark chocolate bar.', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&auto=format&fit=crop&q=60', category: 'Food' },
    { id: '39', name: 'Mixed Nuts Pack', price: 20, description: 'Healthy snack for energy.', image: 'https://images.unsplash.com/photo-1536591375315-196000ea3646?w=500&auto=format&fit=crop&q=60', category: 'Food' },
    { id: '40', name: 'Olive Oil Bottle', price: 35, description: 'Extra virgin olive oil.', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60', category: 'Food' }
];
export const orders: Order[] = [];
