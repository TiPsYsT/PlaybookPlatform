import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

function safeFilePath(url = '/') {
  const pathname = decodeURIComponent(url.split('?')[0]);
  const requestedPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = normalize(join(root, requestedPath));

  if (relative(root, filePath).startsWith('..')) return null;
  return filePath;
}

export function createPlaybookServer() {
  return createServer(async (req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ status: 'ok', mode: 'demo' }));
      return;
    }

    const filePath = safeFilePath(req.url);
    if (!filePath) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    try {
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  });
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const port = Number(process.env.PORT || 4173);
  const host = process.env.HOST || '127.0.0.1';
  createPlaybookServer().listen(port, host, () => {
    console.log(`Playbook Platform demo is running at http://${host}:${port}`);
    console.log('Open that address in your browser. Press Ctrl+C to stop the server.');
  });
}
