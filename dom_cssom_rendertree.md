# 🧩 1. Document Object Model (DOM)

### 🔹 What It Is

The **DOM (Document Object Model)** is a **tree-structured representation** of the HTML document.

### It is **language-agnostic** — JavaScript, Python (via libraries), or browser internals can manipulate it.
---
### ⚙️ How the DOM Is Built

1. **Raw File Loading**:
   The browser receives the HTML document as raw bytes. This is the initial step where the browser fetches the HTML file from the server.
   
2. **Tokenization** – The rendering engine’s **HTML tokenizer** reads the raw HTML as a character stream and breaks it into **tokens** (e.g., start tags, end tags, text nodes, comments).

   ```html
   <p>Hello <b>World</b></p>
   ```

   → Tokens: `<p>`, `Hello`, `<b>`, `World`, `</b>`, `</p>`

3. **Object Creation**:
   Each tag is turned into an object, with each element becoming a node in the DOM tree.

   **Example:**
   For the previous tokens, the browser creates nodes such as:

   * `<p>` becomes an element node.
   * "Hello" becomes a text node.
   * `<b>` becomes another element node.
   * "World" becomes another text node.
   * `</b>` closes the bold tag, becoming part of the DOM structure.

5. **Node Relationships**:
   The **HTML tree builder** of rendering engine uses these tokens to create nodes and attach them in a **parent–child hierarchy**.

   **Example:**
   After node creation, the DOM tree would look something like:

   ```
   Document
   └── html
       └── body
           └── p
               ├── "Hello"
               └── b
                   └── "World"
   ```

   * The `<p>` node is the parent of both the "Hello" text node and the `<b>` node.
   * The `<b>` node is the parent of the "World" text node.

6. **DOM Ready**:
   Once the DOM is built, it is ready to be manipulated or rendered.

   **Example:**
   After parsing, the browser can now access and manipulate the structure using JavaScript. For example, if you run `document.querySelector('p')`, you get the `<p>` element, and you can change its content dynamically.

---
### 🧠 Structure of the DOM

Each node in the DOM is one of these types:

* **Element node** (e.g., `<p>`, `<div>`)
* **Text node** (content inside tags)
* **Attribute node** (e.g., `class="title"`)
* **Comment node**

### 🧮 DOM Properties

* **Dynamic:** Can be modified in real time by JavaScript (`document.createElement()`, `.innerHTML`, etc.)
* **Hierarchical:** Nodes form a tree that represents document nesting.
* **Live structure:** Any JS modification updates what you see visually.
* **Incremental Parsing** – The browser can build and display partial DOMs even before the full HTML file downloads.
---
# 🎨 2. CSS Object Model (CSSOM)

### 🔹 What It Is

The **CSSOM** (CSS Object Model) represents all **CSS style rules** applied to the document — including **external**, **embedded**, and **inline** styles — in a **tree structure** that mirrors the DOM’s logical hierarchy.

It’s like the “style database” that browsers use to calculate how elements should look.

---

### ⚙️ How the CSSOM Is Built

1. **CSS Fetching**

   * The rendering engine requests all linked CSS files (`<link>`, `<style>`, and inline styles) from the browser engine. The browser engine then sends back the CSS files using the document loader.

2. **Tokenization and Parsing**

   * CSS text is parsed into **selectors** and **declarations**.

   **Example:**

   ```css
   p { color: blue; font-size: 16px; }
   b { font-weight: bold; }
   ```

   → Tokens: `p`, `color`, `blue`, `font-size`, `16px`, etc.

3. **Rule Tree Construction**

   * The CSS parser builds a tree of **Style Rules**.
   * Each node contains:

     * Selector(s)
     * Declaration block
     * Specificity, inheritance info

4. **Cascade & Inheritance**

   * The browser computes the **final style values** for each element by applying:

     * **Cascade order** (author > user > browser)
     * **Specificity**
     * **Inheritance** from parent elements
     * **Default (UA) styles**

---

### 🧠 Structure of the CSSOM

**Example CSS:**

```css
body { font-size: 14px; }
p { color: blue; }
b { font-weight: bold; }
```

**CSSOM Tree:**

```
CSSStyleSheet
└── CSSRuleList
    ├── Rule 1: body → { font-size: 14px }
    ├── Rule 2: p → { color: blue }
    └── Rule 3: b → { font-weight: bold }
```

---

### 🧮 CSSOM Properties

* **Separate from the DOM** but **linked** by selectors.
* **Dynamic:** Can be modified via JavaScript (`document.styleSheets`, `element.style.color = "red"`).
* **Essential for styling:** Without CSSOM, the browser can’t compute layout or paint.


# 🧱 3. Render Tree

### 🔹 What It Is

The **Render Tree** (or **Frame Tree** in Blink) is the structure the browser uses to determine **what is visible** and **how it looks**.

It merges:

* **DOM** → content and structure
* **CSSOM** → style and visual rules

It contains **only visual elements** (e.g., excludes `<head>` or `display: none`).

---

### ⚙️ How the Render Tree Is Built

#### **1. DOM Traversal**

The rendering engine starts by **walking through the DOM tree** from the root (usually the `<html>` element) down to its descendants. It processes each node in the tree and looks for visual elements that need to be displayed on the page.

**Example:**

```html
<html>
  <body>
    <p>Hello <b>World</b></p>
  </body>
</html>
```

Here, the engine will traverse:

* `<html>` → `<body>` → `<p>` → `Hello` → `<b>` → `World`

#### **2. Style Resolution**

For each element, the engine **finds the matched CSS rules** from the **CSSOM** and calculates the **computed styles**. These computed styles determine how an element will be displayed, including properties like `font-size`, `color`, `margin`, etc.

* For the `<p>` tag, the rendering engine will look up the styles from the CSSOM, like `color: blue; font-size: 16px;`.
* For the `<b>` tag, it will check for properties like `font-weight: bold;`.

**Example:**

CSS:

```css
p { color: blue; font-size: 16px; }
b { font-weight: bold; }
```

**Computed Styles for `<p>`**:

* `color: blue`
* `font-size: 16px`

**Computed Styles for `<b>`**:

* `font-weight: bold`

#### **3. Node Filtering**

**Invisible nodes** are **skipped** during the Render Tree creation. This includes:

* Elements with `display: none`
* `<script>`, `<meta>`, and other non-visual elements

**Example:**

```html
<div style="display: none;">Hidden Content</div>
```

* The browser will **not** include this node in the Render Tree because it has `display: none`, even if it's in the DOM.

#### **4. Render Object Creation**

For each **visible element** (i.e., those that will be painted on the screen), the engine creates a **Render Object**. These objects represent the layout and style of the elements in a way that can be used by the browser’s layout and painting phases.

* **Render Objects** can be:

  * `RenderBlock` (for block-level elements like `<div>`, `<p>`)
  * `RenderInline` (for inline elements like `<span>`, `<b>`)

These objects are then arranged into the **Render Tree**, which mirrors the **visual hierarchy** of the document.

**Example:**

```html
<html>
  <body>
    <p>Hello <b>World</b></p>
  </body>
</html>
```

In the Render Tree:

```
RenderRoot
└── RenderBody (block)
    └── RenderParagraph (block)
        ├── RenderText("Hello")
        └── RenderInline("World", bold)
```

* **`RenderBody`** is the parent node of **`RenderParagraph`**.
* **`RenderParagraph`** is the parent of the text node "Hello" and the inline `RenderInline` node for **`<b>`**.
* **`RenderInline("World", bold)`** indicates that "World" is an inline element with bold styling applied.

#### **Final Steps:**

Once the **Render Tree** is complete, the browser uses it in the **layout** phase to determine the positions and sizes of the elements. After that, the **paint** phase is triggered, where the browser paints the actual pixels on the screen according to the computed styles and layout.


### 🧠 Structure of the Render Tree

**Example HTML:**

```html
<body>
  <p>Hello <b>World</b></p>
</body>
```

**Example CSS:**

```css
p { color: blue; font-size: 16px; }
b { font-weight: bold; }
```

**Render Tree (Simplified):**

```
RenderRoot
└── RenderBody (block)
    └── RenderParagraph (block)
        ├── RenderText("Hello")
        └── RenderInline("World", bold)
```

Each render object contains:

* Style data (color, size, font)
* Geometry info (width, height, position)
* Display type (block, inline, flex)
* Layer info (for compositing)

---

### 🧮 Render Tree Properties

* **Purpose:** Direct input for layout and painting phases.
* **Structure:** Mirrors DOM but only visible nodes, each with computed styles.
* **Dynamic:** Updates when DOM or CSSOM changes.

---

# 🔁 Relationship Between DOM, CSSOM, and Render Tree

| Stage | Structure       | Purpose                                   | Includes Hidden Elements? |
| ----- | --------------- | ----------------------------------------- | ------------------------- |
| **1** | **DOM**         | Represents HTML structure/content         | ✅ Yes                     |
| **2** | **CSSOM**       | Represents style rules and cascades       | ✅ Yes                     |
| **3** | **Render Tree** | Combines DOM + CSSOM for visual rendering | ❌ No                      |

---

# ⚡ Building Pipeline Summary

```
HTML + CSS
   ↓
HTML Parser → DOM Tree
CSS Parser → CSSOM Tree
   ↓
Combine → Render Tree
   ↓
Layout → Paint → Composite → Display
```

---

# 🧠 Example in Action

**HTML**

```html
<body>
  <div class="card">
    <p>Hello <span>Mehedi</span></p>
  </div>
</body>
```

**CSS**

```css
.card { background: lightgray; padding: 10px; }
p { color: blue; }
span { font-weight: bold; }
```

**→ DOM:**

```
html
└── body
    └── div.card
        └── p
            ├── "Hello "
            └── span
                └── "Mehedi"
```

**→ CSSOM:**

```
.card { background: lightgray; padding: 10px; }
p { color: blue; }
span { font-weight: bold; }
```

**→ Render Tree:**

```
RenderBody
└── RenderBlock(div.card)
    └── RenderParagraph
        ├── RenderText("Hello ", color=blue)
        └── RenderInline(span, font-weight=bold)
```

---

# 🧭 Summary Comparison

| Concept         | Represents                 | Built From  | Used For             | Visible Elements Only? |
| --------------- | -------------------------- | ----------- | -------------------- | ---------------------- |
| **DOM**         | Document structure/content | HTML        | Scripting, Structure | ❌                      |
| **CSSOM**       | Styling information        | CSS         | Style computation    | ❌                      |
| **Render Tree** | Visual representation      | DOM + CSSOM | Layout + Painting    | ✅                      |
