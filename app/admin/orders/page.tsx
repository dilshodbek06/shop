import { Breadcrumbs } from "@/components/breadcrumbs";
import prisma from "@/lib/db";
import OrderList from "./_components/order-list";

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
      <div className="flex-1 space-y-4  p-4 md:p-8">
        <div className="flex justify-between items-center">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="mt-2">
          <OrderList items={orders} />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
