import "server-only";

const API_BASE = "https://api.github.com";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function authHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${requireEnv("GITHUB_TOKEN")}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

type FileMeta = { sha: string };

async function getFileSha(
  owner: string,
  repo: string,
  path: string,
  branch: string
): Promise<string | null> {
  const url = `${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(
    path
  )}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: authHeaders(), cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub get-file failed (${res.status}): ${text}`);
  }
  const data: FileMeta = await res.json();
  return data.sha;
}

export async function commitContentJson(
  jsonString: string,
  message: string
): Promise<void> {
  const owner = requireEnv("GITHUB_REPO_OWNER");
  const repo = requireEnv("GITHUB_REPO_NAME");
  const branch = process.env.GITHUB_BRANCH || "main";
  const path = "data/content.json";

  const sha = await getFileSha(owner, repo, path, branch);
  const url = `${API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
  const body = {
    message,
    branch,
    content: Buffer.from(jsonString, "utf-8").toString("base64"),
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub commit failed (${res.status}): ${text}`);
  }
}
