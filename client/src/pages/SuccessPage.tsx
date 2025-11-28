import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderDetails } = location.state || {};

    useEffect(() => {
        if (!orderDetails) {
            navigate('/');
        }
    }, [orderDetails, navigate]);

    if (!orderDetails) return null;

    return (
        <div className="container fade-in" style={{
            paddingTop: '4rem',
            paddingBottom: '4rem',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div className="card" style={{
                padding: '3rem',
                maxWidth: '600px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'white',
                    marginBottom: '1rem',
                    boxShadow: '0 10px 25px rgba(72, 187, 120, 0.4)'
                }}>
                    ✓
                </div>

                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                }}>
                    Payment Successful!
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    marginBottom: '2rem'
                }}>
                    Thank you for your purchase. Your order has been confirmed.
                </p>

                <div style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textAlign: 'left',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '0.5rem'
                    }}>
                        Order Details
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Order ID:</span>
                            <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Amount Paid:</span>
                            <span style={{ fontWeight: '600', color: 'var(--success)' }}>${orderDetails.total}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Payment Method:</span>
                            <span style={{ fontWeight: '600' }}>{orderDetails.paymentMethod}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Items:</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {orderDetails.items.map((item: any, index: number) => (
                                <li key={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.9rem',
                                    marginBottom: '0.25rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <span>{item.productName} (x{item.quantity})</span>
                                    <span>${item.productPrice * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <button
                        onClick={() => navigate('/shop')}
                        className="btn btn-secondary"
                        style={{ flex: 1 }}
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={() => navigate('/my-account')}
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                    >
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
