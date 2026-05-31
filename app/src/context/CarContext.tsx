"use client";
import { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (producto: any) => {
  const stockDisponible = Number(producto.stock);

  setCart((prevCart) => {
    const itemEnCarrito = prevCart.find((item) => item.id === producto.id);

    if (itemEnCarrito) {
      if (itemEnCarrito.quantity < stockDisponible) {
        return prevCart.map((item) =>
          item.id === producto.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        alert(`¡Acceso denegado! Solo quedan ${stockDisponible} en el inventario.`);
        return prevCart;
      }
    }

    return [...prevCart, { ...producto, quantity: 1 }];
  });
};

const removeFromCart = (productId: string) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === productId);

    if (existingItem && existingItem.quantity > 1) {
      return prevCart.map((item) =>
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    }
    return prevCart.filter((item) => item.id !== productId);
  });
};



  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);