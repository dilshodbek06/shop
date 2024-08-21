"use client";

import { Order, OrderProduct, Product } from "@prisma/client";
import OrderCard from "./order-card";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface OrderWithProducts extends Order {
  products: (OrderProduct & { product: Product })[]; // Adjust the type to match the data structure from Prisma
}

interface OrderListProps {
  items: OrderWithProducts[];
}

const OrderList = ({ items }: OrderListProps) => {
  const [orderId, setOrderId] = useState<string | null>(null);

  const router = useRouter();

  const changeStatus = async (status: string) => {
    try {
      await axios.put(`/api/order/${orderId}`, {
        status: status,
      });
      router.refresh();
      toast.success("Ordered Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  function handleDragStart(orderId: string) {
    setOrderId(orderId);
  }

  return (
    <div className="min-h-[27rem] flex shadow-md border-2 border-gray-600">
      {/* OPEN */}
      <div className="w-1/3 overflow-y-auto">
        <h3 className="text-center font-medium text-lg">OPEN</h3>
        <div
          onDrop={() => changeStatus("OPEN")}
          onDragOver={(e) => e.preventDefault()}
          className="px-3 min-h-[200px]"
        >
          {/* OPEN orders in here */}

          {items.map((order, ind) => {
            if (order.status === "OPEN") {
              return (
                <OrderCard
                  key={ind}
                  orderId={order.id}
                  products={order.products}
                  totalAmount={order.totalAmount}
                  draggable={true}
                  onDragStart={() => handleDragStart(order.id)}
                />
              );
            }
          })}
        </div>
      </div>
      {/* INPROGRESS */}
      <div className="w-1/3 border-r border-l border-gray-600 overflow-y-auto">
        <h3 className="text-center font-medium text-lg">INPROGRESS</h3>
        <div
          onDrop={() => changeStatus("INPROGRESS")}
          onDragOver={(e) => e.preventDefault()}
          className="px-3 min-h-[200px]"
        >
          {/* INPROGRESS orders in here */}

          {items.map((order, ind) => {
            if (order.status === "INPROGRESS") {
              return (
                <OrderCard
                  key={ind}
                  orderId={order.id}
                  products={order.products}
                  totalAmount={order.totalAmount}
                  draggable={true}
                  onDragStart={() => handleDragStart(order.id)}
                />
              );
            }
          })}
        </div>
      </div>
      {/* CLOSE */}
      <div className="w-1/3 overflow-auto">
        <h3 className="text-center font-medium text-lg">CLOSE</h3>
        <div
          onDrop={() => changeStatus("CLOSE")}
          onDragOver={(e) => e.preventDefault()}
          className="px-3 min-h-[200px]"
        >
          {/* CLOSE orders in here */}
          {items.map((order, ind) => {
            if (order.status === "CLOSE") {
              return (
                <OrderCard
                  key={ind}
                  orderId={order.id}
                  products={order.products}
                  totalAmount={order.totalAmount}
                  draggable={true}
                  onDragStart={() => handleDragStart(order.id)}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
