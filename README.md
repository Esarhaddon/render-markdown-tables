## What

This is a package for rendering GitLab flavored markdown tables in the browser.

## Why

Maybe your CMS doesn't support tables, but you REALLY need a way to render some
of your content as tables. Maybe you just have lot of tables and would prefer to
write

```
<pre>
| Price | Quantity |
| :---- | -------: |
|   $5  |    42    |
|   $7  |    21    |
</pre>
```

in your HTML instead of dealing with `<th>` and `<tr>` and `<td>` tags.

## Installation

### With a CDN

`import { isMarkdownTable, renderMarkdownTable } from "https://esm.sh/render-markdown-tables@1.0.17"`

### With NPM

`npm install render-markdown-tables`

## Usage

```
<!DOCTYPE html>
<html>
  <style>
    table {
      border-collapse: collapse;
    }

    td,
    th {
      border: 1px solid black;
    }
  </style>
  <body>
    <pre class="md-table">
| Price | Quantity |
| :---- | -------: |
|   $5  |    42    |
|   $7  |    21    |
    </pre>
    <pre class="md-table">
| Fruit  | Color  |
| :----: | :----: |
| apple  |  red   |
| orange | orange |
| banana | yellow |
    </pre>
  </body>
  <script type="module">
    import {
      isMarkdownTable,
      renderMarkdownTable,
    } from "https://esm.sh/render-markdown-tables@1.0.17";

    const elements = document.querySelectorAll(".md-table");
    Array.from(elements).filter(isMarkdownTable).forEach(renderMarkdownTable);
  </script>
</html>
```
