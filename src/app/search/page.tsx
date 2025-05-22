"use client";
import ProductCard from "@/components/ProductCard";
import { useProduct } from "@/context/ProductContext";
import { products } from "@/data/products";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./page.module.css";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { productItems, setProductItems } = useProduct();
  const [isChecking, setIsChecking] = useState(true);

  const checking = () => {
    return (
      <div className="flex justify-center items-center mt-[50vh]">
        <section className={s.dots_container}>
          <div className={s.dot}></div>
          <div className={s.dot}></div>
          <div className={s.dot}></div>
          <div className={s.dot}></div>
          <div className={s.dot}></div>
        </section>
      </div>
    );
  };

  useEffect(() => {
    setIsChecking(true);
    let filteredProducts = [];

    if (query) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filteredProducts = products;
    }
    setProductItems(filteredProducts);
    setIsChecking(false);
  }, [query, setProductItems]);

  console.log("productItems", productItems);

  return (
    <>
      <div className="bg-white">
        {isChecking ? (
          checking()
        ) : (
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {!query ? (
              <h2 className="text-2xl font-semibold  tracking-tight text-gray-900">
                ร้านขายเสื้อผ้า
              </h2>
            ) : (
              <h2 className="text-2xl  tracking-tight text-gray-900">
                ค้นหา: {query}
              </h2>
            )}

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productItems.length > 0 ? (
                productItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    images={product.images}
                    color={product.color}
                  />
                ))
              ) : (
                <p>ไม่พบสินค้า</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
