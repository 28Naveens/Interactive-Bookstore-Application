import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { PROMO_CODES } from '../data/promoCodes';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { toast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_saved_later');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bookstore_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart with localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('bookstore_saved_later', JSON.stringify(savedForLater));
    } catch (e) {
      console.error('Failed to sync savedForLater with localStorage', e);
    }
  }, [savedForLater]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('bookstore_promo', JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem('bookstore_promo');
      }
    } catch (e) {
      console.error('Failed to sync promo with localStorage', e);
    }
  }, [appliedPromo]);

  // Add book to cart
  const addToCart = (book, quantity = 1, format = null) => {
    const selectedFormat = format || (book.formats && book.formats[0]) || 'Paperback';
    const parsedQty = Math.max(1, parseInt(quantity, 10) || 1);

    const existingIndex = cartItems.findIndex(
      (item) => item.book.id === book.id && item.format === selectedFormat
    );

    if (existingIndex > -1) {
      const existingItem = cartItems[existingIndex];
      const newQty = existingItem.quantity + parsedQty;

      if (newQty > book.stock) {
        toast.warning(`Only ${book.stock} copies of "${book.title}" are available in stock.`);
        const updated = [...cartItems];
        updated[existingIndex] = { ...existingItem, quantity: book.stock };
        setCartItems(updated);
        return;
      }

      toast.success(`Updated "${book.title}" quantity to ${newQty} in your cart!`);
      const updated = [...cartItems];
      updated[existingIndex] = { ...existingItem, quantity: newQty };
      setCartItems(updated);
    } else {
      if (parsedQty > book.stock) {
        toast.warning(`Only ${book.stock} copies of "${book.title}" available.`);
        setCartItems([...cartItems, { book, quantity: book.stock, format: selectedFormat }]);
        return;
      }

      toast.success(`Added "${book.title}" to your cart!`);
      setCartItems([...cartItems, { book, quantity: parsedQty, format: selectedFormat }]);
    }
  };

  // Update item quantity
  const updateQuantity = (bookId, format, newQty) => {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(bookId, format);
      return;
    }

    setCartItems(
      cartItems.map((item) => {
        if (item.book.id === bookId && item.format === format) {
          const maxStock = item.book.stock;
          if (qty > maxStock) {
            toast.warning(`Maximum available stock for "${item.book.title}" is ${maxStock}.`);
            return { ...item, quantity: maxStock };
          }
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  // Remove from cart
  const removeFromCart = (bookId, format) => {
    const itemToRemove = cartItems.find((item) => item.book.id === bookId && item.format === format);
    if (itemToRemove) {
      toast.info(`Removed "${itemToRemove.book.title}" from your cart.`);
    }
    setCartItems(cartItems.filter((item) => !(item.book.id === bookId && item.format === format)));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  // Save for later
  const moveToSavedForLater = (bookId, format) => {
    const item = cartItems.find((i) => i.book.id === bookId && i.format === format);
    if (!item) return;

    setCartItems((prev) => prev.filter((i) => !(i.book.id === bookId && i.format === format)));
    setSavedForLater((prev) => {
      const exists = prev.some((i) => i.book.id === bookId && i.format === format);
      if (exists) return prev;
      return [...prev, item];
    });
    toast.info(`Moved "${item.book.title}" to Saved for Later.`);
  };

  // Move back to cart from saved for later
  const moveToCartFromSaved = (bookId, format) => {
    const item = savedForLater.find((i) => i.book.id === bookId && i.format === format);
    if (!item) return;

    setSavedForLater((prev) => prev.filter((i) => !(i.book.id === bookId && i.format === format)));
    addToCart(item.book, item.quantity, item.format);
  };

  const removeSavedItem = (bookId, format) => {
    setSavedForLater((prev) => prev.filter((i) => !(i.book.id === bookId && i.format === format)));
  };

  // Promo code validation and calculation
  const applyPromoCode = (inputCode) => {
    const cleanCode = inputCode.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === cleanCode);

    if (!found) {
      toast.error(`Invalid promo code "${inputCode}". Try READ10 or WELCOME20.`);
      return false;
    }

    if (found.minSubtotal && subtotal < found.minSubtotal) {
      toast.warning(`Promo code ${found.code} requires a minimum order of $${found.minSubtotal}.`);
      return false;
    }

    setAppliedPromo(found);
    toast.success(`Promo code "${found.code}" applied! ${found.description}`);
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toast.info('Promo code removed.');
  };

  // Price calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = Number(
    cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0).toFixed(2)
  );

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discount = Number(((subtotal * appliedPromo.value) / 100).toFixed(2));
    } else if (appliedPromo.type === 'fixed') {
      discount = Math.min(subtotal, appliedPromo.value);
    }
  }

  // Shipping: Free if subtotal after discount >= 35 or FREESHIP promo, else 4.99 (or 0 if cart is empty)
  const isFreeShipping =
    subtotal === 0 ||
    subtotal - discount >= 35 ||
    (appliedPromo && appliedPromo.type === 'shipping');

  const shippingFee = isFreeShipping ? 0 : 4.99;

  // Tax: 5% of discounted subtotal
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Number((taxableAmount * 0.05).toFixed(2));

  // Grand total
  const total = Number((taxableAmount + shippingFee + tax).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        savedForLater,
        moveToSavedForLater,
        moveToCartFromSaved,
        removeSavedItem,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        shippingFee,
        isFreeShipping,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
