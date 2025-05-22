"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import s from "./Navbar.module.css";

import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Searchbar from "../Searchbar";
import { Bag, Cart } from "@/components/icon";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

interface NavbarProps {
  // links?: Link[]
}

const Navbar: FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const controls = useAnimation();
  
  const { cartItems, setCartItems, cartIconRef } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (cartItems.length > 0) {
      controls.start({
        scale: [1, 1.2, 0.9, 1],
        transition: { duration: 0.4 },
      });
    }
    console.log("cartItems cartItems", cartItems);
  }, [cartItems]);

  useEffect(() => {

      const cartData = localStorage.getItem("cart");
      if (cartData) {
        try {
          const parsedCart = JSON.parse(cartData);
          setCartItems(parsedCart);
          console.log("parsedCart", parsedCart);
        } catch (error) {
          console.error("Error parsing cart data:", error);
        }
      }
  
  }, []);


  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/cart");
  };

  return (
    <div className="bg-[#313030]">
      <Container clean className="mx-auto max-w-8xl px-6">
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className={s.navMenu}>
              <Link href="/" className={s.link}>
                ทั้งหมด
              </Link>
            </nav>
          </div>
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar className="flex items-center" />
          </div>
          <div className="flex items-center justify-end flex-1 space-x-8">
            <button
              aria-label="Open cart"
              onClick={handleClick}
              className="cursor-pointer"
            >
              <motion.div
                animate={controls}
                ref={cartIconRef}
                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
              >
                <Cart />
                {totalQuantity > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
