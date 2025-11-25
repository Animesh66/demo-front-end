import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import MyAccount from './pages/MyAccount';
import TermsOfService from './pages/TermsOfService';
import Shop from './pages/Shop';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
