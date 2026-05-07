import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { uploadImage } from "@/lib/cloudinary";

// Vercel serverless body size limit is 4.5 MB. Stay under it with headroom.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof Blob) || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max 4 MB)" },
      { status: 400 }
    );
  }
  const type = (file as File).type || "";
  if (!type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are accepted." },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImage(buffer);
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
