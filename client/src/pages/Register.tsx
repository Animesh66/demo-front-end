import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_ENDPOINTS from '../config/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!gender) {
            setError('Please select your gender');
            return;
        }

        if (!dateOfBirth) {
            setError('Please select your date of birth');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(API_ENDPOINTS.authRegister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, gender, dateOfBirth }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
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
                    maxWidth: '580px',
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
                                Create Account
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1rem'
                            }}>
                                Join us and start shopping today
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

                        {success && (
                            <div style={{
                                padding: '1rem 1.25rem',
                                background: 'rgba(72, 187, 120, 0.1)',
                                border: '1px solid var(--success)',
                                borderRadius: '12px',
                                color: 'var(--success)',
                                marginBottom: '1.5rem',
                                fontSize: '0.9rem',
                                textAlign: 'center'
                            }}>
                                ✓ Account created! Redirecting to login...
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label className="input-label">Full Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={loading || success}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading || success}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Gender</label>
                                <div style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem'
                                    }}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={(e) => setGender(e.target.value)}
                                            disabled={loading || success}
                                            style={{
                                                cursor: 'pointer',
                                                accentColor: 'var(--accent-primary)'
                                            }}
                                        />
                                        <span>Male</span>
                                    </label>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem'
                                    }}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={(e) => setGender(e.target.value)}
                                            disabled={loading || success}
                                            style={{
                                                cursor: 'pointer',
                                                accentColor: 'var(--accent-primary)'
                                            }}
                                        />
                                        <span>Female</span>
                                    </label>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem'
                                    }}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="other"
                                            checked={gender === 'other'}
                                            onChange={(e) => setGender(e.target.value)}
                                            disabled={loading || success}
                                            style={{
                                                cursor: 'pointer',
                                                accentColor: 'var(--accent-primary)'
                                            }}
                                        />
                                        <span>Other</span>
                                    </label>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Date of Birth</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    required
                                    disabled={loading || success}
                                    max={new Date().toISOString().split('T')[0]}
                                    style={{
                                        colorScheme: 'dark'
                                    }}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading || success}
                                    minLength={6}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={loading || success}
                                    minLength={6}
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
                                    opacity: (loading || success) ? 0.7 : 1
                                }}
                                disabled={loading || success}
                            >
                                {loading ? 'Creating Account...' : success ? 'Success!' : 'Create Account'}
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
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    style={{
                                        color: 'var(--accent-primary)',
                                        fontWeight: '600',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
