import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('js/modal-focus.js', root), 'utf8');
const appSource = await readFile(new URL('js/app.js', root), 'utf8');

const createElement = (name) => ({
  name,
  disabled: false,
  hidden: false,
  focusCalls: [],
  focus(options) {
    this.focusCalls.push(options);
  },
  getClientRects: () => [1],
  matches: () => false,
});

const loadFocusHelpers = (activeElement) => {
  const context = {
    document: { activeElement },
    globalThis: {},
  };
  vm.runInNewContext(source, context);
  return context.globalThis.modalFocus;
};

const createTabEvent = (shiftKey = false) => ({
  key: 'Tab',
  shiftKey,
  prevented: false,
  preventDefault() {
    this.prevented = true;
  },
});

test('modal focus wraps forward from the last control to the first', () => {
  const first = createElement('first');
  const last = createElement('last');
  const helpers = loadFocusHelpers(last);
  const event = createTabEvent();

  helpers.trapTabFocus(event, { querySelectorAll: () => [first, last] });

  assert.equal(event.prevented, true);
  assert.equal(first.focusCalls.length, 1);
  assert.equal(first.focusCalls[0].preventScroll, true);
});

test('modal focus wraps backward from the first control to the last', () => {
  const first = createElement('first');
  const last = createElement('last');
  const helpers = loadFocusHelpers(first);
  const event = createTabEvent(true);

  helpers.trapTabFocus(event, { querySelectorAll: () => [first, last] });

  assert.equal(event.prevented, true);
  assert.equal(last.focusCalls.length, 1);
  assert.equal(last.focusCalls[0].preventScroll, true);
});

test('modal focus restores the opener without scrolling', () => {
  const opener = createElement('opener');
  const helpers = loadFocusHelpers(null);

  helpers.restoreFocus(opener);

  assert.equal(opener.focusCalls.length, 1);
  assert.equal(opener.focusCalls[0].preventScroll, true);
});

test('modal focus keeps a single control contained and gives an empty dialog a focus target', () => {
  const onlyControl = createElement('only control');
  const singleHelpers = loadFocusHelpers(onlyControl);
  const forward = createTabEvent();
  singleHelpers.trapTabFocus(forward, { querySelectorAll: () => [onlyControl] });

  const emptyDialog = createElement('empty dialog');
  const emptyHelpers = loadFocusHelpers(null);
  const backward = createTabEvent(true);
  emptyHelpers.trapTabFocus(backward, emptyDialog);

  assert.equal(forward.prevented, true);
  assert.equal(onlyControl.focusCalls.length, 1);
  assert.equal(backward.prevented, true);
  assert.equal(emptyDialog.focusCalls.length, 1);
});

test('command navigation returns focus before scrolling to its destination', () => {
  assert.doesNotMatch(
    appSource,
    /closeCmdK\(\{ returnFocus: false \}\);/,
    'Command navigation must not discard focus restoration',
  );
});
