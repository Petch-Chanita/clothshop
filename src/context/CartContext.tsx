"use client";
import { CartItem } from "@/type/cart";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems:(cartItems: CartItem[]) => void;
  removeFromCart: (id: string, size: string) => void;
  cartIconRef: React.RefObject<HTMLDivElement | null>;
  selectedItems: CartItem[];
  setSelectedItems: (selectedItems: CartItem[]) => void;
  totalAmount: number;
  setTotalAmount: (totalAmount: number) => void;
  grandTotal: number;
  setGrandTotal: (grandTotal: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartIconRef = useRef<HTMLDivElement | null>(null);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  const removeFromCart = (id: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        removeFromCart,
        cartIconRef,
        selectedItems,
        setSelectedItems,
        totalAmount,
        setTotalAmount,
        grandTotal,
        setGrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
