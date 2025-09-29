import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  const msg = {
    to: email,
    from: "nexrates@gmail.com", // must be verified in SendGrid
    subject: "Verify your NexRate account",
    html: `
      <h2>Welcome to NexRate 🚀</h2>
      <p>Please confirm your email to activate your account:</p>
      <a href="${verifyUrl}" style="display:inline-block;padding:10px 20px;background:#06b6d4;color:#fff;border-radius:6px;text-decoration:none;">Verify Account</a>
      <p>If you didn’t create this account, please ignore this email.</p>
    `,
  };

  await sgMail.send(msg);
}
