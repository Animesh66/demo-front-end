import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import type { Product } from '../context/CartContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { cart } = useCart();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Search products
    useEffect(() => {
        const searchProducts = async () => {
            if (searchQuery.trim().length < 2) {
                setSearchResults([]);
                setShowResults(false);
                return;
            }

            try {
                const response = await fetch('http://127.00.1:3000/api/products');
                const products: Product[] = await response.json();

                const query = searchQuery.toLowerCase();

                // Score each product based on match relevance
                const scoredProducts = products.map(product => {
                    let score = 0;
                    const name = product.name.toLowerCase();
                    const description = product.description.toLowerCase();
                    const category = product.category.toLowerCase();

                    // Exact name match gets highest score
                    if (name === query) score += 100;
                    // Name starts with query
                    else if (name.startsWith(query)) score += 50;
                    // Name contains query
                    else if (name.includes(query)) score += 30;

                    // Description contains query (lower priority)
                    if (description.includes(query)) score += 10;

                    // Category match (lowest priority)
                    if (category.includes(query)) score += 5;

                    return { product, score };
                }).filter(item => item.score > 0)
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map(item => item.product);

                setSearchResults(scoredProducts);
                setShowResults(scoredProducts.length > 0);
            } catch (error) {
                console.error('Error searching products:', error);
            }
        };

        const debounce = setTimeout(searchProducts, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleProductClick = (productId: string) => {
        setSearchQuery('');
        setShowResults(false);
        navigate(`/shop`); // Navigate to shop page - you could add product detail page later
    };

    return (
        <header>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.5px'
                }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                        <path d="M16 8L20 12H18V20H14V12H12L16 8Z" fill="currentColor" />
                        <path d="M10 22H22V24H10V22Z" fill="currentColor" />
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#764ba2" />
                            </linearGradient>
                        </defs>
                    </svg>
                    TechStore
                </Link>

                {/* Search Bar */}
                <div ref={searchRef} style={{
                    position: 'relative',
                    flex: '1',
                    maxWidth: '400px',
                    minWidth: '200px'
                }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.6rem 1rem',
                            borderRadius: '25px',
                            border: '2px solid var(--border-hover)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: 'inherit',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                            if (searchResults.length > 0) setShowResults(true);
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-hover)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                        }}
                    />

                    {/* Search Results Dropdown */}
                    {showResults && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 0.5rem)',
                            left: 0,
                            right: 0,
                            background: 'var(--card-bg)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            color: 'var(--text-primary)'
                        }}>
                            {searchResults.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product.id)}
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        padding: '0.75rem',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid var(--border-color)',
                                        transition: 'background 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            marginBottom: '0.25rem',
                                            color: 'var(--text-primary)'
                                        }}>
                                            {product.name}
                                        </div>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--text-muted)'
                                        }}>
                                            {product.category}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontWeight: '700',
                                        color: 'var(--accent-primary)',
                                        fontSize: '0.9rem'
                                    }}>
                                        ${product.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <nav style={{
                    display: 'flex',
                    gap: 'clamp(0.75rem, 2vw, 2rem)',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'inherit',
                            transition: 'transform 0.3s ease'
                        }}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <Link
                        to="/shop"
                        className="btn btn-primary"
                        style={{
                            padding: '0.5rem 1.25rem',
                            fontSize: '0.9rem',
                            marginRight: '0.5rem'
                        }}
                    >
                        Shop Now
                    </Link>

                    <Link
                        to="/"
                        style={{
                            color: 'inherit',
                            fontWeight: '500',
                            transition: 'color 0.3s ease'
                        }}
                    >
                        Home
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/cart"
                                style={{
                                    position: 'relative',
                                    color: 'inherit',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                Cart
                                {cartItemCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-14px',
                                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                        color: '#fff',
                                        borderRadius: '12px',
                                        padding: '0.15rem 0.5rem',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        boxShadow: '0 2px 8px var(--accent-glow)',
                                        minWidth: '20px',
                                        textAlign: 'center'
                                    }}>
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>

                            <Link
                                to="/my-account"
                                style={{
                                    color: 'inherit',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                My Account
                            </Link>

                            <span style={{
                                color: 'inherit',
                                opacity: 0.8,
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                Hi, <span style={{ color: 'var(--accent-primary)' }}>{user?.name}</span>
                            </span>

                            <button
                                onClick={handleLogout}
                                className="btn"
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.9rem',
                                    background: 'rgba(128, 128, 128, 0.1)',
                                    border: '1px solid currentColor',
                                    color: 'inherit'
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                style={{
                                    color: 'inherit',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-primary"
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
