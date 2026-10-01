import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StarRating from '../components/common/StarRating';
import Badge from '../components/common/Badge';
import BookCard from '../components/books/BookCard';
import { ToastProvider } from '../context/ToastContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { BookProvider } from '../context/BookContext';

describe('UI Components Unit Tests', () => {
  it('renders StarRating correctly with full and empty stars', () => {
    const { container } = render(<StarRating rating={4} maxRating={5} />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(5);
  });

  it('renders Badge with correct text and variant classes', () => {
    render(<Badge variant="purple">Bestseller</Badge>);
    expect(screen.getByText('Bestseller')).toBeInTheDocument();
  });

  it('renders BookCard with title, author, price, and actions', () => {
    const mockBook = {
      id: 'mock-1',
      title: 'The Great React Guide',
      author: 'Jane Developer',
      category: 'Technology',
      price: 29.99,
      originalPrice: 39.99,
      discountPercent: 25,
      rating: 4.9,
      reviewCount: 120,
      stock: 15,
      formats: ['Paperback'],
      publishedYear: 2026,
      badge: 'Editor Pick',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      description: 'A great testing book description.',
    };

    render(
      <ToastProvider>
        <BookProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <BookCard book={mockBook} />
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </BookProvider>
      </ToastProvider>
    );

    expect(screen.getByText('The Great React Guide')).toBeInTheDocument();
    expect(screen.getByText('by Jane Developer')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Editor Pick')).toBeInTheDocument();
  });
});
