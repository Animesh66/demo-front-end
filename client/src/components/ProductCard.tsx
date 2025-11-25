import { useState } from 'react';
import type { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <div className="card" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                marginBottom: '1.25rem',
                background: 'rgba(0, 0, 0, 0.2)'
            }}>
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        display: 'block'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px var(--accent-glow)',
                    letterSpacing: '0.5px'
                }}>
                    NEW
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                    marginBottom: '0.75rem',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    lineHeight: '1.3'
                }}>
                    {product.name}
                </h3>

                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    flex: 1
                }}>
                    {product.description}
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                    }}>
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: '600'
                        }}>
                            Price
                        </span>
                        <span style={{
                            fontSize: '1.75rem',
                            fontWeight: '800',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: '1'
                        }}>
                            ${product.price}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="btn btn-primary"
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem',
                            transform: isAdding ? 'scale(0.95)' : 'scale(1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {isAdding ? '✓ Added' : '+ Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
