import "server-only";
import { cookies } from "next/headers";
import type { Lang } from "./content";
import { LANG_COOKIE } from "./i18n";

export async function getLanguage(): Promise<Lang> {
  const c = await cookies();
  const v = c.get(LANG_COOKIE)?.value;
  return v === "fr" ? "fr" : "en";
}
