// Publication-status integrity: an under-review or in-progress entry must
// never be rendered as published, and must never show a DOI or citation
// controls. (The content schema blocks most mistakes; this guards the pages.)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, assertBuilt } from './helpers.mjs';

assertBuilt();

const SOURCE = 'src/content/research';
const entries = readdirSync(SOURCE)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .map((f) => {
    const front = readFileSync(join(SOURCE, f), 'utf8').split('---')[1] ?? '';
    return { id: f.replace(/\.md$/, ''), status: front.match(/^status:\s*([\w-]+)/m)?.[1] };
  });

/** The detail page's header (before the main content). */
function header(id) {
  const html = readFileSync(join(DIST, 'research', id, 'index.html'), 'utf8');
  const start = html.indexOf('class="detail-header');
  const end = html.indexOf('</header>', start);
  return { html, head: html.slice(start, end) };
}

for (const { id, status } of entries) {
  test(`research/${id}: rendered as "${status}"`, () => {
    const { html, head } = header(id);
    const badges = [...head.matchAll(/status--([\w-]+)/g)].map((m) => m[1]);
    assert.deepEqual([...new Set(badges)], [status], 'header status badge');

    if (status !== 'published') {
      assert.ok(!/doi\.org\//.test(html), 'unpublished work must not link a DOI');
      assert.ok(!/Copy citation|BibTeX/.test(html), 'unpublished work must not offer citations');
    }
    if (status === 'under-review') {
      assert.ok(/has not been\s+accepted/.test(html), 'under-review pages must say the work is not accepted');
    }
  });
}

test('research list groups each entry under its own status', () => {
  const html = readFileSync(join(DIST, 'research', 'index.html'), 'utf8');
  for (const { id, status } of entries) {
    const item = html.match(new RegExp(`<li[^>]*data-status="([\\w-]+)"[^>]*>(?:(?!</li>)[\\s\\S])*?/research/${id}/`));
    assert.ok(item, `research/${id} missing from the list`);
    assert.equal(item[1], status, `research/${id} filed under the wrong status`);
  }
});
