import { isMarkdownTable, renderMarkdownTable } from "./lib";

export { isMarkdownTable, renderMarkdownTable } from "./lib";

if (typeof window !== "undefined") {
  const globalThis = window as unknown as Record<string, unknown>;

  globalThis.isMarkdownTable = isMarkdownTable;
  globalThis.renderMarkdownTable = renderMarkdownTable;
}
