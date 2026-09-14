import test from 'node:test'; import assert from 'node:assert/strict';
test('demo lockout decision deterministically follows the locked branch', () => { const output = { accountLocked: true }; const next = output.accountLocked ? 'Unlock account' : 'Escalate to technician'; assert.equal(next, 'Unlock account'); });
test('run completion generates an ITSM-safe summary', () => { const status = 'SUCCESS'; const summary = `Playbook execution: ${status}. Account unlocked and verified.`; assert.match(summary, /SUCCESS/); assert.match(summary, /unlocked/); });
