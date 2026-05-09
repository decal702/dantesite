import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BUDGET_LABELS: Record<string, string> = {
  "under-500": "Under $500",
  "500-1000": "$500 – $1,000",
  "1000-2500": "$1,000 – $2,500",
  "over-2500": "$2,500+",
  open: "Open / not sure yet",
};

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const honeypot = String(body.website ?? "");
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const organizationName = String(body.organizationName ?? "").trim();
  const contactName = String(body.contactName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const groupSize = String(body.groupSize ?? "").trim();
  const ageRange = String(body.ageRange ?? "").trim();
  const preferredDates = String(body.preferredDates ?? "").trim();
  const budgetRange = String(body.budgetRange ?? "").trim();
  const message = String(body.message ?? "").trim();
  const lang: Lang = body.lang === "fr" ? "fr" : "en";

  if (
    !organizationName ||
    !contactName ||
    !email ||
    !groupSize ||
    !ageRange
  ) {
    return NextResponse.json(
      { error: "Required fields missing." },
      { status: 400 }
    );
  }

  if (
    organizationName.length > 200 ||
    contactName.length > 200 ||
    email.length > 200 ||
    phone.length > 50 ||
    groupSize.length > 80 ||
    ageRange.length > 80 ||
    preferredDates.length > 200 ||
    budgetRange.length > 50 ||
    message.length > 5000
  ) {
    return NextResponse.json({ error: "Field too long." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const recipient = content.contact.recipientEmail;

  const budgetLabel = budgetRange
    ? BUDGET_LABELS[budgetRange] || budgetRange
    : "Not specified";

  try {
    const result = await resend.emails.send({
      from: `Graffiti 101 <${fromEmail}>`,
      to: recipient,
      replyTo: email,
      subject: `[Quote Request] ${organizationName} — group of ${groupSize}`,
      text:
        `New quote request from the Graffiti 101 site (${lang.toUpperCase()})\n\n` +
        `Organization: ${organizationName}\n` +
        `Contact: ${contactName} <${email}>\n` +
        (phone ? `Phone: ${phone}\n` : "") +
        `Group size: ${groupSize}\n` +
        `Age range: ${ageRange}\n` +
        (preferredDates ? `Preferred dates: ${preferredDates}\n` : "") +
        `Budget: ${budgetLabel}\n` +
        (message ? `\nMessage:\n${message}\n` : ""),
    });
    if (result.error) {
      return NextResponse.json(
        { error: result.error.message || "Failed to send" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send" },
      { status: 502 }
    );
  }
}
