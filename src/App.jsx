import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';
import AuthModal from './components/auth/AuthModal';

import HomePage from './pages/HomePage';
import BookListingPage from './pages/BookListingPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BookProvider>
          <WishlistProvider>
            <CartProvider>
              <OrderProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <AuthModal />
                    <ToastContainer />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/books" element={<BookListingPage />} />
                        <Route path="/books/:id" element={<BookDetailsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                        <Route path="/orders" element={<OrderHistoryPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </BrowserRouter>
              </OrderProvider>
            </CartProvider>
          </WishlistProvider>
        </BookProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
