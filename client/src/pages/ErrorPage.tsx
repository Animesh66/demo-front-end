import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { error, reason } = location.state || {};

    // Optional: Redirect if no error state is present, but for now we'll allow viewing it for testing if needed, 
    // or better yet, redirect to home if accessed directly without state.
    useEffect(() => {
        if (!error && !reason) {
            navigate('/');
        }
    }, [error, reason, navigate]);

    if (!error && !reason) return null;

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
                maxWidth: '500px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                border: '1px solid var(--danger)'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(245, 101, 101, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'var(--danger)',
                    marginBottom: '1rem',
                    boxShadow: '0 10px 25px rgba(245, 101, 101, 0.2)'
                }}>
                    ✕
                </div>

                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                }}>
                    Payment Failed
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    marginBottom: '1rem'
                }}>
                    We couldn't process your payment.
                </p>

                <div style={{
                    width: '100%',
                    background: 'rgba(245, 101, 101, 0.05)',
                    borderRadius: '8px',
                    padding: '1rem',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    border: '1px solid rgba(245, 101, 101, 0.2)'
                }}>
                    <p style={{
                        color: 'var(--danger)',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                    }}>
                        Reason: {reason || error || 'Unknown error occurred'}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="btn btn-primary"
                        style={{ flex: 1, background: 'var(--danger)', borderColor: 'var(--danger)' }}
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate('/contact')}
                        className="btn btn-secondary"
                        style={{ flex: 1 }}
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
