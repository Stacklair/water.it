import prisma from "@/prisma/client";
import { sendReminderEmail } from "@/utils/resend";
import { NextRequest, NextResponse } from "next/server";
import { getNextEventTime } from "@/utils/utilities";
import { sendWhatsAppMessage } from "@/utils/twilio";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const email = req.headers.get("x-email");
    if (!email) {
      throw new Error("Session expired!");
    }

    const { status } = await req.json();

    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
      },
      where: {
        email: email,
      },
    });

    const log = await prisma.wateringLog.create({
      data: {
        userId: user?.id as string,
        status: status as string,
      },
    });

    if (log) {
      const body = `Your roses were just watered by ${
        user?.name
      }, next watering check will be at: ${getNextEventTime()}.`;
      // await sendReminderEmail("watered", body);

      await sendWhatsAppMessage(body);
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
