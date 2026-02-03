import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOtpEmail({ to, link }: { to: string; link: string }) {
  return await resend.emails.send({
    from: "Vanguox <no-reply@vanguox.com>",
    to,
    subject: "Email Verification",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Click the link below to verify your email address</h2>
        <div style="font-size: 24px; font-weight: bold; background: #f1f5f9; padding: 12px 20px; display: inline-block; border-radius: 8px; margin: 16px 0;">
          ${link}
        </div>
        
        <p style="font-size: 12px; color: #888;">If you didn't request this, you can safely ignore this email.</p>
        <p style="font-size: 12px; color: #888;">- Vanguox Team</p>
      </div>
    `,
  });
}
