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
    { id: '1', name: 'Premium Wireless Headphones', price: 299, description: 'High-fidelity audio with noise cancellation.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '2', name: 'Smart Watch Series 7', price: 399, description: 'Stay connected and healthy with the latest tech.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '3', name: 'Mechanical Keyboard', price: 129, description: 'Tactile feedback for the ultimate typing experience.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '4', name: '4K Monitor', price: 499, description: 'Crystal clear display for work and play.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '5', name: 'Bluetooth Speaker', price: 99, description: 'Portable speaker with deep bass.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '6', name: 'Fitness Tracker', price: 79, description: 'Track steps, heart rate, and sleep.', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    // Furniture
    { id: '7', name: 'Ergonomic Office Chair', price: 199, description: 'Comfortable chair for long working hours.', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&auto=format&fit=crop&q=80', category: 'Furniture' },
    { id: '8', name: 'Modern Wooden Desk', price: 349, description: 'Sleek desk with natural wood finish.', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop&q=80', category: 'Furniture' },
    { id: '9', name: 'Cozy Sofa', price: 599, description: 'Plush sofa perfect for living rooms.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=80', category: 'Furniture' },
    { id: '10', name: 'Gaming Chair', price: 299, description: 'Ergonomic chair for gamers.', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop&q=80', category: 'Furniture' },
    { id: '11', name: 'Outdoor Patio Set', price: 799, description: 'Complete set for garden gatherings.', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&auto=format&fit=crop&q=80', category: 'Furniture' },
    // Clothing
    { id: '12', name: 'Classic Leather Jacket', price: 199, description: 'Timeless style with premium leather.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80', category: 'Clothing' },
    { id: '13', name: 'Summer Dress', price: 79, description: 'Light and breezy dress for warm days.', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80', category: 'Clothing' },
    { id: '14', name: 'Running Sneakers', price: 119, description: 'Comfortable shoes for daily runs.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80', category: 'Clothing' },
    { id: '15', name: 'Winter Coat', price: 199, description: 'Warm coat for cold weather.', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&auto=format&fit=crop&q=80', category: 'Clothing' },
    { id: '16', name: 'Silk Scarf', price: 49, description: 'Luxurious scarf for any outfit.', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&auto=format&fit=crop&q=80', category: 'Clothing' },
    // Accessories
    { id: '17', name: 'Stainless Steel Watch', price: 149, description: 'Elegant watch with minimalist design.', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=80', category: 'Accessories' },
    { id: '18', name: 'Sunglasses', price: 89, description: 'UV protection with stylish frames.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=80', category: 'Accessories' },
    { id: '19', name: 'Leather Backpack', price: 149, description: 'Durable backpack for everyday use.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80', category: 'Accessories' },
    { id: '20', name: 'Gold Earrings', price: 89, description: 'Elegant earrings for special occasions.', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80', category: 'Accessories' },
    { id: '21', name: 'Yoga Mat', price: 35, description: 'Non‑slip mat for yoga and workouts.', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=80', category: 'Accessories' },
    // Home Decor
    { id: '22', name: 'Decorative Wall Art', price: 59, description: 'Abstract art to brighten any room.', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    { id: '23', name: 'Ceramic Vase', price: 45, description: 'Handcrafted vase for fresh flowers.', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    { id: '24', name: 'LED Desk Lamp', price: 39, description: 'Adjustable brightness for work.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    { id: '25', name: 'Floral Throw Pillow', price: 30, description: 'Add color to any sofa.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    { id: '26', name: 'Coffee Maker', price: 99, description: 'Brew the perfect cup every time.', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    // Miscellaneous
    { id: '27', name: 'Gaming Mouse', price: 59, description: 'High precision for competitive gaming.', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '28', name: 'Digital Camera', price: 549, description: 'Capture high‑resolution photos.', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '29', name: 'Travel Backpack', price: 129, description: 'Spacious backpack for trips.', image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=500&auto=format&fit=crop&q=80', category: 'Accessories' },
    { id: '30', name: 'Wireless Charger', price: 29, description: 'Fast charging for smartphones.', image: 'https://images.unsplash.com/photo-1591290619762-d71b2f8f4f8e?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '31', name: 'Kids Toy Set', price: 49, description: 'Educational toys for children.', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    { id: '32', name: 'Smart Home Hub', price: 199, description: 'Control all smart devices from one place.', image: 'https://images.unsplash.com/photo-1558089687-e5a5c3d9d785?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '33', name: 'Bluetooth Earbuds', price: 79, description: 'Compact earbuds with great sound.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80', category: 'Electronics' },
    { id: '34', name: 'Desk Organizer', price: 25, description: 'Keep your workspace tidy.', image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    { id: '35', name: 'Decorative Candles', price: 30, description: 'Scented candles for ambiance.', image: 'https://images.unsplash.com/photo-1602874801006-c2b5f2f6c1a5?w=500&auto=format&fit=crop&q=80', category: 'Home Decor' },
    // Food
    { id: '36', name: 'Gourmet Coffee Beans', price: 25, description: 'Premium roasted coffee beans.', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&auto=format&fit=crop&q=80', category: 'Food' },
    { id: '37', name: 'Organic Green Tea', price: 15, description: 'Refreshing and healthy green tea.', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&auto=format&fit=crop&q=80', category: 'Food' },
    { id: '38', name: 'Artisan Dark Chocolate', price: 12, description: 'Rich dark chocolate bar.', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500&auto=format&fit=crop&q=80', category: 'Food' },
    { id: '39', name: 'Mixed Nuts Pack', price: 20, description: 'Healthy snack for energy.', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=80', category: 'Food' },
    { id: '40', name: 'Olive Oil Bottle', price: 35, description: 'Extra virgin olive oil.', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80', category: 'Food' }
];
export const orders: Order[] = [];
