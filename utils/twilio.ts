// utils/twilioClient.ts

import twilio from "twilio";
import { phoneNumbers } from "@/cache";

const accountSid = process.env.TWILIO_ACCOUNT_SID || "your_account_sid";
const authToken = process.env.TWILIO_AUTH_TOKEN || "your_auth_token";
const whatsappNumber =
  process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886"; // Default Twilio sandbox number

const client = twilio(accountSid, authToken);

/**
 * Send a WhatsApp message using Twilio
 * @param to - Recipient's WhatsApp number in the format 'whatsapp:+1234567890'
 * @param message - The message to send
 */
export const sendWhatsAppMessage = async (message: string, to?: string) => {
  try {
    let response;
    if (to) {
      response = await client.messages.create({
        from: whatsappNumber, // Your Twilio WhatsApp number
        to: `whatsapp:${to}`, // Ensure it's prefixed with 'whatsapp:'
        body: message,
      });
    } else {
      phoneNumbers.map(async (n) => {
        response = await client.messages.create({
          from: whatsappNumber, // Your Twilio WhatsApp number
          to: `whatsapp:${n.phoneNumber}`, // Ensure it's prefixed with 'whatsapp:'
          body: message,
        });
      });
    }

    console.log("Message sent successfully:", response?.sid);
    return response;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
};
