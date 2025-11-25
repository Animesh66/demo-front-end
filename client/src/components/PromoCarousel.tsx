import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const promos = [
    {
        id: 'bf',
        title: 'Black Friday Sale',
        image: 'https://images.unsplash.com/photo-1580910051077-6c2a0d5e5c4e?w=1200&auto=format&fit=crop&q=60',
        link: '/shop' // could link to a collection page
    },
    {
        id: 'xmas',
        title: 'Christmas Sale',
        image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&auto=format&fit=crop&q=60',
        link: '/shop'
    },
    {
        id: 'ny',
        title: 'New Year Sale',
        image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200&auto=format&fit=crop&q=60',
        link: '/shop'
    }
];

const PromoCarousel = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % promos.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const { title, image, link } = promos[index];

    return (
        <section
            className="promo-carousel"
            style={{
                position: 'relative',
                height: '50vh',
                marginBottom: '2rem',
                borderRadius: '12px',
                overflow: 'hidden',
                background: `url(${image}) center/cover no-repeat`
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '0 2rem'
                }}
            >
                <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', marginBottom: '1rem' }}>{title}</h2>
                <button
                    onClick={() => navigate(link)}
                    className="btn btn-primary"
                    style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px var(--accent-glow)'
                    }}
                >
                    Shop Now
                </button>
            </div>
        </section>
    );
};

export default PromoCarousel;
