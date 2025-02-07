import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { isISTTime } from "./service";
import { sendReminderEmail } from "@/utils/resend";
import { sendWhatsAppMessage } from "@/utils/twilio";
import { getMessageContent } from "@/utils/utilities";

export async function GET() {
  try {
    let body;
    // 1. Check scheduled times (11 AM and 7 PM IST)
    if (isISTTime(11) || isISTTime(19)) {
      body = getMessageContent("scheduled");
      await sendWhatsAppMessage(body);
    }

    // 2. Check moisture status rechecks
    const latestMoistLog = await prisma.wateringLog.findFirst({
      where: {
        status: "Moist soil: Recheck in 3 hours",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (latestMoistLog) {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
      if (latestMoistLog.createdAt < threeHoursAgo) {
        // await sendReminderEmail("moist-check");
        body = getMessageContent("moist-check");
        await sendWhatsAppMessage(body);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
