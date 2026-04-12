import nodemailer from "nodemailer";

// ── Transporter setup ─────────────────────────────────────────────────────────
// Reads credentials from .env — set these in your environment:
//   MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM
//
// For Gmail: MAIL_HOST=smtp.gmail.com  MAIL_PORT=587
//            MAIL_USER=you@gmail.com   MAIL_PASS=<App Password>
// For development/testing: leave all empty → falls back to Ethereal (auto-creates a test account)

let transporter;

const getTransporter = async () => {
  if (transporter) return transporter;

  if (process.env.MAIL_HOST && process.env.MAIL_USER && process.env.MAIL_PASS) {
    // Production / real SMTP
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: Number(process.env.MAIL_PORT) === 465, // true for port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  } else {
    // Development fallback — Ethereal fake SMTP (no real emails sent)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.warn(
      "⚠️  MAIL credentials not set. Using Ethereal test account:",
      testAccount.user
    );
  }

  return transporter;
};

// ── Generic send helper ───────────────────────────────────────────────────────
const sendMail = async ({ to, subject, html, text }) => {
  const t = await getTransporter();

  const from =
    process.env.MAIL_FROM ||
    `"JobTracker" <noreply@jobtracker.app>`;

  const info = await t.sendMail({ from, to, subject, html, text });

  // In dev, log the preview URL from Ethereal
  if (!process.env.MAIL_HOST) {
    console.log("📧 Preview email →", nodemailer.getTestMessageUrl(info));
  }

  return info;
};

// ── OTP email ─────────────────────────────────────────────────────────────────
export const sendEmailOtpMail = async ({ to, otp, subject }) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                max-width: 480px; margin: 0 auto; padding: 32px 24px;
                background: #ffffff; border-radius: 16px;">

      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 22px; font-weight: 700; color: #0f172a; margin: 0;">
          JobTracker
        </h1>
        <p style="color: #64748b; font-size: 14px; margin: 6px 0 0;">
          Email Verification
        </p>
      </div>

      <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
        You requested a change to your email address. Use the code below to verify
        your new email. This code expires in <strong>10 minutes</strong>.
      </p>

      <div style="background: #f1f5f9; border-radius: 12px; padding: 24px;
                  text-align: center; margin: 0 0 24px;">
        <p style="font-size: 13px; color: #64748b; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">
          Verification Code
        </p>
        <span style="font-size: 36px; font-weight: 800; letter-spacing: 10px;
                     color: #6366f1; font-family: 'Courier New', monospace;">
          ${otp}
        </span>
      </div>

      <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
        If you didn't request this change, you can safely ignore this email.
        Your current email address will remain unchanged.
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="color: #cbd5e1; font-size: 12px; text-align: center; margin: 0;">
        © ${new Date().getFullYear()} JobTracker — Job Application Tracker
      </p>
    </div>
  `;

  return sendMail({
    to,
    subject: subject || "Your verification code — JobTracker",
    html,
    text: `Your JobTracker email verification code is: ${otp}\n\nThis code expires in 10 minutes.`,
  });
};

// ── Welcome email (optional, call after registration) ─────────────────────────
export const sendWelcomeMail = async ({ to, name }) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border-radius: 16px;">
      <h1 style="font-size: 22px; font-weight: 700; color: #0f172a;">Welcome to JobTracker 🎉</h1>
      <p style="color: #334155; font-size: 15px; line-height: 1.6;">
        Hi ${name || "there"},<br/><br/>
        Your account is all set. Start tracking your job applications, optimizing your resume with AI, and land your next role faster.
      </p>
      <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/application/applicationspage"
         style="display: inline-block; margin-top: 16px; padding: 12px 24px;
                background: #6366f1; color: #fff; border-radius: 10px;
                text-decoration: none; font-weight: 600; font-size: 14px;">
        Go to Dashboard →
      </a>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0 16px;" />
      <p style="color: #cbd5e1; font-size: 12px; text-align: center; margin: 0;">
        © ${new Date().getFullYear()} JobTracker
      </p>
    </div>
  `;

  return sendMail({
    to,
    subject: "Welcome to JobTracker!",
    html,
    text: `Welcome to JobTracker, ${name || ""}! Start tracking your job applications at ${process.env.CLIENT_URL || "http://localhost:5173"}`,
  });
};

export default sendMail;