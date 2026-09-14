import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlaybookServer } from '../server.mjs';

async function withServer(run) {
  const server = createPlaybookServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try { await run(`http://127.0.0.1:${port}`); }
  finally { await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
}

test('serves the demo and health endpoint', async () => {
  await withServer(async (baseUrl) => {
    const [page, health] = await Promise.all([fetch(baseUrl), fetch(`${baseUrl}/health`)]);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /Playbook Platform/);
    assert.deepEqual(await health.json(), { status: 'ok', mode: 'demo' });
  });
});

test('does not serve files outside the demo root', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/../../etc/passwd`);
    assert.notEqual(response.status, 200);
  });
});
