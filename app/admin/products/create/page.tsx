import ProductsForm from "./_components/products-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/db";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "Products", link: "/admin/products" },
  { title: "Create", link: "/admin/products/create" },
];

const ProductCreatePage = async () => {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-5">
          <Breadcrumbs items={breadcrumbItems} />
          <ProductsForm
            initialData={{
              title: "",
              description: "",
              imagesUrl: [],
              isPublished: false,
              price: 0,
              categoryId: "",
            }}
            isEdit={false}
            categories={categories}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductCreatePage;
