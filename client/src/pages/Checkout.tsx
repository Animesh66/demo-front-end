import { useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = memo(() => {
    const { cart, total, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const getCardType = (number: string) => {
        const cleaned = number.replace(/\s/g, '');
        if (cleaned.startsWith('4')) return 'visa';
        if (cleaned.startsWith('5')) return 'mastercard';
        if (cleaned.startsWith('34') || cleaned.startsWith('37')) return 'amex';
        return '';
    };

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, '');
        const chunks = cleaned.match(/.{1,4}/g);
        return chunks ? chunks.join(' ') : cleaned;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');
        if (value.length <= 16 && /^\d*$/.test(value)) {
            setCardNumber(formatCardNumber(value));
            const type = getCardType(value);
            if (type) setPaymentMethod(type);
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        setExpiryDate(value);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 4 && /^\d*$/.test(value)) {
            setCvv(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!paymentMethod) {
            setError('Please enter a valid card number');
            return;
        }

        if (cardNumber.replace(/\s/g, '').length !== 16) {
            setError('Card number must be 16 digits');
            return;
        }

        // Luhn Algorithm for card validation
        const validateCardNumber = (number: string) => {
            const digits = number.replace(/\s/g, '').split('').map(Number);
            let sum = 0;
            let isSecond = false;
            for (let i = digits.length - 1; i >= 0; i--) {
                let d = digits[i];
                if (isSecond) {
                    d *= 2;
                    if (d > 9) d -= 9;
                }
                sum += d;
                isSecond = !isSecond;
            }
            return sum % 10 === 0;
        };

        if (!validateCardNumber(cardNumber)) {
            setError('Invalid card number');
            return;
        }

        if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
            setError('Invalid expiry date format (MM/YY)');
            return;
        }

        // Expiry Date Validation
        const [expMonth, expYear] = expiryDate.split('/').map(Number);
        const now = new Date();
        const currentYear = now.getFullYear() % 100; // Get last two digits of year
        const currentMonth = now.getMonth() + 1; // 1-indexed

        if (expMonth < 1 || expMonth > 12) {
            setError('Invalid expiry month');
            return;
        }

        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            setError('Card has expired');
            return;
        }

        if (cvv.length < 3) {
            setError('Invalid CVV');
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        productName: item.name,
                        productPrice: item.price
                    })),
                    total,
                    paymentMethod: paymentMethod.toUpperCase()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            const orderDetails = {
                total,
                paymentMethod: paymentMethod.toUpperCase(),
                items: cart.map(item => ({
                    productName: item.name,
                    quantity: item.quantity,
                    productPrice: item.price
                }))
            };

            clearCart();
            navigate('/success', { state: { orderDetails } });
        } catch (err: any) {
            console.error('Error placing order:', err);
            navigate('/error', {
                state: {
                    error: 'Payment Failed',
                    reason: err.message || 'Transaction declined by bank'
                }
            });
        } finally {
            setIsProcessing(false);
        }
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    if (cart.length === 0) {
        navigate('/cart');
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
                Secure Checkout
            </h1>
            <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
                fontSize: '1.1rem'
            }}>
                Complete your purchase securely
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
                gap: '2.5rem',
                alignItems: 'start'
            }}>
                {/* Payment Form */}
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '2rem'
                    }}>
                        Payment Information
                    </h2>

                    {error && (
                        <div style={{
                            padding: '1rem 1.25rem',
                            background: 'rgba(245, 101, 101, 0.1)',
                            border: '1px solid var(--danger)',
                            borderRadius: '12px',
                            color: 'var(--danger)',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Card Number</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    required
                                    disabled={isProcessing}
                                    style={{ paddingRight: '3.5rem' }}
                                />
                                {paymentMethod && (
                                    <div style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: '1.5rem',
                                        fontWeight: '700'
                                    }}>
                                        {paymentMethod === 'visa' && '💳 VISA'}
                                        {paymentMethod === 'mastercard' && '💳 MC'}
                                        {paymentMethod === 'amex' && '💳 AMEX'}
                                    </div>
                                )}
                            </div>
                            <div style={{
                                marginTop: '0.5rem',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>
                                Accepted: VISA (4xxx), MasterCard (5xxx), Amex (34xx/37xx)
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Cardholder Name</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="John Doe"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                                disabled={isProcessing}
                            />
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.5rem'
                        }}>
                            <div className="input-group">
                                <label className="input-label">Expiry Date</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="MM/YY"
                                    value={expiryDate}
                                    onChange={handleExpiryChange}
                                    required
                                    disabled={isProcessing}
                                    maxLength={5}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">CVV</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="123"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    required
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                marginTop: '1.5rem',
                                padding: '1.25rem',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                opacity: isProcessing ? 0.7 : 1
                            }}
                            disabled={isProcessing}
                        >
                            {isProcessing ? '🔄 Processing Payment...' : `💳 Pay $${total}`}
                        </button>

                        <p style={{
                            marginTop: '1.5rem',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem'
                        }}>
                            🔒 Your payment information is secure and encrypted
                        </p>
                    </form>
                </div>

                {/* Order Summary */}
                <div style={{ position: 'sticky', top: '100px' }}>
                    <div className="card" style={{ padding: '2rem' }}>
                        <h3 style={{
                            marginBottom: '1.5rem',
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
                            {cart.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.9rem'
                                }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span style={{ fontWeight: '600' }}>
                                        ${item.price * item.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: 'var(--text-secondary)',
                                fontSize: '0.95rem'
                            }}>
                                <span>Subtotal</span>
                                <span>${total}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: 'var(--text-secondary)',
                                fontSize: '0.95rem'
                            }}>
                                <span>Shipping</span>
                                <span style={{ color: 'var(--success)' }}>FREE</span>
                            </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
});

Checkout.displayName = 'Checkout';

export default Checkout;
