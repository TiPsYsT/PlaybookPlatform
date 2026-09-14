import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = process.cwd();
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
createServer(async (req, res) => {
  const path = normalize(join(root, req.url === '/' ? 'index.html' : req.url)).replace(root, '');
  try { const body = await readFile(join(root, path)); res.writeHead(200, {'Content-Type': types[extname(path)] || 'text/plain'}); res.end(body); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(process.env.PORT || 4173, () => console.log('Playbook Platform running on http://localhost:4173'));
