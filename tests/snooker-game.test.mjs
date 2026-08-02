import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const appSource = await readFile(new URL('js/app.js', root), 'utf8');

const createClassList = (element) => ({
  add: (...names) => {
    const classes = new Set(element.className.split(/\s+/).filter(Boolean));
    names.forEach(name => classes.add(name));
    element.className = [...classes].join(' ');
  },
  remove: (...names) => {
    const remove = new Set(names);
    element.className = element.className
      .split(/\s+/)
      .filter(name => name && !remove.has(name))
      .join(' ');
  },
  contains: name => element.className.split(/\s+/).includes(name),
  toggle: (name, force) => {
    if (force) element.classList.add(name);
    else element.classList.remove(name);
  },
});

const createElement = ({ textContent = '', className = '', disabled = false } = {}) => {
  const listeners = new Map();
  const attributes = new Map();
  const element = {
    textContent,
    innerHTML: '',
    className,
    disabled,
    style: {},
    dataset: {},
    classList: null,
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
    querySelectorAll() {
      return [];
    },
    appendChild() {},
    focus() {},
    click() {
      if (!this.disabled) listeners.get('click')?.({ target: this });
    },
  };
  element.classList = createClassList(element);
  return element;
};

const loadSnookerGame = () => {
  const elements = new Map([
    ['snooker-break-score', createElement({ textContent: '0' })],
    ['snooker-balls-count', createElement({ textContent: '0' })],
    ['snooker-reds-remaining', createElement({ textContent: '15' })],
    ['pot-red-btn', createElement({ textContent: 'Pot red (1pt)' })],
    ['pot-black-btn', createElement({ textContent: 'Pot black (7pt)', disabled: true })],
    ['reset-snooker-btn', createElement({ textContent: 'Reset table' })],
    ['snooker-feedback', createElement()],
    ['snooker-cue-ball', createElement({ className: 'ball ball-white' })],
    ['snooker-target-ball', createElement({ className: 'ball ball-red' })],
  ]);

  let nextTimerId = 1;
  const timers = new Map();
  const context = {
    document: {
      activeElement: null,
      addEventListener(type, handler) {
        if (type === 'DOMContentLoaded') handler();
      },
      getElementById(id) {
        return elements.get(id) ?? null;
      },
      querySelectorAll() {
        return [];
      },
      querySelector() {
        return null;
      },
      createElement() {
        return createElement();
      },
    },
    window: {
      addEventListener() {},
      modalFocus: undefined,
    },
    setTimeout(handler) {
      const id = nextTimerId++;
      timers.set(id, handler);
      return id;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
  };

  vm.runInNewContext(appSource, context);

  return {
    get: id => elements.get(id),
    flushTimers() {
      const pending = [...timers.values()];
      timers.clear();
      pending.forEach(handler => handler());
    },
  };
};

const pot = (game, buttonId) => {
  game.get(buttonId).click();
  game.flushTimers();
};

test('snooker controls stay locked until the ball animation finishes', () => {
  const game = loadSnookerGame();

  game.get('pot-red-btn').click();

  assert.equal(game.get('pot-red-btn').disabled, true);
  assert.equal(game.get('pot-black-btn').disabled, true);

  game.flushTimers();
  assert.equal(game.get('pot-black-btn').disabled, false);
});

test('maximum-break builder clears 15 reds and blacks, then the six colours, ending at 147', () => {
  const game = loadSnookerGame();

  for (let pair = 0; pair < 15; pair += 1) {
    pot(game, 'pot-red-btn');
    pot(game, 'pot-black-btn');
  }

  assert.equal(game.get('snooker-break-score').textContent, 120);
  assert.equal(game.get('snooker-balls-count').textContent, 30);
  assert.equal(game.get('snooker-reds-remaining').textContent, 0);
  assert.equal(game.get('pot-red-btn').disabled, true);
  assert.equal(game.get('pot-black-btn').disabled, false);
  assert.match(game.get('pot-black-btn').textContent, /yellow \(2pt\)/i);
  assert.match(game.get('snooker-target-ball').className, /ball-yellow/);

  const clearance = [
    ['yellow', 122],
    ['green', 125],
    ['brown', 129],
    ['blue', 134],
    ['pink', 140],
    ['black', 147],
  ];

  clearance.forEach(([colour, expectedScore], index) => {
    assert.match(game.get('pot-black-btn').textContent, new RegExp(colour, 'i'));
    pot(game, 'pot-black-btn');
    assert.equal(game.get('snooker-break-score').textContent, expectedScore);

    const next = clearance[index + 1]?.[0];
    if (next) assert.match(game.get('pot-black-btn').textContent, new RegExp(next, 'i'));
  });

  assert.equal(game.get('snooker-balls-count').textContent, 36);
  assert.equal(game.get('snooker-reds-remaining').textContent, 0);
  assert.equal(game.get('pot-red-btn').disabled, true);
  assert.equal(game.get('pot-black-btn').disabled, true);
  assert.match(game.get('snooker-feedback').innerHTML, /maximum break.*147/i);
});

test('reset cancels a pending animation and restores the opening red', () => {
  const game = loadSnookerGame();

  game.get('pot-red-btn').click();
  game.get('reset-snooker-btn').click();
  game.flushTimers();

  assert.equal(game.get('snooker-break-score').textContent, 0);
  assert.equal(game.get('snooker-balls-count').textContent, 0);
  assert.equal(game.get('snooker-reds-remaining').textContent, 15);
  assert.equal(game.get('pot-red-btn').disabled, false);
  assert.equal(game.get('pot-black-btn').disabled, true);
  assert.equal(game.get('snooker-target-ball').className, 'ball ball-red');
});
