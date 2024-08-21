import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
    console.log("[UPDATE_CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const result = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[DELETE_CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
