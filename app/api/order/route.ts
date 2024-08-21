import prisma from "@/lib/db";
import { Product } from "@/store/cartStore";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { totalAmount, products } = await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let customData = products.map((pro: Product) => ({
      productId: pro.id,
      quantity: pro.quantity,
      price: pro.price,
    }));

    const order = await prisma.order.create({
      data: {
        status: "OPEN",
        totalAmount,
        userId,
        products: {
          create: customData,
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[CREATE_ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[GET_ORDERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
