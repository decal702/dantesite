import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { safeEqual } from "@/lib/secure-compare";

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const username = String(body.username || "");
  const password = String(body.password || "");

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return NextResponse.json(
      { error: "Server is missing ADMIN_USERNAME or ADMIN_PASSWORD" },
      { status: 500 }
    );
  }

  const userOk = safeEqual(username, expectedUser);
  const passOk = safeEqual(password, expectedPass);

  if (!userOk || !passOk) {
    await new Promise((r) => setTimeout(r, 250));
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = await getAdminSession();
  session.isAdmin = true;
  session.username = username;
  await session.save();

  return NextResponse.json({ ok: true });
}
