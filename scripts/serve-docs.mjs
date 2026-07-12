import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const types = {".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".png":"image/png", ".ico":"image/x-icon", ".svg":"image/svg+xml"};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let file = normalize(join(root, pathname));
  if (!file.startsWith(normalize(root))) { response.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { response.writeHead(404).end("Not found"); return; }
  response.writeHead(200, {"Content-Type": types[extname(file)] ?? "application/octet-stream"});
  createReadStream(file).pipe(response);
}).listen(4173, "127.0.0.1", () => console.log("Serving docs at http://127.0.0.1:4173/"));
