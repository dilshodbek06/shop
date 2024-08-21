"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductCardProps {
  imagesUrl: string[];
  title: string;
  description: string;
  price: number;
  id: string;
}

const ProductCard = ({
  imagesUrl,
  description,
  price,
  title,
  id,
}: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="max-w-md w-full mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
      <div className="relative max-w-[300px] w-full h-[170px] border-2">
        <Image
          className="w-full object-cover h-full"
          src={imagesUrl[0]}
          alt={title}
          width={300}
          height={170}
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
          NEW
        </div>
        <div className="absolute cursor-pointer hover:scale-105 transition top-0 left-0  px-2 py-1 m-2 rounded-md text-sm font-medium">
          <Heart className="text-sky-900" />
        </div>
      </div>
      <div className="px-4 py-3  h-full">
        <Link href={`/product-detail/${id}`}>
          <h3 className="text-lg font-medium mb-2 hover:underline underline-offset-2 cursor-pointer hover:text-sky-600">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex gap-1 items-center justify-between">
          <span className="font-bold text-lg">{price} UZS</span>
          <Button
            onClick={() => {
              addToCart({
                title,
                description,
                imagesUrl,
                price,
                quantity: 1,
                id,
              });
              toast.success("Product added to cart");
            }}
            className="scale-90 md:scale-100"
          >
            add cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
