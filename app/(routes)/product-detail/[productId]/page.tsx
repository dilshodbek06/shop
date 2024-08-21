"use client";

import Loading from "@/app/_components/loading";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/store/cartStore";
import { Product } from "@prisma/client";
import axios from "axios";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const breadcrumbItems = [
  { title: "Home", link: "/" },
  { title: "Product Detail", link: "/product-detail/:id" },
];

const ProductDetailPage = ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const fetchCurrentProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/api/product/${productId}`);
      setCurrentProduct(response.data);
      setSelectedImage(response.data?.imagesUrl[0]);
    } catch (error) {
      toast.error("Failed to load product details");
    }
  }, [productId]);

  useEffect(() => {
    fetchCurrentProduct();
  }, [fetchCurrentProduct]);

  const handleChange = useCallback((count: string) => {
    setQuantity(parseInt(count, 10));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (currentProduct) {
      addToCart({
        title: currentProduct.title,
        description: currentProduct.description,
        imagesUrl: currentProduct.imagesUrl,
        price: currentProduct.price,
        quantity,
        id: currentProduct.id,
      });
      toast.success("Product added to cart");
    }
  }, [currentProduct, addToCart, quantity]);

  if (!currentProduct) {
    return <Loading />;
  }

  return (
    <div className="grid gap-6 lg:gap-12 max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center space-x-2 text-sm">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="grid md:grid-cols-5 gap-3 items-start">
          <div className="flex flex-row justify-between md:justify-normal md:flex-col gap-3 items-start">
            {currentProduct.imagesUrl.map((url, ind) => (
              <button
                key={ind}
                onClick={() => setSelectedImage(url)}
                className={`border ${
                  selectedImage === url ? "border-gray-900" : ""
                } hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50`}
              >
                <Image
                  src={url}
                  alt={`Preview image ${ind + 1}`}
                  width={100}
                  height={100}
                  quality={90}
                  className="aspect-[5/6] object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          <div className="md:col-span-4">
            <Image
              src={selectedImage || currentProduct.imagesUrl[0]}
              alt={currentProduct.title}
              width={600}
              height={700}
              quality={90}
              className="object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              placeholder="blur"
              blurDataURL={selectedImage || currentProduct.imagesUrl[0]} // Optionally use a small blur image
              loading="lazy"
            />
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4 text-sm leading-loose">
            <h2 className="text-2xl font-bold">{currentProduct.title}</h2>
            <p className="text-xl font-medium opacity-70">
              {currentProduct.description}
            </p>
            <p className="font-medium text-sky-800">
              {currentProduct.price} UZS
            </p>
          </div>
          <Separator />
          <div className="grid gap-4 md:gap-10">
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-base">
                Quantity
              </Label>
              <Select
                value={quantity.toString()}
                onValueChange={handleChange}
                defaultValue="1"
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <SelectItem key={val} value={val.toString()}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button onClick={handleAddToCart} type="button" size="lg">
                Add to cart
              </Button>
              <Button disabled type="button" size="lg" variant="outline">
                <HeartIcon className="w-4 h-4 mr-2" />
                Add to wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
