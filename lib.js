if (typeof document === "undefined") {
  global.document = { createElement: () => {} };
}

import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";

/** Trims whitespace, including zero-width spaces, from the start and end of a
 * string. */
function trim(text) {
  return text?.replace(/(^(\s|\u200B)+)|((\s|\u200B)+$)/g, "");
}

/**
 * Retrieves the element's text with the `selectNodeContents` range method.
 */
function getText(element) {
  const range = new Range();
  const selection = getSelection();

  range.selectNodeContents(element);
  selection?.empty();
  selection?.addRange(range);

  const text = selection?.toString();
  selection?.empty();

  return text;
}

/**
 * Returns true if the result of parsing the element's text is a single element
 * and that element is a table.
 */
export function isMarkdownTable(element) {
  const text = getText(element);
  const parsed = unified().use(remarkParse).use(remarkGfm).parse(trim(text));
  return parsed.children[0]?.type === "table" && parsed.children.length === 1;
}

/**
 * Replaces the element's innerHTML with an html table if `isMarkdownTable`
 * returns true for the element. Otherwise it does nothing.
 */
export async function renderMarkdownTable(element) {
  if (isMarkdownTable(element)) {
    const text = getText(element);

    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      // IMPORTANT: rehypeRaw and rehypeSanitize must be used to sanitize html
      // input
      // - https://github.com/remarkjs/remark-rehype?tab=readme-ov-file#example-supporting-html-in-markdown-properly
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(trim(text));

    // Replace the element's contents with the table html
    element.innerHTML = trim(String(result))
      // Trim whitespace from table cells
      .replace(/((?<=<t(d|h)[^>]*>)\s+)|(\s+(?=<\/t(d|h)>))/g, "");
  }
}
