import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const result = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[DELETE_PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { imageUrl, title, description, isPublished } = await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const result = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        title,
        description,
        imageUrl,
        isPublished,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[UPDATE_PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const result = await prisma.product.findFirst({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[GET_SINGLE_PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
