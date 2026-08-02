import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const readSiteFile = (path) => readFile(new URL(path, root), 'utf8');
const [html, script, css, qrAsset] = await Promise.all([
  readSiteFile('index.html'),
  readSiteFile('js/app.js'),
  readSiteFile('css/style.css'),
  readFile(new URL('assets/profile-qr.png', root)).catch(() => Buffer.alloc(0)),
]);
const site = `${html}\n${script}\n${css}`;

const sectionContent = (id) => {
  const match = html.match(new RegExp(
    `<section[^>]+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/section>`,
    'i',
  ));
  assert.ok(match, `Missing section #${id}`);
  return match[1];
};
const mustIncludeIn = (content, text, label = text) =>
  assert.ok(content.includes(text), `Missing ${label} in its required section`);

test('publishes the approved professional profile hierarchy', () => {
  const hero = sectionContent('hero');
  mustIncludeIn(hero, 'Global Transformation & Technology Leader', 'professional title');

  for (const id of ['principles', 'capabilities', 'hobbies', 'education', 'connect']) {
    assert.match(html, new RegExp(`<section[^>]+id=["']${id}["']`), `Missing section #${id}`);
  }
});

test('keeps the approved leadership principles and evidence', () => {
  const hero = sectionContent('hero');
  const principles = sectionContent('principles');

  for (const slogan of [
    'Do the right thing before doing the thing right.',
    'Easier is better.',
    'Grow people. Strengthen teams. Succeed together.',
  ]) {
    mustIncludeIn(principles, slogan, 'leadership slogan');
  }

  for (const explanation of [
    'Strategy starts with the business problem, the outcome we want and how success will be measured. Execution cannot compensate for choosing the wrong priority.',
    'Turn strategy into clear ownership, practical governance and a delivery path teams can follow. Remove unnecessary complexity from customer journeys, processes and technology.',
    'Support talent development, create clarity and trust, and give people room to contribute. Sustainable transformation depends on capable people and teams succeeding together.',
  ]) {
    mustIncludeIn(principles, explanation, 'leadership-principle explanation');
  }

  for (const metric of [
    '20+ years in technology and transformation',
    '0% to 80% digital-channel adoption',
    '4.9/5 global user CSAT',
    '2x Great Line Manager Award winner',
  ]) {
    mustIncludeIn(hero, metric, 'evidence metric');
  }
});

test('uses the approved ownership wording and hero actions', () => {
  const hero = sectionContent('hero');
  const experience = sectionContent('experience');

  mustIncludeIn(
    experience,
    'Defined a global AI operating and governance model, supporting a reported 20% productivity improvement and 4.8/5 user satisfaction.',
    'approved GenAI ownership wording',
  );
  assert.ok(!experience.includes('Built a global AI operating and governance model'),
    'GenAI ownership must not be overstated as Built');
  assert.match(hero, /href=["']#experience["'][^>]*>[\s\S]*?Explore my transformation experience[\s\S]*?<\/a>/,
    'Missing approved primary hero action');
  assert.match(hero, /href=["']#hobbies["'][^>]*>[\s\S]*?Beyond work[\s\S]*?<\/a>/,
    'Missing approved secondary hero action');
});

test('keeps the approved capability labels and delivery sequence', () => {
  const capabilities = sectionContent('capabilities');
  for (const label of [
    'Strategy & Outcomes',
    'People, Process & Delivery',
    'Tools & Technology',
  ]) {
    mustIncludeIn(capabilities, label, 'capability tab label');
  }

  mustIncludeIn(
    capabilities,
    'Frame the problem → align the people → mobilise delivery → measure and adapt',
    'delivery sequence',
  );
});

test('publishes the five approved hobby stories', () => {
  const hobbies = sectionContent('hobbies');
  assert.equal(
    (hobbies.match(/class=["'][^"']*\bhobby-card\b[^"']*["']/g) ?? []).length,
    5,
    'Expected exactly five hobby cards',
  );

  for (const detail of [
    'Honor of Kings',
    'Jin Chan',
    'Impact can be quiet. Good timing, control and support create the conditions for the whole team to perform better.',
    'Manchester United',
    "Class of '92",
    'David Beckham',
    'Nicky Butt',
    'Ryan Giggs',
    'Gary Neville',
    'Phil Neville',
    'Paul Scholes',
    'three consecutive Premier League titles',
    'Lasting success grows from shared standards, trust and people who keep improving together.',
    "Ronnie O'Sullivan",
    'Ding Junhui',
    'Mastery comes from choosing the right tempo: attacking decisively when the opportunity is there, and controlling the table patiently when it is not.',
    'Tibet and Lhasa',
    'Western Sichuan',
    'Hulunbuir Grasslands and the Greater Khingan Range',
    'Resilience became something physical and immediate: lift the bike, reset and keep moving.',
    'China–Australia e-trade',
    'farm operations',
    'New technology becomes meaningful when it helps someone solve a real problem.',
  ]) {
    mustIncludeIn(hobbies, detail, 'approved hobby detail');
  }

  mustIncludeIn(hobbies, 'September 2026 — Planned', 'planned journey label');
  mustIncludeIn(
    hobbies,
    'helping a friend establish China–Australia e-trade workflows using AI agents',
    'anonymous friend e-trade example',
  );
});

test('shows a standard snooker table with all starting balls and hover values', () => {
  const hobbies = sectionContent('hobbies');
  const table = hobbies.match(
    /<div class="snooker-table"[\s\S]*?<p class="snooker-hint">/,
  )?.[0] ?? '';

  assert.match(
    table,
    /aria-label="Standard snooker table with all 22 balls in their starting positions"/,
    'Standard snooker table label is missing',
  );
  assert.equal(
    (table.match(/class="snooker-ball /g) ?? []).length,
    22,
    'Expected the standard 22-ball starting layout',
  );
  assert.equal(
    (table.match(/class="snooker-ball ball-red"/g) ?? []).length,
    15,
    'Expected all 15 reds in the starting triangle',
  );
  assert.match(table, /class="pocket pocket-mt"/, 'Top-centre pocket is missing');
  assert.match(table, /class="pocket pocket-mb"/, 'Bottom-centre pocket is missing');
  assert.doesNotMatch(
    table,
    /class="pocket pocket-m[lr]"/,
    'Centre pockets must not sit on the short ends',
  );

  for (const tooltip of [
    'Red — 1 point',
    'Yellow — 2 points',
    'Green — 3 points',
    'Brown — 4 points',
    'Blue — 5 points',
    'Pink — 6 points',
    'Black — 7 points',
  ]) {
    assert.ok(table.includes(`data-tooltip="${tooltip}"`), `Missing hover value: ${tooltip}`);
  }

  assert.doesNotMatch(
    hobbies,
    /snooker-scoreboard|pot-red-btn|pot-black-btn|reset-snooker-btn/,
    'The removed snooker game controls must not return',
  );
  assert.match(
    css,
    /\.snooker-ball:hover::after,[\s\S]*?\.snooker-ball:focus-visible::after\s*\{[^}]*opacity:\s*1/,
    'Ball values must appear on hover and keyboard focus',
  );
});

test('keeps capability content visible without JavaScript and enhances it when JavaScript is enabled', () => {
  assert.match(css, /\.tab-pane\s*\{[^}]*display:\s*block\s*;[^}]*\}/s,
    'Capability panes must be visible by default without JavaScript');
  assert.match(css, /\.js\s+\.tab-pane\s*\{[^}]*display:\s*none\s*;[^}]*\}/s,
    'JavaScript-enabled pages must hide inactive capability panes');
  assert.match(css, /\.js\s+\.tab-pane\.active\s*\{[^}]*display:\s*block\s*;[^}]*\}/s,
    'JavaScript-enabled pages must show the active capability pane');

  const enhancementScript = html.indexOf("document.documentElement.classList.add('js')");
  const stylesheet = html.indexOf('href="css/style.css"');
  assert.ok(enhancementScript >= 0 && enhancementScript < stylesheet,
    'The JS-enabled class must be applied before CSS loads to avoid a capability-pane flash');
});

test('uses a local generated QR asset and a clickable canonical URL', () => {
  const qrModal = html.match(/<div id=["']qr-modal["'][\s\S]*?<script src=/i)?.[0] ?? '';
  assert.match(qrModal, /src=["']assets\/profile-qr\.png["']/,
    'QR modal must reference the generated local QR image');
  assert.match(
    qrModal,
    /href=["']https:\/\/zhufrankie2020\.github\.io\/self-intro-project\/["']/,
    'Canonical profile URL must be clickable',
  );
  assert.equal(qrAsset.subarray(1, 4).toString('ascii'), 'PNG',
    'Generated QR asset must be a PNG file');
  assert.ok(qrAsset.length > 500, 'Generated QR asset is unexpectedly small');
});

test('keeps muted small text at or above WCAG AA contrast on page and card backgrounds', () => {
  const muted = css.match(/--text-muted:\s*#([0-9a-f]{6})/i)?.[1];
  assert.ok(muted, 'Missing six-digit --text-muted colour');

  const toRgb = (hex) => hex.match(/../g).map((part) => Number.parseInt(part, 16));
  const composite = (foreground, alpha, background) => foreground.map(
    (channel, index) => Math.round((channel * alpha) + (background[index] * (1 - alpha))),
  );
  const luminance = (rgb) => rgb
    .map((channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    })
    .reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index], 0);
  const contrast = (foreground, background) => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };

  const page = toRgb('0b0f19');
  const card = composite(toRgb('111827'), 0.7, page);
  const mutedRgb = toRgb(muted);
  assert.ok(contrast(mutedRgb, page) >= 4.5, '--text-muted fails 4.5:1 on the page background');
  assert.ok(contrast(mutedRgb, card) >= 4.5, '--text-muted fails 4.5:1 on the card background');
});

test('publishes the approved education, contact actions, and local avatar', () => {
  const hero = sectionContent('hero');
  const education = sectionContent('education');
  const connect = sectionContent('connect');

  for (const entry of [
    'Master of e-Business Management, University of Technology Sydney',
    'Bachelor of Economics, South China Normal University',
  ]) {
    mustIncludeIn(education, entry, 'education entry');
  }

  for (const entry of [
    'https://www.linkedin.com/in/frankie-zhu-9987a51',
    'mailto:zhu.frankie@gmail.com',
  ]) {
    mustIncludeIn(connect, entry, 'contact action');
  }

  assert.match(hero, /(?:src|href)=["']assets\/frankie-avatar\.png["']/,
    'Missing local avatar reference assets/frankie-avatar.png');
});

test('keeps the approved narrative order and confines AI hobbies to Beyond Work', () => {
  const principlesStart = html.search(/id=["']principles["']/);
  const capabilitiesStart = html.search(/id=["']capabilities["']/);
  assert.ok(principlesStart >= 0 && principlesStart < capabilitiesStart,
    'How I Think and Lead must precede From Strategy to Results');

  const capabilities = sectionContent('capabilities');
  const labels = ['Strategy & Outcomes', 'People, Process & Delivery', 'Tools & Technology'];
  const positions = labels.map((label) => capabilities.indexOf(label));
  assert.ok(positions.every((position) => position >= 0), 'All capability labels must be visible in #capabilities');
  assert.ok(positions[0] < positions[1] && positions[1] < positions[2],
    'Capability tabs must be ordered strategy, people/process/delivery, then tools/technology');

  const hobbies = sectionContent('hobbies');
  const professionalHtml = html.replace(hobbies, '');
  for (const phrase of ['AI agents', 'vibe coding']) {
    mustIncludeIn(hobbies, phrase, 'AI exploration hobby evidence');
    assert.ok(!professionalHtml.toLowerCase().includes(phrase.toLowerCase()),
      `${phrase} must be confined to the hobbies section`);
  }
});

test('excludes private, meeting-specific, and unsupported claims', () => {
  for (const forbidden of [
    /HSBC/i,
    /presentation(?:\s|-)?(?:timer|mode)|10-?min(?:ute)?\s+(?:intro|agenda|mode)/i,
    /agenda/i,
    /96%/,
    /99%/,
    /audit/i,
    /Alps/i,
    /coastal routes?/i,
    /\bPMP\b/i,
    /\bITIL\b/i,
    /GenAI Dev-Sec-Ops/i,
    /HappySignal XLA/i,
    /Guangzhou\s*&\s*Global/i,
    /Fluent EN\s*\/\s*CN\s*\/\s*Cantonese/i,
    /Google Antigravity AI/i,
  ]) {
    assert.ok(!forbidden.test(site), `Forbidden claim remains: ${forbidden}`);
  }
});

test('retains the required dependency-free interactions, static snooker table, and responsive CSS', () => {
  assert.match(html, /class=["'][^"']*tab-btn/, 'Capability tabs are missing');
  assert.match(html, /soccer-widget|football-widget/i, 'Football interaction is missing');
  assert.match(html, /snooker-widget/, 'Static snooker table is missing');
  assert.match(html, /adv-route-selector|motorbike.*selector/i, 'Motorbike selector is missing');
  assert.match(html, /id=["']cmd-k-modal["']/, 'Command menu is missing');
  assert.match(html, /id=["']qr-modal["']/, 'QR modal is missing');
  assert.match(script, /formation/i, 'Football interaction behaviour is missing');
  assert.doesNotMatch(script, /snookerBreak|potRedBtn|potBlackBtn/, 'Removed snooker game behaviour remains');
  assert.match(script, /routeData/, 'Motorbike selector behaviour is missing');
  assert.match(css, /@media\s*\(/, 'Responsive CSS is missing');
});
