import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await response.json();
            login(data.token, data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0'
        }}>
            <div className="container">
                <div style={{
                    maxWidth: '480px',
                    margin: '0 auto'
                }}>
                    <div className="card fade-in" style={{
                        padding: '3rem'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{
                                fontSize: '2.25rem',
                                fontWeight: '800',
                                marginBottom: '0.75rem',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Welcome Back
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1rem'
                            }}>
                                Sign in to continue shopping
                            </p>
                        </div>

                        {error && (
                            <div style={{
                                padding: '1rem 1.25rem',
                                background: 'rgba(245, 101, 101, 0.1)',
                                border: '1px solid var(--danger)',
                                borderRadius: '12px',
                                color: 'var(--danger)',
                                marginBottom: '1.5rem',
                                fontSize: '0.9rem',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    width: '100%',
                                    marginTop: '0.5rem',
                                    padding: '1rem',
                                    fontSize: '1rem',
                                    opacity: loading ? 0.7 : 1
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div style={{
                            marginTop: '2rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--border-color)',
                            textAlign: 'center'
                        }}>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.95rem'
                            }}>
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    style={{
                                        color: 'var(--accent-primary)',
                                        fontWeight: '600',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
