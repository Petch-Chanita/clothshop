"use client";
import React, { FC, memo, useEffect, useState } from "react";
import cn from "clsx";
import s from "./Searchbar.module.css";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useProduct } from "@/context/ProductContext";

interface Props {
  className?: string;
  id?: string;
}

const Searchbar: FC<Props> = ({ className, id = "search" }) => {
  const router = useRouter();
  const { setProductItems } = useProduct();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const matchedProduct: any[] = products?.filter((product) =>
        product?.name.toLowerCase().includes(query.toLowerCase())
      );

      setProductItems(matchedProduct);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      console.log("matchedProduct: ", matchedProduct);
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <label className="hidden" htmlFor={id}>
        ค้นหา
      </label>
      <input
        id={id}
        className={s.input}
        placeholder="ค้นหาสินค้า..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={s.iconContainer}>
        <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
      </div>
    </div>
  );
};

export default memo(Searchbar);
