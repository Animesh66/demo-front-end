import { Link } from 'react-router-dom';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#f8f9fa', // Light background
        color: '#2d3748', // Dark text for contrast
        padding: '3rem 0',
        marginTop: 'auto',
        borderTop: '1px solid #e2e8f0'
      }}
    >
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>

        {/* Navigation Menu */}
        <nav style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link
            to="/shop"
            className="btn btn-primary"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem'
            }}
          >
            Shop Now
          </Link>

          <Link to="/" style={{ color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}>
            Home
          </Link>

          <Link to="/login" style={{ color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}>
            Login
          </Link>

          <Link to="/register" style={{ color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}>
            Register
          </Link>

          <Link to="/terms" style={{ color: '#4a5568', textDecoration: 'none', fontWeight: '500' }}>
            Terms of Service
          </Link>
        </nav>

        {/* Copyright */}
        <div style={{ textAlign: 'center', fontSize: '0.9rem', opacity: 0.8 }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

