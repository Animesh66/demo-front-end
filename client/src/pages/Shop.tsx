import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../context/CartContext';

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use 127.0.0.1 to avoid potential localhost DNS delays
                const response = await fetch('http://127.0.0.1:3000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div style={{ position: 'relative', paddingTop: '4rem' }}>
            {/* Header Section */}
            <section className="container fade-in" style={{
                paddingBottom: '2rem',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Shop All Products
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Browse our complete collection of premium items
                </p>
            </section>

            {/* Category Filter */}
            <section className="container" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    {loading ? (
                        // Skeleton for categories
                        [1, 2, 3, 4].map(i => (
                            <div key={i} style={{ width: '80px', height: '36px', background: 'var(--card-bg)', borderRadius: '25px' }} />
                        ))
                    ) : (
                        categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '25px',
                                    border: '1px solid var(--border-color)',
                                    background: selectedCategory === category
                                        ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))'
                                        : 'var(--card-bg)',
                                    color: selectedCategory === category ? '#fff' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: '500'
                                }}
                            >
                                {category}
                            </button>
                        ))
                    )}
                </div>
            </section>

            {/* Products Grid */}
            <section className="container" style={{
                paddingBottom: '4rem',
                minHeight: '400px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2.5rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                    }}>
                        {selectedCategory === 'All' ? 'All Products' : `${selectedCategory}`}
                    </h2>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        {loading ? '...' : `${filteredProducts.length} items`}
                    </span>
                </div>

                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px'
                    }}>
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: 'clamp(1rem, 3vw, 2rem)'
                    }}>
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="fade-in"
                                style={{
                                    animationDelay: `${index * 0.05}s`
                                }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Shop;
