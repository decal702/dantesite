import "server-only";
import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

export type AdminSession = {
  isAdmin?: boolean;
  username?: string;
};

function getSessionOptions(): SessionOptions {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error(
      "SESSION_SECRET env var is missing or too short (must be 32+ chars)."
    );
  }
  return {
    password,
    cookieName: "g101_admin",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  };
}

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), getSessionOptions());
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return session;
}
