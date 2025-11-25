import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Order {
    id: string;
    userId: string;
    items: { productId: string; quantity: number; productName?: string; productPrice?: number }[];
    total: number;
    date: string;
    paymentMethod?: string;
    status?: string;
}

const MyAccount = () => {
    const { user, logout, isLoading } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

    useEffect(() => {
        // Wait for auth to finish loading before redirecting
        if (!isLoading && !user) {
            navigate('/login');
            return;
        }

        if (user) {
            fetchOrders();
        }
    }, [user, navigate, isLoading]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/orders?userId=${user?.id}`);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="container" style={{
                paddingTop: '4rem',
                textAlign: 'center',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.2rem'
                }}>
                    Loading...
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="container fade-in" style={{
            paddingTop: '3rem',
            paddingBottom: '4rem',
            minHeight: '80vh'
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
                My Account
            </h1>
            <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
                fontSize: '1.1rem'
            }}>
                Manage your profile and view your orders
            </p>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                borderBottom: '2px solid var(--border-color)'
            }}>
                <button
                    onClick={() => setActiveTab('profile')}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'profile' ? '3px solid var(--accent-primary)' : '3px solid transparent',
                        color: activeTab === 'profile' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        marginBottom: '-2px'
                    }}
                >
                    👤 Profile
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    style={{
                        padding: '1rem 2rem',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'orders' ? '3px solid var(--accent-primary)' : '3px solid transparent',
                        color: activeTab === 'orders' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        marginBottom: '-2px'
                    }}
                >
                    📦 Orders ({orders.length})
                </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="card" style={{ padding: '2.5rem', maxWidth: '600px' }}>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        marginBottom: '2rem'
                    }}>
                        Profile Information
                    </h2>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Full Name
                            </label>
                            <div style={{
                                padding: '1rem 1.25rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}>
                                {user.name}
                            </div>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Email Address
                            </label>
                            <div style={{
                                padding: '1rem 1.25rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}>
                                {user.email}
                            </div>
                        </div>

                        {user.gender && (
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Gender
                                </label>
                                <div style={{
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    textTransform: 'capitalize'
                                }}>
                                    {user.gender}
                                </div>
                            </div>
                        )}

                        {user.dateOfBirth && (
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Date of Birth
                                </label>
                                <div style={{
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    fontSize: '1.1rem',
                                    fontWeight: '600'
                                }}>
                                    {new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                        className="btn btn-secondary"
                        style={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '1rem',
                            color: 'var(--danger)',
                            borderColor: 'var(--danger)'
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                <div>
                    {loading ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem',
                            color: 'var(--text-secondary)'
                        }}>
                            Loading orders...
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="card" style={{
                            padding: '4rem',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                opacity: 0.5
                            }}>
                                📦
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                marginBottom: '0.5rem'
                            }}>
                                No orders yet
                            </h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                marginBottom: '2rem'
                            }}>
                                Start shopping to see your orders here
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-primary"
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            {orders.map(order => (
                                <div key={order.id} className="card" style={{ padding: '2rem' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'start',
                                        marginBottom: '1.5rem',
                                        paddingBottom: '1.5rem',
                                        borderBottom: '1px solid var(--border-color)'
                                    }}>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.25rem',
                                                fontWeight: '700',
                                                marginBottom: '0.5rem'
                                            }}>
                                                Order #{order.id}
                                            </h3>
                                            <p style={{
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.9rem'
                                            }}>
                                                {formatDate(order.date)}
                                            </p>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            gap: '0.5rem'
                                        }}>
                                            <span style={{
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(72, 187, 120, 0.1)',
                                                border: '1px solid var(--success)',
                                                borderRadius: '8px',
                                                color: 'var(--success)',
                                                fontSize: '0.85rem',
                                                fontWeight: '600'
                                            }}>
                                                {order.status || 'Completed'}
                                            </span>
                                            {order.paymentMethod && (
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    💳 {order.paymentMethod}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        {order.items.map((item, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                borderRadius: '8px'
                                            }}>
                                                <span>
                                                    {item.productName || `Product ${item.productId}`} × {item.quantity}
                                                </span>
                                                <span style={{ fontWeight: '600' }}>
                                                    ${item.productPrice ? item.productPrice * item.quantity : 0}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '1.25rem',
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-hover)'
                                    }}>
                                        <span style={{
                                            fontWeight: '700',
                                            fontSize: '1.1rem'
                                        }}>
                                            Total
                                        </span>
                                        <span style={{
                                            fontWeight: '800',
                                            fontSize: '1.5rem',
                                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            ${order.total}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyAccount;
