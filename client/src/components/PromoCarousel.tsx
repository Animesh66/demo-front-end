import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import blackFridayImg from '../assets/black_friday_tech.png';
import christmasImg from '../assets/christmas_sale.png';
import newYearImg from '../assets/new_year_sale.png';

const promos = [
    {
        id: 'bf',
        title: 'Black Friday Sale',
        image: blackFridayImg,
        link: '/shop' // could link to a collection page
    },
    {
        id: 'xmas',
        title: 'Christmas Sale',
        image: christmasImg,
        link: '/shop'
    },
    {
        id: 'ny',
        title: 'New Year Sale',
        image: newYearImg,
        link: '/shop'
    }
];

const PromoCarousel = memo(() => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const nextSlide = useCallback(() => {
        setIndex(prev => (prev + 1) % promos.length);
    }, []);

    const prevSlide = useCallback(() => {
        setIndex(prev => (prev - 1 + promos.length) % promos.length);
    }, []);

    const { title, image, link } = promos[index];

    return (
        <section
            className="promo-carousel"
            style={{
                position: 'relative',
                height: '40vh', // Reduced from 50vh for better performance
                marginBottom: '2rem',
                borderRadius: '12px',
                overflow: 'hidden',
                background: `url(${image}) center/cover no-repeat`,
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
                    padding: '0 2rem',
                }}
            >
                <h2 style={{
                    fontSize: 'clamp(2rem,5vw,3rem)',
                    marginBottom: '1rem',
                    animation: 'fadeIn 0.5s ease-out'
                }}>{title}</h2>
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

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Previous slide"
            >
                ←
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Next slide"
            >
                →
            </button>

            {/* Slide Indicators */}
            <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '0.5rem',
                zIndex: 10
            }}>
                {promos.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setIndex(idx)}
                        style={{
                            width: idx === index ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            background: idx === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
});

PromoCarousel.displayName = 'PromoCarousel';

export default PromoCarousel;
