import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import { content } from "@/lib/content";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session.isAdmin) redirect("/admin/login");

  return <AdminDashboard initial={content} username={session.username || ""} />;
}
