import { Breadcrumbs } from "@/components/breadcrumbs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import prisma from "@/lib/db";
import OrderList from "./_components/order-list";
import { CircleAlert } from "lucide-react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "Orders", link: "/admin/orders" },
];

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4  p-2 py-3 md:p-8">
        <div className="flex justify-between items-center">
          <Breadcrumbs items={breadcrumbItems} />
          <div className=" flex items-center relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="absolute left-[2px] top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-blue-300 opacity-75"></span>
                  <CircleAlert className="w-5 h-5 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Drag and drop element to change its status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="mt-2 overflow-x-auto">
          <OrderList items={orders} />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
