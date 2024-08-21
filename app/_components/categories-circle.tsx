import prisma from "@/lib/db";
import CategoryCircleItem from "./category-circle-item";

const CategoriesCircle = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  return (
    <div className="container px-3 sm:px-8 max-w-6xl">
      <h1 className="font-bold text-3xl">
        <span className="text-sky-600">Top</span> Categories
      </h1>

      <section className="light mt-5 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-12 text-center gap-6 ">
            {categories.map((category, ind) => (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-3"
                key={ind}
              >
                <CategoryCircleItem
                  key={ind}
                  imageUrl={category.imageUrl}
                  title={category.title}
                  products={category.products}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesCircle;
