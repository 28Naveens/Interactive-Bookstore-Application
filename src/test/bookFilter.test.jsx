import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { BookProvider, useBooks } from '../context/BookContext';
import { ToastProvider } from '../context/ToastContext';

const TestFilterConsumer = () => {
  const {
    filteredBooks,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    setMinRating,
  } = useBooks();

  return (
    <div>
      <div data-testid="results-count">{filteredBooks.length}</div>
      <div data-testid="first-title">
        {filteredBooks.length > 0 ? filteredBooks[0].title : ''}
      </div>

      <button onClick={() => setSearchQuery('Atomic Habits')}>
        Search Atomic
      </button>
      <button onClick={() => setSelectedCategory('Technology')}>
        Filter Tech
      </button>
      <button onClick={() => setMinRating(4.8)}>
        Filter High Rating
      </button>
      <button onClick={() => setSortBy('price-asc')}>
        Sort Price Low
      </button>
    </div>
  );
};

describe('Book Catalog Search, Filter & Sort', () => {
  it('searches books by title correctly', () => {
    render(
      <ToastProvider>
        <BookProvider>
          <TestFilterConsumer />
        </BookProvider>
      </ToastProvider>
    );

    // Initial total is 16
    expect(Number(screen.getByTestId('results-count').textContent)).toBeGreaterThan(0);

    act(() => {
      screen.getByText('Search Atomic').click();
    });

    expect(screen.getByTestId('results-count').textContent).toBe('1');
    expect(screen.getByTestId('first-title').textContent).toContain('Atomic Habits');
  });

  it('filters books by category accurately', () => {
    render(
      <ToastProvider>
        <BookProvider>
          <TestFilterConsumer />
        </BookProvider>
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Filter Tech').click();
    });

    const count = Number(screen.getByTestId('results-count').textContent);
    expect(count).toBeGreaterThan(0);
  });

  it('sorts books by price low to high', () => {
    render(
      <ToastProvider>
        <BookProvider>
          <TestFilterConsumer />
        </BookProvider>
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Sort Price Low').click();
    });

    // The first book should be the lowest priced book in the catalog ($12.99)
    expect(screen.getByTestId('first-title').textContent).toBe('The Da Vinci Code');
  });
});
