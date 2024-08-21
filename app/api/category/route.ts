import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageUrl, title, description, isPublished } = await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await prisma.category.create({
      data: {
        description,
        title,
        imageUrl,
        isPublished,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CREATE_CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.json({});
  } catch (error) {
    console.log("[CREATE_CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
