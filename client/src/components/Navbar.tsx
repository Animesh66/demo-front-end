import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
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
                        <path d="M16 8L20 12H18V20H14V12H12L16 8Z" fill="white" />
                        <path d="M10 22H22V24H10V22Z" fill="white" />
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#764ba2" />
                            </linearGradient>
                        </defs>
                    </svg>
                    TechStore
                </Link>

                <nav style={{
                    display: 'flex',
                    gap: 'clamp(0.75rem, 2vw, 2rem)',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end'
                }}>
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
                            color: 'var(--text-primary)',
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
                                    color: 'var(--text-primary)',
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
                                    color: 'var(--text-primary)',
                                    fontWeight: '500',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                My Account
                            </Link>

                            <span style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                Hi, <span style={{ color: 'var(--accent-primary)' }}>{user?.name}</span>
                            </span>

                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.9rem'
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
                                    color: 'var(--text-primary)',
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
