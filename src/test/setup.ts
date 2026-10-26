import '@testing-library/jest-dom/vitest';

class MockResizeObserver implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(_target: Element) {}
  unobserve(_target: Element) {}
  disconnect() {}
}

globalThis.ResizeObserver = MockResizeObserver;
