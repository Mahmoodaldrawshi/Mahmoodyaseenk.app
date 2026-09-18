import React, { createContext, useState, useEffect, useContext } from 'react';

export const OrderContext = createContext({});

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastId, setLastId] = useState(() => {
    const saved = localStorage.getItem('lastId');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lastId', lastId.toString());
  }, [lastId]);

  const addOrder = (orderData) => {
    const newId = lastId + 1;
    const newOrder = {
      ...orderData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'مخزن', // Default status
      isDeleted: false,
    };
    setOrders([newOrder, ...orders]);
    setLastId(newId);
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const softDeleteOrder = (id) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, isDeleted: true } : order
    ));
  };

  const restoreOrder = (id) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, isDeleted: false } : order
    ));
  };

  const deleteOrderPermanently = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const activeOrders = orders.filter(o => !o.isDeleted);
  const deletedOrders = orders.filter(o => o.isDeleted);

  return (
    <OrderContext.Provider value={{
      orders,
      activeOrders,
      deletedOrders,
      addOrder,
      updateOrderStatus,
      softDeleteOrder,
      restoreOrder,
      deleteOrderPermanently
    }}>
      {children}
    </OrderContext.Provider>
  );
}
