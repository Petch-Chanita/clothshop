"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

interface imageItem {
  id: string;
  name: string;
  src: string;
  alt: string;
}

export default function Home() {
  const [randomImages, setRandomImages] = useState<imageItem[]>([]);

  useEffect(() => {
    const images: imageItem[] = [];

    const candidates = products.filter((p) => p.images && p.images.length > 0);
    const usedProductIds = new Set<string>();

    while (images.length < 5 && usedProductIds.size < candidates.length) {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      const product = candidates[randomIndex];

      if (usedProductIds.has(product.id)) continue;
      usedProductIds.add(product.id);

      const image =
        product.images[Math.floor(Math.random() * product.images.length)];

      console.log("product:> ", product);
      console.log("image:> ", image);

      images.push({
        id: product.id,
        name: product.name,
        src: image,
        alt: product.name || `Product ${images.length}`,
      });
    }

    setRandomImages(images);
  }, [products]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Swiper Slide โฆษณา */}
          <div className="pb-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 10000 ,pauseOnMouseEnter: true}}
              pagination={{ clickable: true }}
              loop={true}
              slidesPerView={1}
              className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[480px] rounded-xl overflow-hidden"
            >
              {randomImages.map((image) => (
                <SwiperSlide key={image.id}>
                  <Link href={`/product/${image.id}`} scroll={false}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                        priority
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            ร้านขายเสื้อผ้า
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                images={product.images}
                color={product.color}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
