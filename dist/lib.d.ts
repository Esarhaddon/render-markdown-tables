/**
 * Returns true if the result of parsing the element's text is a single element
 * and that element is a table.
 */
export declare function isMarkdownTable(element: Element): boolean;
/**
 * Replaces the element's innerHTML with an html table if `isMarkdownTable`
 * returns true for the element. Otherwise it does nothing.
 */
export declare function renderMarkdownTable(element: Element): Promise<void>;
