import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const errors = [];
const indexableDescriptions = new Map();
let checked = 0;
let skipped = 0;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return match?.[2]?.trim() ?? "";
}

for (const file of walk(docs).filter((item) => item.toLowerCase().endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const name = relative(docs, file).replaceAll("\\", "/");

  if (!/<html\b/i.test(html) || !/<head\b/i.test(html)) {
    skipped += 1;
    continue;
  }

  checked += 1;
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const descriptions = metaTags.filter((tag) => attribute(tag, "name").toLowerCase() === "description");

  if (descriptions.length !== 1) {
    errors.push(`${name}: expected exactly one meta description, found ${descriptions.length}`);
    continue;
  }

  const tag = descriptions[0];
  const description = attribute(tag, "content").replace(/\s+/g, " ").trim();
  if (!description) errors.push(`${name}: meta description is empty`);
  if (description.length < 50) errors.push(`${name}: meta description is too short (${description.length} characters)`);
  if (description.length > 320) errors.push(`${name}: meta description is too long (${description.length} characters)`);
  if (!/^<meta\s+name=["']description["']\s+content=["']/i.test(tag)) {
    errors.push(`${name}: meta description attributes are not in conventional name/content order`);
  }

  const robots = metaTags
    .filter((meta) => attribute(meta, "name").toLowerCase() === "robots")
    .map((meta) => attribute(meta, "content").toLowerCase());
  const noindex = robots.some((value) => value.includes("noindex"));

  if (!noindex && description) {
    const key = description.toLowerCase();
    const previous = indexableDescriptions.get(key);
    if (previous) errors.push(`${name}: duplicate indexable meta description also used by ${previous}`);
    else indexableDescriptions.set(key, name);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Checked ${checked} HTML pages: every page has one non-empty, conventionally formatted meta description. Skipped ${skipped} verification files.`);
