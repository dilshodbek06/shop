import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ProductIdPage = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const singleProduct = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
  if (!singleProduct) {
    return redirect("/admin/products");
  }

  return (
    <>
      <div className="p-4">
        <Button variant="outline" asChild>
          <Link href={`/admin/products`}>
            <ArrowLeft />
          </Link>
        </Button>
      </div>
      <div className="flex justify-center items-center space-y-4">
        <Card className=" max-w-[300px] sm:max-w-[350px] shadow-lg">
          <CardHeader className="p-2 border-b">
            <Carousel>
              <CarouselContent>
                {singleProduct.imagesUrl.map((url, ind) => (
                  <CarouselItem key={ind}>
                    <Image
                      alt="image"
                      src={url}
                      width={300}
                      height={300}
                      className="object-cover w-full rounded-t-lg max-h-[250px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:-left-12"/>
              <CarouselNext className="right-2 sm:-right-12"/>
            </Carousel>
          </CardHeader>
          <CardContent className="px-4 mt-2">
            <h2 className="font-medium text-xl">{singleProduct.title}</h2>
            <h3 className="font-medium text-gray-600">
              {singleProduct.description}
            </h3>
            <p className="font-medium text-sm text-sky-500 mt-2">
              {singleProduct.price} UZS
            </p>
          </CardContent>
          <CardFooter className="flex justify-between mt-[-5px]">
            <Badge
              className={cn(
                "bg-red-500 hover:bg-red-600",
                singleProduct.isPublished && "bg-green-500 hover:bg-green-600"
              )}
            >
              {singleProduct.isPublished ? "Published" : "Draft"}
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ProductIdPage;
