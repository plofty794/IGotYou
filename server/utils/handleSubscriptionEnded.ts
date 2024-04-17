import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function handleSubscriptionEnded(
  transport: Transporter<SMTPTransport.SentMessageInfo>
) {
  try {
  } catch (error) {
    console.error(error);
  }
}
