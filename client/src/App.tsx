import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// Footer component for site-wide navigation
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Checkout = lazy(() => import('./pages/Checkout'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Shop = lazy(() => import('./pages/Shop'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div className="loading-spinner"></div>
    <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
