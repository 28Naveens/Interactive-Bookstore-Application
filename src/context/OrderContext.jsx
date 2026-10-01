import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bookstore_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders with localStorage', e);
    }
  }, [orders]);

  const placeOrder = ({ items, shippingAddress, shippingMethod, paymentMethod, totals }) => {
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    
    // Estimate delivery in 3 to 5 business days
    const deliveryDate = new Date(now);
    deliveryDate.setDate(now.getDate() + (shippingMethod?.days || 4));

    const newOrder = {
      id: orderNumber,
      createdAt: now.toISOString(),
      estimatedDelivery: deliveryDate.toISOString(),
      status: 'Confirmed',
      items: [...items],
      shippingAddress: { ...shippingAddress },
      shippingMethod: { ...shippingMethod },
      paymentMethod: { ...paymentMethod },
      totals: { ...totals },
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find((o) => o.id === id) || null;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
