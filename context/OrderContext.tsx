'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface OrderItem {
  key: string; // "slug|variant"
  name: string;
  variant: string;
  price: number;
  qty: number;
}

interface OrderContextType {
  items: OrderItem[];
  addToOrder: (item: { slug: string; name: string; variant: string; price: number }) => void;
  removeItem: (key: string) => void;
  clearOrder: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  totalCost: number;
  totalQty: number;
  sendWA: () => void;
  sendEmail: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage once on mount
  useEffect(() => {
    const saved = localStorage.getItem('reel_order_cart');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change
  const updatedItems = (newItems: OrderItem[]) => {
    setItems(newItems);
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('reel_order_cart', JSON.stringify(newItems));
    }
  };

  const addToOrder = (item: { slug: string; name: string; variant: string; price: number }) => {
    const key = `${item.slug}|${item.variant}`;
    const existingIndex = items.findIndex((i) => i.key === key);

    if (existingIndex > -1) {
      const copy = [...items];
      copy[existingIndex].qty += 1;
      updatedItems(copy);
    } else {
      updatedItems([
        ...items,
        {
          key,
          name: item.name,
          variant: item.variant,
          price: item.price,
          qty: 1,
        },
      ]);
    }
    setIsOpen(true); // Automatically slide up the order builder
  };

  const removeItem = (key: string) => {
    updatedItems(items.filter((i) => i.key !== key));
  };

  const clearOrder = () => {
    updatedItems([]);
    setIsOpen(false);
  };

  const totalCost = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  // Senders format text nicely
  const getOrderSummaryText = () => {
    let text = `═══ REEL CASH & CURRENCY ORDER ═══\n\n`;
    text += `Hello, I would like to place an order for the following replica banknotes:\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;
      text += `   • Variant: ${item.variant}\n`;
      text += `   • Quantity: ${item.qty} bundle(s)\n`;
      text += `   • Subtotal: $${item.price * item.qty} USD\n\n`;
    });
    text += `═══════════════════════════════════\n`;
    text += `Total Product Count: ${totalQty}\n`;
    text += `Estimated Cost: $${totalCost} USD\n`;
    text += `Please send me payment instructions and dispatch timeline.\n`;
    text += `═══════════════════════════════════`;
    return encodeURIComponent(text);
  };

  const sendWA = () => {
    const text = getOrderSummaryText();
    // Default country dial code or secure placeholder for flexible configuration
    const number = "18437320661"; // Luxury support placeholder
    window.open(`https://wa.me/${number}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const sendEmail = () => {
    const text = getOrderSummaryText();
    const mailtoUrl = `mailto:sales@reelbills.com?subject=Prop Currency Order Request&body=${text}`;
    window.location.href = mailtoUrl;
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addToOrder,
        removeItem,
        clearOrder,
        isOpen,
        setIsOpen,
        totalCost,
        totalQty,
        sendWA,
        sendEmail,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
