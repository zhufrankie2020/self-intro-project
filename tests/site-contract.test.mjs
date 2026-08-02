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

const mustInclude = (text, label = text) =>
  assert.ok(site.includes(text), `Missing approved content: ${label}`);

test('publishes the approved professional profile hierarchy', () => {
  mustInclude('Global Transformation & Technology Leader');

  for (const id of ['principles', 'capabilities', 'hobbies', 'education', 'connect']) {
    assert.match(html, new RegExp(`<section[^>]+id=["']${id}["']`), `Missing section #${id}`);
  }
});

test('keeps the approved leadership principles and evidence', () => {
  for (const slogan of [
    'Do the right thing before doing the thing right.',
    'Easier is better.',
    'Grow people. Strengthen teams. Succeed together.',
  ]) {
    mustInclude(slogan);
  }

  for (const metric of [
    '20+ years in technology and transformation',
    '0% to 80% digital-channel adoption',
    '4.9/5 global user CSAT',
    '2x Great Line Manager Award winner',
  ]) {
    mustInclude(metric);
  }
});

test('keeps the approved capability labels and delivery sequence', () => {
  for (const label of [
    'Strategy & Outcomes',
    'People, Process & Delivery',
    'Tools & Technology',
  ]) {
    mustInclude(label);
  }

  mustInclude('Frame the problem → align the people → mobilise delivery → measure and adapt');
});

test('publishes the five approved hobby stories', () => {
  assert.equal(
    (html.match(/class=["'][^"']*hobby-card/g) ?? []).length,
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
    mustInclude(detail);
  }

  mustInclude('September 2026 — Planned');
});

test('publishes the approved education, contact actions, and local avatar', () => {
  for (const entry of [
    'Master of e-Business Management, University of Technology Sydney',
    'Bachelor of Economics, South China Normal University',
    'https://www.linkedin.com/in/frankie-zhu-9987a51',
    'mailto:zhu.frankie@gmail.com',
  ]) {
    mustInclude(entry);
  }

  assert.match(html, /(?:src|href)=["']assets\/frankie-avatar\.png["']/,
    'Missing local avatar reference assets/frankie-avatar.png');
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
