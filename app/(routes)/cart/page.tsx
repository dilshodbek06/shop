"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/store/cartStore";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const { cart, removeFromCart, updateCartItemQuantity, clearCart } =
    useCartStore((state) => ({
      cart: state.cart,
      removeFromCart: state.removeFromCart,
      updateCartItemQuantity: state.updateCartItemQuantity,
      clearCart: state.clearCart,
    }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      calculateAllPrice();
    }
  }, [cart, isClient]);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItemQuantity(productId, quantity);
    }
  };

  const calculateAllPrice = () => {
    let s = 0;
    for (let i = 0; i < cart.length; i++) {
      s += (cart[i].quantity ?? 1) * cart[i].price;
    }
    setTotalPrice(s);
  };

  const handleCheckout = async () => {
    try {
      if (cart.length > 0) {
        let obj = {
          totalAmount: totalPrice,
          products: cart,
        };
        setLoading(true);

        await axios.post("/api/order", obj);
        toast.success("Order created.");
        clearCart();
      } else {
        toast.error("Your cart is empty.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Review the items in your cart and proceed to checkout.
          </p>
        </div>
        {cart.length === 0 && <p>Your cart is empty</p>}
        <div className="grid gap-4">
          <div className="grid gap-4 border rounded-lg overflow-hidden">
            {cart.length !== 0 && (
              <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-3">
                <span className="font-medium">Product</span>
                <span className="font-medium">Title</span>
                <span className="font-medium text-right">Quantity</span>
              </div>
            )}

            {cart.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-[100px_1fr_100px] items-center gap-4 px-4 py-3 border-t dark:border-gray-700"
              >
                <Image
                  src={c.imagesUrl[0]}
                  alt={c.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                  style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                />
                <div className="grid gap-1">
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {c.description}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-medium">{c.price} UZS</span>
                  <Select
                    onValueChange={(e) =>
                      handleQuantityChange(c.id, parseInt(e))
                    }
                    defaultValue="1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Qty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{totalPrice} UZS</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium">0 UZS</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Total</span>
              <span>{totalPrice} UZS</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loading}
              onClick={handleCheckout}
              size="lg"
              className="w-full"
            >
              {loading && (
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
              )}
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
