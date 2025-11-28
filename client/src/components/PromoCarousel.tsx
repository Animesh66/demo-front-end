import { useEffect, useState, useCallback } from 'react';
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

const PromoCarousel = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const nextSlide = useCallback(() => {
        setIndex(prev => (prev + 1) % promos.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 3000);
        return () => clearInterval(timer);
    }, [nextSlide]);

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
                background: `url(${image}) center/cover no-repeat`,
                willChange: 'background-image', // Optimize for animation
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
                    willChange: 'opacity', // Optimize for fade transitions
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
        </section>
    );
};

export default PromoCarousel;
