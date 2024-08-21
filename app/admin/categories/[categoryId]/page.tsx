import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CategoryIdPage = async ({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) => {
  const singleCategory = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });
  if (!singleCategory) {
    return redirect("/admin/categories");
  }

  return (
    <>
      <div className="p-4">
        <Button variant="outline" asChild>
          <Link href={`/admin/categories`}>
            <ArrowLeft />
          </Link>
        </Button>
      </div>
      <div className="flex justify-center items-center space-y-4">
        <Card className="max-w-[350px] shadow-lg">
          <CardHeader className="p-2">
            <Image
              alt={singleCategory.title}
              src={singleCategory.imageUrl}
              width={300}
              height={300}
              className="object-cover rounded-t-lg max-h-[250px]"
            />
          </CardHeader>
          <CardContent className="px-4 mt-1">
            <h2 className="font-medium text-xl">{singleCategory.title}</h2>
            <h3 className="font-medium text-gray-600">
              {singleCategory.description}
            </h3>
          </CardContent>
          <CardFooter className="flex justify-between mt-[-5px]">
            <Badge
              className={cn(
                "bg-red-500 hover:bg-red-600",
                singleCategory.isPublished && "bg-green-500 hover:bg-green-600"
              )}
            >
              {singleCategory.isPublished ? "Published" : "Draft"}
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CategoryIdPage;
