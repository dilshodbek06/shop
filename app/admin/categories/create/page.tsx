import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoriesForm from "./_components/categories-form";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "Categories", link: "/admin/categories" },
  { title: "Create", link: "/admin/categories/create" },
];

const CategoryCreatePage = () => {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoriesForm
          initialData={{
            title: "",
            description: "",
            imageUrl: "",
            isPublished: false,
          }}
          isEdit={false}
        />
      </div>
    </ScrollArea>
  );
};

export default CategoryCreatePage;
