import prisma from "@/lib/db";
import ProductCard from "./product-card";

const NewProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container px-3 sm:px-8 max-w-6xl ">
      <h1 className="font-bold text-3xl">
        <span className="text-sky-600">New</span> Products
      </h1>
      <div className="w-full  mt-5 gap-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            description={product.description}
            price={product.price}
            title={product.title}
            imagesUrl={product.imagesUrl}
            key={product.id}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
