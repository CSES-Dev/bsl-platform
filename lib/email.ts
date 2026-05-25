import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailArgs) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return;
  }

  if (!to) {
    console.error("Missing email recipient");
    return;
  }

  await resend.emails.send({
    from: "BSL Platform <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
}