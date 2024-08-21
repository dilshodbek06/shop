import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imagesUrl, title, description, isPublished, price, categoryId } =
      await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await prisma.product.create({
      data: {
        description,
        title,
        imagesUrl,
        isPublished,
        price,
        categoryId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[CREATE_PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
