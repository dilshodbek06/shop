import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { OrderProduct, Product } from "@prisma/client";

interface OrderCardProps {
  orderId: string;
  userId?: string;
  totalAmount: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  products: (OrderProduct & { product: Product })[]; // Adjusted type to match the structure
  draggable?: boolean;
  onDragStart?: (orderId: string) => void;
}

const OrderCard = ({
  orderId,
  products,
  totalAmount,
  draggable,
  onDragStart,
}: OrderCardProps) => {
  return (
    <Card
      className="w-auto shadow-md"
      draggable={draggable}
      onDragStart={onDragStart ? () => onDragStart(orderId) : undefined}
    >
      <CardHeader>
        <CardTitle>{orderId.substring(0, 6)}</CardTitle>
        <CardDescription>Andrew Curin</CardDescription>
      </CardHeader>
      <CardContent className="border border-gray-100 mx-2 rounded-md pt-1">
        {products.map((product, ind) => (
          <div className="flex justify-between items-center" key={ind}>
            <p className="font-medium">{product.product.title}</p>
            <p className="text-sky-600">{product.quantity}x</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <h1 className="text-xl font-bold mt-2">
          Total:
          <span className="text-sky-600 font-medium ml-2">
            {totalAmount} UZS
          </span>
        </h1>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
