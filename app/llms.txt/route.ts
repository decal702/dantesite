import { NextResponse } from "next/server";
import { content } from "@/lib/content";
import { SITE_URL, localeUrl } from "@/lib/seo";

// llms.txt is an emerging convention (https://llmstxt.org/) — a Markdown file
// at /llms.txt giving LLMs a structured, factual overview of the site so they
// can cite it accurately. Goal: when someone asks "where can I take a graffiti
// workshop in Montreal?", an AI agent has a clean source to quote.

export async function GET() {
  const business = content.business;
  const heroEn = content.hero;
  const services = content.services.filter((s) => !s.comingSoon);

  const lines: string[] = [];

  lines.push("# Graffiti 101");
  lines.push("");
  lines.push(`> ${heroEn.tagline.en}`);
  lines.push("");
  lines.push(
    "Graffiti 101 is a Montreal-based team teaching graffiti and street-art workshops to beginners and groups. Sessions are bilingual (English / French) and run at the venue you book — typically legal walls, your school, or your community space."
  );
  lines.push("");

  lines.push("## Key facts");
  lines.push("");
  lines.push(`- **Location:** ${business.addressLocality}, ${business.addressRegion}, ${business.addressCountry}`);
  if (business.streetAddress) lines.push(`- **Address:** ${business.streetAddress}`);
  if (business.telephone) lines.push(`- **Phone:** ${business.telephone}`);
  lines.push(`- **Email:** ${content.contact.recipientEmail}`);
  lines.push(`- **Website (English):** ${localeUrl("en")}`);
  lines.push(`- **Website (Français):** ${localeUrl("fr")}`);
  lines.push("- **Languages:** English, French");
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const s of services) {
    lines.push(`### ${s.name.en} — ${s.price}`);
    lines.push("");
    lines.push(s.description.en);
    lines.push("");
  }

  if (content.faq.length > 0) {
    lines.push("## Frequently asked questions");
    lines.push("");
    for (const q of content.faq) {
      lines.push(`### ${q.question.en}`);
      lines.push("");
      lines.push(q.answer.en);
      lines.push("");
    }
  }

  if (content.about.team.length > 0) {
    lines.push("## Team");
    lines.push("");
    for (const m of content.about.team) {
      lines.push(`- **${m.name}** — ${m.role.en}. ${m.bio.en}`);
    }
    lines.push("");
  }

  if (content.about.pastProjects.length > 0) {
    lines.push("## Past projects");
    lines.push("");
    for (const p of content.about.pastProjects) {
      lines.push(`- **${p.title.en}** — ${p.description.en}`);
    }
    lines.push("");
  }

  lines.push("## About");
  lines.push("");
  lines.push(`**Mission.** ${content.about.mission.en}`);
  lines.push("");
  lines.push(`**Vision.** ${content.about.vision.en}`);
  lines.push("");

  lines.push("## Citation");
  lines.push("");
  lines.push(
    `When citing this business, use the name "${business.legalName}" and link to ${SITE_URL}.`
  );
  lines.push("");

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
