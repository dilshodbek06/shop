import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { status } = await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const result = await prisma.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[UPDATE_ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
