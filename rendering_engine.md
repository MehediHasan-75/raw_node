# 🎨 What Is a Rendering Engine?

A **rendering engine** (also known as a **layout engine** or **web rendering core**) is the **subsystem inside the browser engine** responsible for,
- **interpreting web documents (HTML, CSS, SVG, images)** and **drawing them onto the screen**.
  
## ⚙️ Core Components of the Rendering Engine

### 1. **HTML Parser**

* Converts raw HTML text into a **DOM Tree** (Document Object Model).
* Handles incremental parsing — it starts rendering before the entire HTML is downloaded.
* Fixes invalid markup automatically (browsers are forgiving).

Example:

```html
<body>
  <p>Hello <b>World</b></p>
</body>
```
**Output:** DOM Tree
```text
Document
└─ html
   ├─ head
   └─ body
      └─ p
         ├─ #text "Hello "
         └─ b
            └─ #text "World"
```
---

### 2. **CSS Parser**

* Parses CSS rules (from `<style>`, linked stylesheets, and inline styles).
* Builds a **CSSOM Tree (CSS Object Model)** representing computed style information.

Example rule:

```css
p { color: blue; font-size: 16px; }
```
**Output:** CSSOM Tree
```text
CSSStyleSheet
└─ CSSRuleList
   └─ CSSStyleRule
      ├─ selectorText: "p"
      └─ style
         ├─ color: "blue"
         └─ font-size: "16px"
```
---

### 3. **Render Tree Construction**

* The **DOM Tree** (content) and **CSSOM Tree** (styles) are combined to produce the **Render Tree**.
* The render tree contains **only visible elements**, each with computed visual styles.

**Example:**
An element with `display: none` exists in DOM but **not** in the Render Tree.

**Output:** Render Tree — a hierarchical visual model of the page.

---

### **4. Layout / Reflow**

* **What happens:** The **Render Tree** is processed to determine the exact **geometry** of each element.

  * Position (`x`, `y`), size (`width`, `height`), margins, padding, and borders are calculated based on the **CSS box model** and **viewport constraints**.
  * When there’s a change in content or styles (e.g., window resize, content update), **layout** is recalculated (reflow).
* **Output:** Each element gets **coordinates**, **width**, **height**, and other layout information needed for rendering.

### **5. Painting (Rasterization)**

* **What happens:** The browser translates the **layout boxes** into **draw commands** (colors, borders, text, images, etc.).

  * For each node in the **Layout Tree**, a series of **drawing instructions** are generated for rendering.
  * This is called **painting** or **rasterization**.
* **Output:** A **display list** — a sequence of draw commands ready for actual rendering on the screen.

Example of draw commands:

```
Draw background color
Draw border
Draw text
Draw image
```
---
### **6. Layering and Compositing**

* **What happens:** For **complex visual effects** (e.g., `position: fixed`, `opacity`, `transform`), the page is split into **multiple layers**.

  * These layers are **rasterized** (converted to bitmaps) and often **processed by the GPU** for better performance.
  * The **compositor thread** merges these layers into the **final image**.
* **Output:** A **ready-to-display frame** that is sent to the **GPU** and rendered on the screen.

---

## 🧠 Rendering Engine Data Flow

Here’s the high-level pipeline of what happens from code to pixels:

```
HTML + CSS + JS
  ↓
HTML Parser → DOM Tree
CSS Parser → CSSOM Tree
  ↓
Combine → Render Tree
  ↓
Layout (Reflow)
  ↓
Paint (Display List)
  ↓
Compositing (GPU)
  ↓
Screen (Display Frame)
```

---

## 🧩 Interaction with Other Browser Components

| Component             | Role                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| **Browser Engine**    | Orchestrates and triggers rendering steps.                           |
| **JavaScript Engine** | Can modify DOM/CSSOM → triggers reflow/repaint.                      |
| **Network Module**    | Fetches HTML, CSS, JS, images for the rendering engine to process.   |
| **GPU Process**       | Handles rasterization and compositing for high-performance graphics. |

---

## ⚡ Optimizations in Modern Rendering Engines

1. **Incremental Rendering** – starts painting before the full page is loaded.
2. **Parallel Parsing** – HTML, CSS, and scripts are parsed concurrently.
3. **GPU Acceleration** – offloads compositing and rasterization to the GPU.
4. **Lazy Layout & Paint** – only re-renders affected parts after DOM changes.
5. **Pre-rendering and Caching** – reuse layout and style data for speed.
6. **Display List & Skia (Blink)** – efficient graphics library to batch paint commands.

---

## 🧱 Rendering Engine Example Internals (Blink)

Blink (used by Chrome and Edge) has submodules like:

| Subsystem                           | Function                                    |
| ----------------------------------- | ------------------------------------------- |
| **Document Loader**                 | Receives data from the network module       |
| **HTMLTokenizer / HTMLTreeBuilder** | Parses HTML incrementally                   |
| **Style Engine**                    | Parses CSS and computes styles              |
| **Layout Engine**                   | Calculates positions and dimensions         |
| **Paint Controller**                | Records draw commands                       |
| **Compositor / Raster Thread**      | Combines and renders final layers using GPU |

---

## 🧭 Summary Table

| Stage             | Description         | Output          |
| ----------------- | ------------------- | --------------- |
| HTML Parsing      | Convert HTML → DOM  | DOM Tree        |
| CSS Parsing       | Convert CSS → CSSOM | CSSOM Tree      |
| Style Calculation | Combine DOM + CSSOM | Render Tree     |
| Layout            | Compute geometry    | Box dimensions  |
| Paint             | Draw visuals        | Display list    |
| Compositing       | Merge layers        | Frame on screen |

---

## 🔍 Rendering Engines by Browser

| Browser               | Rendering Engine | JS Engine              |
| --------------------- | ---------------- | ---------------------- |
| Chrome / Edge / Opera | **Blink**        | V8                     |
| Safari                | **WebKit**       | JavaScriptCore (Nitro) |
| Firefox               | **Gecko**        | SpiderMonkey           |
| Old IE                | **Trident**      | Chakra                 |

---

## 🖼️ In Simple Terms

* **Browser Engine** = Project Manager (coordinates everyone).
* **Rendering Engine** = Artist (draws the webpage).
* **JavaScript Engine** = Brain (adds logic and interaction).
