import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { content } from "@/lib/content";
import type { Lang } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const honeypot = String(body.website ?? "");
  if (honeypot) {
    // Bot: pretend success without sending.
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const lang: Lang = body.lang === "fr" ? "fr" : "en";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }
  if (
    name.length > 200 ||
    email.length > 200 ||
    subject.length > 300 ||
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

  try {
    const result = await resend.emails.send({
      from: `Graffiti 101 <${fromEmail}>`,
      to: recipient,
      replyTo: email,
      subject: `[Graffiti 101] ${subject}`,
      text:
        `New message from the Graffiti 101 site (${lang.toUpperCase()})\n\n` +
        `From: ${name} <${email}>\n` +
        `Subject: ${subject}\n\n` +
        `${message}\n`,
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
