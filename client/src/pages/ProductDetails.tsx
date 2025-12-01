import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart, type Product } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Selection states
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedConfig, setSelectedConfig] = useState<string>('');
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Mock options based on category (simplified)
    const getOptions = (category: string) => {
        switch (category) {
            case 'Electronics':
                return {
                    colors: ['Black', 'Silver', 'White'],
                    configs: ['Standard', 'Pro', 'Max']
                };
            case 'Clothing':
                return {
                    colors: ['Red', 'Blue', 'Black', 'Beige'],
                    configs: ['S', 'M', 'L', 'XL']
                };
            case 'Furniture':
                return {
                    colors: ['Oak', 'Walnut', 'White', 'Black'],
                    configs: ['Standard']
                };
            default:
                return {
                    colors: ['Standard'],
                    configs: ['Standard']
                };
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);

                // Initialize defaults
                const options = getOptions(data.category);
                setSelectedColor(options.colors[0]);
                setSelectedConfig(options.configs[0]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    const handleAddToCart = () => {
        if (!product) return;

        addToCart(product, quantity, {
            color: selectedColor,
            configuration: selectedConfig
        });

        // Show feedback
        showToast(`Added ${quantity} ${product.name}(s) (${selectedColor}, ${selectedConfig}) to cart!`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="loading-spinner"></div>
        </div>
    );

    if (error || !product) return (
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Product not found</h2>
            <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Back to Shop
            </button>
        </div>
    );

    const options = getOptions(product.category);

    return (
        <div className="container fade-in" style={{ padding: '4rem 1rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem'
                }}
            >
                ← Back
            </button>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'start'
            }}>
                {/* Image Section */}
                <div
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        background: 'var(--card-bg)',
                        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                        height: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                    onClick={() => setIsZoomed(!isZoomed)}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain', // Changed to contain to see full product
                            transform: isZoomed ? `scale(2)` : 'scale(1)',
                            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                            transition: isZoomed ? 'none' : 'transform 0.3s ease',
                            display: 'block'
                        }}
                    />
                    {!isZoomed && (
                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            background: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            pointerEvents: 'none'
                        }}>
                            Hover/Click to Zoom
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{
                            color: 'var(--accent-primary)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            letterSpacing: '1px'
                        }}>
                            {product.category}
                        </span>
                        <h1 style={{
                            fontSize: '2.5rem',
                            margin: '0.5rem 0',
                            lineHeight: '1.2'
                        }}>
                            {product.name}
                        </h1>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            marginTop: '1rem'
                        }}>
                            ${product.price}
                        </div>
                    </div>

                    <p style={{
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        fontSize: '1.1rem',
                        marginBottom: '2rem'
                    }}>
                        {product.description}
                    </p>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        marginBottom: '2.5rem',
                        padding: '2rem',
                        background: 'var(--card-bg)',
                        borderRadius: '12px'
                    }}>
                        {/* Color Selection */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                                Color: <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>{selectedColor}</span>
                            </label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {options.colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            border: selectedColor === color
                                                ? '2px solid var(--accent-primary)'
                                                : '2px solid transparent',
                                            padding: '2px',
                                            background: 'transparent',
                                            cursor: 'pointer'
                                        }}
                                        title={color}
                                    >
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            background: color.toLowerCase(),
                                            border: '1px solid var(--border-color)'
                                        }} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Configuration/Size Selection */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                                Configuration:
                            </label>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {options.configs.map(config => (
                                    <button
                                        key={config}
                                        onClick={() => setSelectedConfig(config)}
                                        style={{
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '8px',
                                            border: selectedConfig === config
                                                ? '2px solid var(--accent-primary)'
                                                : '1px solid var(--border-color)',
                                            background: selectedConfig === config
                                                ? 'rgba(var(--accent-primary-rgb), 0.1)'
                                                : 'transparent',
                                            color: selectedConfig === config
                                                ? 'var(--accent-primary)'
                                                : 'var(--text-primary)',
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {config}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                                Quantity:
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'transparent',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    -
                                </button>
                                <span style={{ fontSize: '1.2rem', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'transparent',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleAddToCart}
                            className="btn"
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: 'transparent',
                                border: '2px solid var(--accent-primary)',
                                color: 'var(--accent-primary)',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="btn btn-primary"
                            style={{
                                flex: 1,
                                padding: '1rem',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                boxShadow: '0 4px 15px var(--accent-glow)'
                            }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
