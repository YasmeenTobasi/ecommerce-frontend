import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('batman_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('batman_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        if (newQty > product.stockQuantity) {
          alert("عذراً، الكمية المطلوبة تتجاوز المخزون المتوفر!");
          return prevCart;
        }
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: newQty } : item);
      } else {
        if (quantity > product.stockQuantity) {
          alert("عذراً، الكمية المطلوبة تتجاوز المخزون المتوفر!");
          return prevCart;
        }
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId, quantity, stockQuantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    if (quantity > stockQuantity) {
      alert("عذراً، الكمية تتجاوز المخزون المتاح!");
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);