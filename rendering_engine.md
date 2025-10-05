# 🎨 What Is a Rendering Engine?

A **rendering engine** (also known as a **layout engine** or **web rendering core**) is the **subsystem inside the browser engine** responsible for **interpreting web documents (HTML, CSS, SVG, images)** and **drawing them onto the screen**.

While the **browser engine** orchestrates and delegates tasks, the **rendering engine** is where the *visual magic* happens — it builds trees, calculates layouts, paints pixels, and composites layers.

---

## ⚙️ Core Components of the Rendering Engine

Let’s go step-by-step through the **main modules** that make up a modern rendering engine like **Blink**, **WebKit**, or **Gecko**.

---

### 1. **HTML Parser**

* Converts raw HTML text into a **DOM Tree** (Document Object Model).
* Handles incremental parsing — it starts rendering before the entire HTML is downloaded.
* Fixes invalid markup automatically (browsers are forgiving).

**Output:** DOM Tree
Example:

```html
<body>
  <p>Hello <b>World</b></p>
</body>
```

→ becomes a tree structure of nodes.

---

### 2. **CSS Parser**

* Parses CSS rules (from `<style>`, linked stylesheets, and inline styles).
* Builds a **CSSOM Tree (CSS Object Model)** representing computed style information.

**Output:** CSSOM Tree
Example rule:

```css
p { color: blue; font-size: 16px; }
```

---

### 3. **Render Tree Construction**

* The **DOM Tree** (content) and **CSSOM Tree** (styles) are combined to produce the **Render Tree**.
* The render tree contains **only visible elements**, each with computed visual styles.

**Example:**
An element with `display: none` exists in DOM but **not** in the Render Tree.

**Output:** Render Tree — a hierarchical visual model of the page.

---

### 4. **Layout / Reflow**

* Determines the **geometry** (position and size) of each render tree node.
* Uses the **CSS box model**, flow rules, and viewport constraints.
* When content or styles change, layout is recalculated (**reflow**).

**Output:** Each element has coordinates, width, height, and stacking context.

---

### 5. **Painting (Rasterization)**

* Converts each layout box into **draw commands** (borders, text, shadows, images, backgrounds).
* Produces one or more **display lists** — sequences of drawing instructions.

**Example draw commands:**

```
Draw background color
Draw border
Draw text
Draw image
```

---

### 6. **Layering and Compositing**

* The page is split into multiple **layers** (for complex effects like `position: fixed`, `opacity`, `transform`, etc.).
* Each layer is **rasterized (converted to bitmaps)**, often using the **GPU**.
* A **compositor thread** merges these layers into the final frame.

**Output:** A ready-to-display frame sent to the GPU and displayed on screen.

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
