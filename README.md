# 📚 PageTurner — Interactive Bookstore Application

> A feature-rich, modern interactive Bookstore web application built with **ReactJS**, **React Router v6**, **React Context API**, **Tailwind CSS**, and **Vitest**.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.11-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)
![Vitest](https://img.shields.io/badge/Tests-10%20Passed-emerald?logo=vitest)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 🌟 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
  - [1. Multi-Page Architecture](#1-multi-page-architecture)
  - [2. Search, Filter & Sort](#2-search-filter--sort)
  - [3. Shopping Cart & Discount Engine](#3-shopping-cart--discount-engine)
  - [4. Seamless Checkout & Tracking](#4-seamless-checkout--tracking)
  - [5. Interactive Customer Reviews](#5-interactive-customer-reviews)
  - [6. Bonus Features (Auth, Dark Mode, Wishlist)](#6-bonus-features)
- [Unit Testing Suite](#-unit-testing-suite)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Running Unit Tests](#running-unit-tests)
  - [Production Build](#production-build)
- [GitHub Repository Setup & Submission Guide](#-github-repository-setup--submission-guide)
- [Deployment Guide (Vercel & Netlify)](#-deployment-guide)

---

## 📖 Project Overview

**PageTurner** is an interactive, production-ready online bookstore designed to provide book lovers with a frictionless discovery, evaluation, and purchasing experience. The application features a catalog across Fiction, Technology, Sci-Fi & Fantasy, Business, Self-Help, Mystery, and Biographies with high-resolution imagery, verified reviews, promotional discount coupons, stock management, responsive layouts, and a celebratory checkout experience.

---

## 🚀 Key Features

### 1. Multi-Page Architecture
* **Home Page (`/`)**:
  * Hero banner with search bar CTA and quick genre shortcuts.
  * Live countdown timer for the **Deal of the Day** (42% discount).
  * Curated carousels/grids for **Trending Bestsellers** and **Developer Library**.
  * Four core value guarantees (Free Express Shipping, 100% Secure Checkout, 30-Day Easy Returns, Genuine Print Guarantee).
  * Reader community testimonials and newsletter subscription with feedback toasts.
* **Book Listing / Catalog Page (`/books`)**:
  * Full catalog browsing with total results counter.
  * Grid View & List View toggle.
  * Active filter tags with instant one-click removal.
  * Responsive sidebar filter with mobile drawer.
  * Graceful empty state when no books match search/filter criteria with a "Reset All Filters" button.
* **Book Details Page (`/books/:id`)**:
  * Breadcrumb navigation (`Home > Books > Category > Title`).
  * High-resolution book cover, badges, and wishlist toggle.
  * Format selector (**Paperback**, **Hardcover**, **eBook**).
  * Real-time stock status indicator (*In Stock*, *Only X left*, *Out of Stock*).
  * Quantity selector with stock ceiling protection.
  * Quick **Add to Cart** and direct **Buy Now** buttons.
  * Comprehensive book metadata (ISBN-13, Pages, Publisher, Language, Publication Year).
  * Tabbed content for Synopsis, Specifications, Author Bio, and Customer Reviews.
  * "Readers Also Explored" recommendations in the same category.
* **Shopping Cart Page (`/cart`)**:
  * Item list with cover thumbnail, format badge, unit price, quantity increment/decrement, line total, and delete button.
  * Stock-limit validation when updating quantity.
  * **Saved for Later** section with "Move to Cart" and delete actions.
  * **Free Shipping Progress Tracker** with a dynamic meter ($35 threshold).
  * Promotional discount coupon applicator with suggested codes.
  * Breakdown: Subtotal, Discount, Estimated Tax (5%), Shipping Fee, Total.
  * Clear cart with prompt confirmation.
* **Checkout Page (`/checkout`)**:
  * 3-Step guided checkout workflow:
    1. **Shipping Details**: Full Name, Email, Phone, Address, City, State, ZIP with field validation.
    2. **Delivery Speed**: Standard Ground (Free), Express 2-Day ($8.99), Overnight Priority ($18.99).
    3. **Payment Method**: Credit/Debit Card form with live preview, UPI/NetBanking, or Cash on Delivery.
  * Sticky Order Summary sidebar with items preview and real-time total.
  * Loading spinner on order placement with graceful validation.
* **Order Success & Receipt Page (`/order-success/:orderId`)**:
  * Celebratory **confetti burst** animation upon arrival.
  * Auto-generated unique order identifier (e.g. `ORD-84920-1948`).
  * Visual delivery status tracking timeline (*Placed*, *Processing*, *Shipped*, *Delivered*).
  * Full itemized invoice with breakdown.
  * Native **Print Invoice** button (`window.print()`).
* **Order History Page (`/orders`)**:
  * Full persistent history of all placed orders.
  * Displays order date, status badges, shipping destination, items, and total price.
  * **Order Again** button to automatically re-add all books from a past order into the cart.
  * Link to view and print past order receipts.
* **Wishlist Page (`/wishlist`)**:
  * Favorite books collection.
  * "Move to Cart" action to immediately prepare for purchase.
* **404 Not Found Page (`*`)**:
  * Illustrated error page with direct navigation back to home or catalog.

---

### 2. Search, Filter & Sort
* **Live Search**: Instant case-insensitive search matching book title, author, category, synopsis, and ISBN.
* **Category Filters**: Filter books across Technology, Fiction, Sci-Fi & Fantasy, Business & Finance, Self-Help, Mystery & Thriller, Biography & History with live book counts.
* **Price Slider**: Adjustable min-max price filter ($10 – $60).
* **Rating Filter**: Filter by minimum customer rating (4.5★+, 4.0★+, 3.5★+).
* **Format Filter**: Filter by Paperback, Hardcover, or eBook.
* **In-Stock Only**: Instant toggle to hide out-of-stock items.
* **Sorting Options**:
  * Most Popular (by review count)
  * Highest Rated (by star rating)
  * Price: Low to High
  * Price: High to Low
  * Newest Releases (by publication year)
  * Title: A to Z

---

### 3. Shopping Cart & Discount Engine
* **Coupon Codes Supported**:
  * `READ10`: 10% off entire order
  * `WELCOME20`: 20% off for orders over $30
  * `FREESHIP`: Free standard ground shipping on any order
  * `BOOKWORM15`: $15 off orders over $60
* **Stock Guarding**: Prevents adding more copies than available in current stock.
* **Saved for Later**: Keep items outside the active subtotal and move back to the cart at any time.

---

### 4. Seamless Checkout & Tracking
* Step-by-step visual indicator (*Shipping -> Delivery -> Payment*).
* Card number, expiration date, and CVC formatting.
* Automatic local storage persistence for orders and cart items.

---

### 5. Interactive Customer Reviews
* Real-time star rating breakdown bar chart (5-star, 4-star, 3-star, etc.).
* Verified purchase customer review cards.
* **Write a Review** form with interactive star rating selector, headline, and comment input that instantly updates the book's rating and review count in state!

---

### 6. Bonus Features
* **User Authentication**:
  * Sign In and Create Account modal.
  * **One-Click Demo Reader Login** (`Alex Turner`) with prefilled addresses and profile data for quick evaluator testing.
  * Navbar user dropdown with avatar, order history, wishlist, and sign-out.
* **Dark Mode & Light Mode**:
  * Theme switcher that persists user preference in `localStorage` and respects system preferences.
* **Toast Notification System**:
  * Non-intrusive floating feedback alerts for all actions (Add to cart, Wishlist, Coupon apply, Quantity update, Order placed).
* **Quick View Modal**:
  * Instant popup on any book to inspect details, pick formats, adjust quantities, and add to cart without navigating away.

---

## 🧪 Unit Testing Suite

The application includes automated unit tests powered by **Vitest** and **React Testing Library**:

* **Cart Calculations & Stock Limits (`src/test/cart.test.jsx`)**:
  * Tests adding items to cart and accurate subtotal calculation.
  * Tests stock boundary enforcement when attempting to add exceeding quantities.
  * Tests coupon discount calculation (`READ10`).
  * Tests item removal from cart and total zeroing.
* **Search, Filter & Sorting Algorithms (`src/test/bookFilter.test.jsx`)**:
  * Tests title and author search accuracy.
  * Tests category filtering.
  * Tests price ascending sorting logic.
* **UI Component Rendering (`src/test/components.test.jsx`)**:
  * Tests `StarRating` rendering with filled/unfilled stars.
  * Tests `Badge` component variant styles.
  * Tests `BookCard` rendering with prices, metadata, and buttons.

### Test Results
```bash
✓ src/test/cart.test.jsx (4 tests)
✓ src/test/bookFilter.test.jsx (3 tests)
✓ src/test/components.test.jsx (3 tests)

Test Files  3 passed (3)
Tests       10 passed (10)
```

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 (Vite 5) |
| **Routing** | React Router v6 (`react-router-dom`) |
| **State Management** | React Context API + Custom Hooks (`useCart`, `useBooks`, `useAuth`, `useWishlist`, `useOrders`, `useToast`) |
| **Styling** | Tailwind CSS v3 + PostCSS + CSS Variables |
| **Icons** | Lucide React |
| **Animations** | Canvas Confetti & CSS Keyframes |
| **Testing** | Vitest, @testing-library/react, @testing-library/jest-dom, JSDOM |

---

## 📂 Project Directory Structure

```
d:/Nxt Wave Project/book/
├── public/
│   └── _redirects                  # SPA redirect rules for static hosting
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthModal.jsx       # Login/Register modal with Demo Login
│   │   ├── books/
│   │   │   ├── BookCard.jsx        # Grid and List book card
│   │   │   ├── BookFilter.jsx      # Multi-criteria filter sidebar
│   │   │   ├── BookGrid.jsx        # Catalog grid & empty state
│   │   │   ├── QuickViewModal.jsx  # Fast book preview modal
│   │   │   └── ReviewSection.jsx   # Ratings breakdown & review form
│   │   ├── cart/
│   │   │   ├── CartItem.jsx        # Line item with quantity & remove
│   │   │   └── CartSummary.jsx     # Order pricing, promo codes, shipping meter
│   │   └── common/
│   │       ├── Badge.jsx           # Reusable badge component
│   │       ├── Footer.jsx          # Site footer with newsletter
│   │       ├── LoadingSkeleton.jsx # Skeleton loaders
│   │       ├── Modal.jsx           # Accessible modal wrapper
│   │       ├── Navbar.jsx          # Top navigation with live search & badges
│   │       ├── StarRating.jsx      # Dynamic & interactive star rating
│   │       └── ToastContainer.jsx  # Floating toast notifications
│   ├── context/
│   │   ├── AuthContext.jsx         # User auth & demo credentials
│   │   ├── BookContext.jsx         # Books catalog, search, filter & sort state
│   │   ├── CartContext.jsx         # Cart state, quantities, coupons, totals
│   │   ├── OrderContext.jsx        # Placed orders, history & receipts
│   │   ├── ToastContext.jsx        # Global toast dispatch system
│   │   └── WishlistContext.jsx     # Wishlist state & favorites
│   ├── data/
│   │   ├── booksData.js            # 16 detailed realistic book catalog entries
│   │   └── promoCodes.js           # Promotional discount codes
│   ├── pages/
│   │   ├── BookDetailsPage.jsx     # Book detail, specs, tabs, reviews
│   │   ├── BookListingPage.jsx     # Full catalog with search & filters
│   │   ├── CartPage.jsx            # Shopping cart & saved for later
│   │   ├── CheckoutPage.jsx        # 3-step checkout form & order review
│   │   ├── HomePage.jsx            # Hero, Deal of day, bestsellers, perks
│   │   ├── NotFoundPage.jsx        # 404 page
│   │   ├── OrderHistoryPage.jsx    # Past orders with re-order action
│   │   ├── OrderSuccessPage.jsx    # Confetti celebration & printable receipt
│   │   └── WishlistPage.jsx        # Wishlist favorites page
│   ├── test/
│   │   ├── setup.js                # Testing library setup
│   │   ├── bookFilter.test.jsx     # Search & filter tests
│   │   ├── cart.test.jsx           # Cart calculations & stock tests
│   │   └── components.test.jsx     # UI component tests
│   ├── App.jsx                     # Root router & context providers
│   ├── index.css                   # Tailwind styles, scrollbars, print rules
│   └── main.jsx                    # React DOM entry point
├── index.html                      # HTML entry with Google fonts & metadata
├── package.json                    # Project dependencies & scripts
├── postcss.config.js               # PostCSS config
├── tailwind.config.js              # Tailwind theme, dark mode, colors
├── vercel.json                     # Vercel SPA rewrite config
└── vite.config.js                  # Vite & Vitest configuration
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

### Installation
1. Clone or open the project directory:
   ```bash
   cd "d:/Nxt Wave Project/book"
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Running Unit Tests
Execute the Vitest automated test suite:
```bash
npm run test
```
To run tests in watch mode during development:
```bash
npm run test:watch
```

### Production Build
Build optimized assets for production:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🐙 GitHub Repository Setup & Submission Guide

To submit this project to a new public GitHub repository:

1. **Initialize Git in the project root**:
   ```bash
   git init
   git branch -M main
   ```

2. **Stage and commit the project files**:
   ```bash
   git add .
   git commit -m "feat: complete interactive ReactJS bookstore with cart, checkout, reviews, auth, and tests"
   ```

3. **Create a new public repository on GitHub**:
   - Go to [https://github.com/new](https://github.com/new).
   - Name your repository (e.g. `pageturner-bookstore` or `react-bookstore-app`).
   - Select **Public**.
   - Do **not** initialize with a README (one is already included).
   - Click **Create repository**.

4. **Link and push to GitHub**:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

---

## 🚀 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New Project** and select your GitHub repository.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**. The included `vercel.json` ensures all client-side routes (`/books`, `/cart`, `/checkout`, `/orders`) resolve properly.

### Deploying to Netlify
1. Sign in to [Netlify](https://netlify.com).
2. Click **Add new site > Import an existing project**.
3. Select your GitHub repository.
4. Build command: `npm run build`.
5. Publish directory: `dist`.
6. Click **Deploy Site**. The included `public/_redirects` ensures seamless SPA routing.

---

## 👨‍💻 Evaluation Checklist Mapping

| Criterion | Implementation in PageTurner | Status |
|---|---|---|
| **Multiple Pages** | Home, Book Listing, Book Details, Shopping Cart, Checkout, Order Success, Order History, Wishlist, 404 | ✅ Complete |
| **Book Search** | Instant case-insensitive search by Title, Author, Genre, Description, ISBN | ✅ Complete |
| **Book Filtering** | Genre categories, Price slider, Star ratings, Format selection, In-stock toggle | ✅ Complete |
| **Add / Remove Cart** | Quantity increment/decrement, format choice, stock validation, clear cart, save for later | ✅ Complete |
| **Order Placement** | Multi-step shipping address validation, delivery options, payment methods, order summary | ✅ Complete |
| **Order Tracking** | Unique Order ID, tracking timeline stepper, itemized printable invoice | ✅ Complete |
| **Bonus: Auth** | Sign in, register, one-click demo login, user profile menu, saved addresses | ✅ Complete |
| **Bonus: Unit Tests** | 10 Vitest tests covering Cart calculations, Filter algorithms, and UI components | ✅ Complete |
| **Bonus: Hosting Setup** | `vercel.json` and `_redirects` preconfigured for one-click deployment | ✅ Complete |
| **User Interface** | Modern responsive design with Tailwind CSS, Lucide icons, Dark/Light mode, animations | ✅ Complete |
| **Error Handling** | Graceful empty states, 404 handler, input validation, stock guards, error toasts | ✅ Complete |
