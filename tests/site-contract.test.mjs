import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const readSiteFile = (path) => readFile(new URL(path, root), 'utf8');
const [html, script, css] = await Promise.all([
  readSiteFile('index.html'),
  readSiteFile('js/app.js'),
  readSiteFile('css/style.css'),
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

  for (const metric of [
    '20+ years in technology and transformation',
    '0% to 80% digital-channel adoption',
    '4.9/5 global user CSAT',
    '2x Great Line Manager Award winner',
  ]) {
    mustIncludeIn(hero, metric, 'evidence metric');
  }
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
  ]) {
    assert.ok(!forbidden.test(site), `Forbidden claim remains: ${forbidden}`);
  }
});

test('retains the required dependency-free interactions and responsive CSS', () => {
  assert.match(html, /class=["'][^"']*tab-btn/, 'Capability tabs are missing');
  assert.match(html, /soccer-widget|football-widget/i, 'Football interaction is missing');
  assert.match(html, /snooker-widget/, 'Snooker break-builder is missing');
  assert.match(html, /adv-route-selector|motorbike.*selector/i, 'Motorbike selector is missing');
  assert.match(html, /id=["']cmd-k-modal["']/, 'Command menu is missing');
  assert.match(html, /id=["']qr-modal["']/, 'QR modal is missing');
  assert.match(script, /formation/i, 'Football interaction behaviour is missing');
  assert.match(script, /snooker/i, 'Snooker break-builder behaviour is missing');
  assert.match(script, /routeData/, 'Motorbike selector behaviour is missing');
  assert.match(css, /@media\s*\(/, 'Responsive CSS is missing');
});
