if (typeof document === "undefined") {
  globalThis.document = { createElement: () => {} };
}
