import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = memo(() => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = useCallback(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate('/checkout');
    }, [user, navigate]);

    if (cart.length === 0) {
        return (
            <div className="container" style={{
                paddingTop: '6rem',
                paddingBottom: '6rem',
                textAlign: 'center',
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '1.5rem',
                    opacity: 0.5
                }}>
                    🛒
                </div>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                }}>
                    Your cart is empty
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    fontSize: '1.1rem'
                }}>
                    Discover amazing products and start shopping!
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="btn btn-primary"
                    style={{ padding: '1rem 2.5rem' }}
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container fade-in" style={{
            paddingTop: '3rem',
            paddingBottom: '4rem'
        }}>
            <h1 style={{
                marginBottom: '0.5rem',
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
            }}>
                Shopping Cart
            </h1>
            <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
                fontSize: '1.1rem'
            }}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
                gap: '2.5rem',
                alignItems: 'start'
            }}>
                {/* Cart Items */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    {cart.map(item => {
                        const itemPrice = item.salePrice || item.price;
                        return (
                            <div
                                key={item.cartItemId}
                                className="card"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '120px 1fr auto',
                                    gap: '1.5rem',
                                    alignItems: 'center',
                                    padding: '1.5rem'
                                }}
                            >
                                <div style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '12px',
                                    background: 'rgba(0, 0, 0, 0.2)'
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{
                                        marginBottom: '0.5rem',
                                        fontSize: '1.25rem',
                                        fontWeight: '700'
                                    }}>
                                        {item.name}
                                    </h3>

                                    {/* Show options if available */}
                                    {item.options && (
                                        <p style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.85rem',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {item.options.color && `Color: ${item.options.color}`}
                                            {item.options.color && item.options.configuration && ' • '}
                                            {item.options.configuration && `Config: ${item.options.configuration}`}
                                        </p>
                                    )}

                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.95rem',
                                        marginBottom: '0.75rem'
                                    }}>
                                        {item.salePrice ? (
                                            <>
                                                <span style={{ textDecoration: 'line-through', marginRight: '0.5rem' }}>
                                                    ${item.price}
                                                </span>
                                                <span style={{ color: 'var(--danger)', fontWeight: '600' }}>
                                                    ${item.salePrice} each
                                                </span>
                                            </>
                                        ) : (
                                            `$${item.price} each`
                                        )}
                                    </p>

                                    {/* Quantity controls */}
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--text-primary)',
                                                cursor: 'pointer',
                                                fontSize: '1.2rem',
                                                padding: '0 0.5rem',
                                                fontWeight: '700'
                                            }}
                                        >
                                            −
                                        </button>
                                        <span style={{
                                            fontWeight: '700',
                                            color: 'var(--accent-primary)',
                                            fontSize: '1.1rem',
                                            minWidth: '30px',
                                            textAlign: 'center'
                                        }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--text-primary)',
                                                cursor: 'pointer',
                                                fontSize: '1.2rem',
                                                padding: '0 0.5rem',
                                                fontWeight: '700'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        fontWeight: '800',
                                        fontSize: '1.5rem',
                                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        ${itemPrice * item.quantity}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.cartItemId)}
                                        className="btn btn-secondary"
                                        style={{
                                            color: 'var(--danger)',
                                            borderColor: 'var(--danger)',
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Order Summary */}
                <div style={{ position: 'sticky', top: '100px' }}>
                    <div className="card" style={{ padding: '2rem' }}>
                        <h3 style={{
                            marginBottom: '2rem',
                            fontSize: '1.5rem',
                            fontWeight: '700'
                        }}>
                            Order Summary
                        </h3>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            paddingBottom: '1.5rem',
                            borderBottom: '1px solid var(--border-color)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>Subtotal</span>
                                <span>${total}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>Shipping</span>
                                <span style={{ color: 'var(--success)' }}>FREE</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>Tax</span>
                                <span>$0</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '2rem',
                            padding: '1.25rem',
                            background: 'rgba(102, 126, 234, 0.1)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-hover)'
                        }}>
                            <span style={{
                                fontWeight: '700',
                                fontSize: '1.25rem'
                            }}>
                                Total
                            </span>
                            <span style={{
                                fontWeight: '800',
                                fontSize: '1.75rem',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                ${total}
                            </span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                padding: '1.25rem',
                                fontSize: '1.1rem',
                                fontWeight: '700'
                            }}
                        >
                            Proceed to Checkout
                        </button>

                        <p style={{
                            marginTop: '1.5rem',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem'
                        }}>
                            🔒 Secure checkout guaranteed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CartPage;
