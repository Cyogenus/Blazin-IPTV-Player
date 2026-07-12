import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const campaignUrl = "https://apps.microsoft.com/detail/9NQ5S0FFCN8T?cid=Blazin_website";
const baseUrl = campaignUrl.split("?")[0];
const allowedExtensions = new Set([".html", ".md", ".mjs", ".js", ".json", ".xml", ".txt"]);
const ignoredDirectories = new Set([".git", "node_modules"]);
const storePattern = /https:\/\/apps\.microsoft\.com\/detail\/9nq5s0ffcn8t[^\s"'<>)]*/gi;
const anyStorePattern = /https:\/\/apps\.microsoft\.com[^\s"'<>)]*/gi;
const listOnly = process.argv.includes("--list");
const checkOnly = process.argv.includes("--check") || listOnly;
const changed = [];
const errors = [];

function filesIn(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    if (ignoredDirectories.has(entry)) continue;
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) files.push(...filesIn(path));
    else if (allowedExtensions.has(extname(path).toLowerCase())) files.push(path);
  }
  return files;
}

function normalizeStoreUrl(value) {
  const encodedAmpersands = value.includes("&amp;");
  const queryIndex = value.indexOf("?");
  if (queryIndex < 0) return campaignUrl;

  const rawQuery = value.slice(queryIndex + 1).replaceAll("&amp;", "&").replaceAll("?", "&");
  const parameters = rawQuery.split("&").filter(Boolean).filter((part) => part.split("=", 1)[0].toLowerCase() !== "cid");
  parameters.push("cid=Blazin_website");
  const separator = encodedAmpersands ? "&amp;" : "&";
  return `${baseUrl}?${parameters.join(separator)}`;
}

for (const file of filesIn(root)) {
  const original = readFileSync(file, "utf8");
  const updated = original.replace(storePattern, normalizeStoreUrl);
  if (updated !== original) {
    changed.push(relative(root, file));
    if (!checkOnly) writeFileSync(file, updated, "utf8");
  }
}

for (const file of filesIn(root)) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(anyStorePattern)) {
    const decoded = match[0].replaceAll("&amp;", "&");
    const cidCount = [...decoded.matchAll(/(?:[?&])cid=/gi)].length;
    if (!decoded.includes("cid=Blazin_website")) errors.push(`${relative(root, file)}: missing campaign cid in ${match[0]}`);
    if (cidCount !== 1) errors.push(`${relative(root, file)}: expected one cid parameter in ${match[0]}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

if (checkOnly && changed.length) {
  console.error(`${changed.length} files require Store campaign normalization.`);
  process.exit(1);
}

if (listOnly) {
  const urls = new Set();
  for (const file of filesIn(root)) {
    const content = readFileSync(file, "utf8");
    for (const match of content.matchAll(anyStorePattern)) urls.add(match[0]);
  }
  console.log([...urls].sort().join("\n"));
} else {
  console.log(checkOnly ? "All Microsoft Store URLs contain exactly one cid=Blazin_website parameter." : `Updated Microsoft Store campaign URLs in ${changed.length} files.`);
}
