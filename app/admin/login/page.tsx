import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login",
};

export default async function LoginPage() {
  const session = await getAdminSession();
  if (session.isAdmin) redirect("/admin");

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-heading text-4xl tracking-tight">Admin login</h1>
        <p className="mt-2 text-sm text-brand-black/70">
          Sign in to edit Graffiti 101 site content.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
