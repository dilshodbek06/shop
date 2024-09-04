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
    <div className="min-h-[27rem] w-full overflow-x-auto flex shadow-md border border-gray-300 rounded-sm">
      {/* OPEN */}
      <div className="overflow-y-auto min-w-[200px] w-full max-w-sm">
        <h3 className="text-center font-medium text-lg">OPEN</h3>
        <div
          onDrop={() => changeStatus("OPEN")}
          onDragOver={(e) => e.preventDefault()}
          className="px-2 md:px-3 min-h-[200px] flex flex-col gap-2"
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
      <div className="min-w-[200px] max-w-sm w-full border-r border-l border-gray-300 overflow-y-auto">
        <h3 className="text-center font-medium text-lg">INPROGRESS</h3>
        <div
          onDrop={() => changeStatus("INPROGRESS")}
          onDragOver={(e) => e.preventDefault()}
          className="px-2 min-h-[200px]"
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
      <div className="min-w-[200px] max-w-sm w-full overflow-y-auto">
        <h3 className="text-center font-medium text-lg">CLOSE</h3>
        <div
          onDrop={() => changeStatus("CLOSE")}
          onDragOver={(e) => e.preventDefault()}
          className="px-2 min-h-[200px]"
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
