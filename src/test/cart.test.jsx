import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

// Helper test component
const TestCartConsumer = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromoCode,
    subtotal,
    discount,
    shippingFee,
    total,
  } = useCart();

  const dummyBook = {
    id: 'test-1',
    title: 'Testing in React',
    author: 'Jest & Vitest',
    price: 20.0,
    stock: 5,
    formats: ['Paperback'],
  };

  return (
    <div>
      <div data-testid="cart-count">{cartItems.length}</div>
      <div data-testid="subtotal">{subtotal}</div>
      <div data-testid="discount">{discount}</div>
      <div data-testid="shipping">{shippingFee}</div>
      <div data-testid="total">{total}</div>

      <button onClick={() => addToCart(dummyBook, 1, 'Paperback')}>
        Add 1
      </button>
      <button onClick={() => addToCart(dummyBook, 10, 'Paperback')}>
        Add 10 (exceeds stock)
      </button>
      <button onClick={() => updateQuantity('test-1', 'Paperback', 3)}>
        Update to 3
      </button>
      <button onClick={() => applyPromoCode('READ10')}>
        Apply READ10
      </button>
      <button onClick={() => removeFromCart('test-1', 'Paperback')}>
        Remove Item
      </button>
    </div>
  );
};

describe('Cart Context & Calculations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds an item to cart and calculates subtotal accurately', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <TestCartConsumer />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('subtotal').textContent).toBe('0');

    // Add item
    act(() => {
      screen.getByText('Add 1').click();
    });

    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('subtotal').textContent).toBe('20');
  });

  it('enforces maximum available stock when adding exceeding quantity', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <TestCartConsumer />
        </CartProvider>
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Add 10 (exceeds stock)').click();
    });

    // Stock max is 5, so 5 items should be added
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('subtotal').textContent).toBe('100'); // 5 * 20
  });

  it('applies promo code discounts correctly', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <TestCartConsumer />
        </CartProvider>
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Add 1').click(); // subtotal: 20
    });

    act(() => {
      screen.getByText('Apply READ10').click(); // 10% of 20 = 2
    });

    expect(screen.getByTestId('discount').textContent).toBe('2');
  });

  it('removes item from cart', () => {
    render(
      <ToastProvider>
        <CartProvider>
          <TestCartConsumer />
        </CartProvider>
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Add 1').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('1');

    act(() => {
      screen.getByText('Remove Item').click();
    });
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('subtotal').textContent).toBe('0');
  });
});
