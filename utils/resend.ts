import prisma from "@/prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// Helper function to send emails
export async function sendReminderEmail(
  type: "scheduled" | "moist-check" | "watered",
  body?: string
) {
  const users = await prisma.user.findMany();
  const emails = users.map((user) => user.email);

  const subject =
    type === "scheduled"
      ? "🌹 Time for regular plant check!"
      : type === "moist-check"
      ? "⚠️ Moist soil recheck needed!"
      : type === "watered"
      ? "🌹 Roses just got watered! ☺️"
      : " ";

  const html =
    type === "scheduled"
      ? "<p>Please check the plant moisture and water if needed!</p>"
      : type === "moist-check"
      ? "<p>3 hours have passed since last moisture check. Please recheck soil status!</p>"
      : `${body}`;

  await resend.emails.send({
    from: "udshar5995@gmail.com",
    to: emails,
    subject,
    html,
  });
}
