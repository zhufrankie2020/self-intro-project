/* Dependency-free focus helpers shared by the command and QR dialogs. */
(function (global) {
  const focusableSelector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const focusWithoutScrolling = (element) => element?.focus?.({ preventScroll: true });

  const getFocusableElements = (container) => Array.from(
    container?.querySelectorAll?.(focusableSelector) ?? [],
  ).filter((element) => (
    element.getAttribute?.('aria-hidden') !== 'true'
    && !element.hidden
    && element.getClientRects?.().length !== 0
  ));

  function trapTabFocus(event, container) {
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) {
      event.preventDefault();
      focusWithoutScrolling(container);
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      focusWithoutScrolling(last);
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      focusWithoutScrolling(first);
    }
  }

  function restoreFocus(element) {
    if (element?.isConnected === false) return;
    focusWithoutScrolling(element);
  }

  global.modalFocus = { trapTabFocus, restoreFocus };
}(globalThis));
