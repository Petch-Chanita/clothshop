import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";

interface ProductProps {
  id?: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  color: string;
}

const ProductCard: FC<ProductProps> = ({
  id,
  name,
  price,
  images,
  description,
  color,
}) => {

  return (
    <>
      <div className="group relative">
        <Link key={id} href={`/product/${id}`} scroll={false} className="block">
          <Image
            key={id}
            src={images[0]}
            alt={name}
            width={300}
            height={300}
            className="cursor-pointer aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />

          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-900">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{color}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{price}฿</p>
          </div>
        </Link>
        {/* <div className="flex justify-center relative">
    <button className="cursor-pointer mt-6 w-full flex items-center justify-center gap-x-2 px-4 py-2 bg-indigo-500 text-white rounded-4xl hover:bg-indigo-400 transition duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      เพิ่มลงตะกร้า
    </button>
  </div> */}
      </div>
    </>
  );
};

export default ProductCard;
