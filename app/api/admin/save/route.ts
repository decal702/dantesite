import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { commitContentJson } from "@/lib/github";

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { section?: unknown; content?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const section =
    typeof body.section === "string" && body.section.length > 0
      ? body.section
      : "site";
  if (
    !body.content ||
    typeof body.content !== "object" ||
    Array.isArray(body.content)
  ) {
    return NextResponse.json(
      { error: "Missing or invalid content payload" },
      { status: 400 }
    );
  }

  const json = JSON.stringify(body.content, null, 2) + "\n";
  const message = `Admin update: ${section} — ${new Date().toISOString()}`;

  try {
    await commitContentJson(json, message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Commit failed" },
      { status: 500 }
    );
  }
}
