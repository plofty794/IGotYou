import Users from "../models/Users";
import { addDays } from "date-fns";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function subscriptionEndsInFiveDays(
  transport: Transporter<SMTPTransport.SentMessageInfo>
) {
  try {
    const fiveDaysFromNow = addDays(new Date().setHours(0, 0, 0, 0), 5);

    const subscriptionEndsInFiveDays = await Users.find({
      subscriptionExpiresAt: {
        $lte: fiveDaysFromNow,
      },
    }).select("username email");

    if (!subscriptionEndsInFiveDays.length) return;

    await Promise.all(
      subscriptionEndsInFiveDays.map(async (user) => {
        await transport.sendMail({
          to: user.email,
          subject: "Subscription Status Update",
          html: "<p>Patapos na ang subscription mo!</p><p>Subscribe ka ulit sa IGotYou Hosting!</p>",
        });
      })
    );
  } catch (error) {
    console.error(error);
  }
}
