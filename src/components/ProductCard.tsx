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
      </div>
    </>
  );
};

export default ProductCard;
