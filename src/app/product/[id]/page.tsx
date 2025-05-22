"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import s from "./page.module.css";
import { Cart, Minus, Plus } from "@/components/icon";
import { notFound, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/type/cart";
import { motion } from "framer-motion";
import { animateFlyToCart } from "@/utils/animateFlyToCart";
import { v4 as uuidv4 } from "uuid";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { cartIconRef,setCartItems } = useCart();
  const { id } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productRef = useRef<HTMLDivElement>(null);

  const checking = () => {
    return (
      <>
        {/* <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50"> */}
        <div className="flex justify-center items-center mt-[50vh]">
          <section className={s.dots_container}>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
          </section>
        </div>
        {/* </div> */}
      </>
    );
  };


  const addToCart = (item: CartItem) => {
      setCartItems((prev: CartItem[]) => {
        const exists = prev.find((i:any) => i.id === item.id && i.size === item.size);
        if (exists) {
          return prev.map((i:any) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...item }];
      });
    };


  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    console.log("foundProduct", foundProduct);

    if (foundProduct) {
      setProduct(foundProduct);
    }
    setIsChecking(false);
  }, [id]);


  if (isChecking) {
    return checking();
  }

  if (!isChecking && !product) notFound();

  const warning = (
    <p className=" text-red-600 mt-3">กรุณาเลือกไซส์ก่อนเพิ่มลงตะกร้า</p>
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);

    if (productRef.current && cartIconRef.current) {
      animateFlyToCart(productRef.current, cartIconRef.current);
    }

    const item: CartItem = {
      id: uuidv4(),
      name: product.name,
      size: selectedSize,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    };

    addToCart(item);
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log(item);

  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 items-start">
        {/* Gallery */}
        <div className="w-full">
          <div
            ref={productRef}
            className="relative w-3/4 mx-auto aspect-square rounded overflow-hidden shadow-md"
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {product?.images.map((img: any, index: number) => (
              <Image
                key={index}
                src={img}
                alt={`${product.name} - ${index + 1}`}
                width={60}
                height={60}
                className={`rounded-md border cursor-pointer ${
                  selectedImage === index
                    ? "border-amber-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <p className="text-xl sm:text-2xl text-gray-800">
              {product.price} ฿
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <p className="font-semibold mb-2 mt-6">ไซส์</p>

            <div className="flex flex-wrap gap-2">
              {product?.sizes.map((size: any) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 border rounded-xl transition ${
                    selectedSize === size
                      ? " bg-[#313030] text-white border-gray-[#313030] "
                      : " bg-white text-black border-gray-300 hover:bg-gray-50 hover:border-gray-50"
                  } hover:border-gray-800`}
                >
                  {size}
                </button>
              ))}
            </div>
            {showWarning && warning}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-semibold mb-2 mt-6">จำนวน</p>
            <div className="flex items-center gap-8">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className={`px-2 py-2 border border-gray-100 rounded-lg hover:bg-gray-100 ${
                  quantity === 1
                    ? "bg-gray-100 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <Minus />
              </button>
              <span className="text-lg ">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-2 py-2 border border-gray-100 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* Button cart */}
          <motion.button
            className={`w-full sm:w-auto cursor-pointer ${s.button_cart}`}
            onClick={handleAddToCart}
          >
            <div className="left-0">
              <Cart />
            </div>
            เพิ่มลงตะกร้า
          </motion.button>

          <div className="py-10">
            <p className="font-bold mb-2 text-lg">รายละเอียด</p>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
