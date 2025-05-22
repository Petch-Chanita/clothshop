"use client";
import { ProductItem } from "@/type/productItem";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface ProductContextType {
  productItems: ProductItem[];
  setProductItems: React.Dispatch<React.SetStateAction<ProductItem[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
 

  return (
    <ProductContext.Provider
      value={{
        productItems,
        setProductItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
