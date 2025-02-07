import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.headers.get("x-email");
    if (!email) {
      throw new Error("Session expired!");
    }

    const latestWateringLog = await prisma.wateringLog.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ latestWateringLog });
  } catch (error: any) {
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
