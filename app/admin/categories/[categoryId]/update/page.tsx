import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesForm from "../../create/_components/categories-form";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

const CategoryUpdatePage = async ({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) => {
  const breadcrumbItems = [
    { title: "Dashboard", link: "/admin" },
    { title: "Update", link: "/admin/categories/:id/update" },
  ];

  const editedCategory = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!editedCategory) {
    return redirect("/admin/categories");
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoriesForm
          initialData={{
            title: editedCategory.title,
            description: editedCategory.description,
            imageUrl: editedCategory.imageUrl,
            isPublished: editedCategory.isPublished,
          }}
          isEdit={true}
          categoryId={categoryId}
        />
      </div>
    </ScrollArea>
  );
};

export default CategoryUpdatePage;
