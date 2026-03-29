import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PromoCarousel from '../components/PromoCarousel';
import ProductCard from '../components/ProductCard';
import type { Product } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

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

    // Display only the first 8 products as "Featured"
    const featuredProducts = products.slice(0, 8);

    return (
        <div style={{ position: 'relative' }}>
            <PromoCarousel />

            {/* Hero Text */}
            <section className="container fade-in" style={{
                paddingTop: '2rem',
                paddingBottom: '3rem',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '900',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-2px',
                    lineHeight: '1.1'
                }}>
                    Discover Premium Tech & More
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 2rem',
                    lineHeight: '1.8'
                }}>
                    Explore our curated collection of cutting-edge technology, furniture, and fashion.
                </p>
            </section>

            {/* Featured Products Grid */}
            <section className="container" style={{
                paddingBottom: '4rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2.5rem'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                    }}>
                        Featured Products
                    </h2>
                    <Link to="/shop" style={{
                        color: 'var(--accent-primary)',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        View All <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                    </Link>
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
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="fade-in">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link
                        to="/shop"
                        className="btn btn-primary"
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem'
                        }}
                    >
                        View All Products
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
