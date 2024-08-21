import { Product } from "@prisma/client";
import Image from "next/image";

interface CategoryCircleItemProps {
  imageUrl: string;
  title: string;
  products: Product[];
}

const CategoryCircleItem = ({
  imageUrl,
  products,
  title,
}: CategoryCircleItemProps) => {
  return (
    <div className="rounded-xl max-h-64 shadow-md bg-white dark:bg-slate-800 border dark:border-none p-7 pb-4">
      <div className="h-32 w-auto rounded-xl flex justify-center items-center">
        <Image
          src={imageUrl}
          alt="..."
          className="max-h-full max-w-full w-auto"
          width={150}
          height={200}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold leading-none mt-2">{title}</h2>
        <h5 className="text-gray-500">
          {products.length} {products.length === 1 ? "product" : "products"}
        </h5>
      </div>
    </div>
  );
};

export default CategoryCircleItem;
