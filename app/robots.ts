import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Search + AI crawlers we explicitly invite.
// Most LLM crawlers respect robots.txt; allowing them increases the chance our
// content shows up in ChatGPT, Claude, Gemini, Perplexity, etc.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
  "CCBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Diffbot",
  "DuckAssistBot",
  "MistralAI-User",
];

const PRIVATE = ["/admin", "/admin/", "/api/admin", "/api/admin/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE,
      },
      ...AI_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: PRIVATE,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
