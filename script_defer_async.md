# 🏷️ Understanding `<script defer>` and `<script async>`

Modern browsers can load JavaScript in several ways.
The attributes **`defer`** and **`async`** both allow scripts to download **without blocking HTML parsing**,
but they differ in **when** the script executes.

---

## 🚀 Overview

### Default Behavior (No Attributes)

When you use a normal script tag:

```html
<script src="main.js"></script>
```

The browser:

1. Stops parsing HTML when it reaches this line.
2. Downloads `main.js`.
3. Executes it immediately.
4. Then resumes HTML parsing.

This **blocks rendering**, delaying page load and interactivity.

---

## 🧩 Non-Blocking Attributes

| Attribute | Blocks HTML Parsing? | Execution Timing             | Keeps Script Order? |
| --------- | -------------------- | ---------------------------- | ------------------- |
| *(none)*  | ✅ Yes                | Immediately when encountered | ✅ Yes               |
| `async`   | ❌ No                 | As soon as downloaded        | ❌ No                |
| `defer`   | ❌ No                 | After HTML parsing completes | ✅ Yes               |

---

## 🔄 How `<script defer>` and `<script defer>` Works

When you write:

```html
<script src="main.js" defer></script>
```
or
```html
<script src="main.js" async></script>
```
the browser changes **when and how** the script loads and runs.

---

### 🧠 Step-by-Step

1. **HTML parsing begins**
   The browser starts building the DOM, reading HTML line by line.

2. **Deferred script encountered**
   When the browser sees `<script src="main.js" defer>`, it:

   * **Starts downloading** the file asynchronously.
     The browser’s **resource loader** and **network layer** handle this fetch while parsing continues.
   * **Continues parsing HTML** without interruption.

3. **Download completes**

   * `defer`: Once `main.js` is fully downloaded, it’s **stored in memory**, ready for later execution.
     The script runs **only after** the entire HTML document is parsed.
     Deferred scripts execute **in the same order** they appear, and the browser fires the `DOMContentLoaded` event **after** all have finished.

   * `async`:

     * **Pauses HTML parsing temporarily.**
     * **Executes the script immediately.**
       Parsing then continues where it left off.

---

### ⚙️ Technical Flow

```
HTML Parser in Browser (client-side)
   │
   ├─► Encounters <script defer> or <script async>
   │       └─► Adds to Resource Loader queue
   │
   ├─► Continues parsing HTML (non-blocking)
   │
Network Layer
   ├─► Checks HTTP cache
   ├─► Sends HTTP GET request to server
   ├─► Streams response into memory
   └─► Marks script ready (notify parser)
   │          │
   │          └─► For async → Executes immediately when ready
   │                     (Does NOT wait for DOM parsing)
   │
DOM Ready
   ├─► Executes deferred scripts in order
   └─► Fires `DOMContentLoaded` event
```

---

### 🌐 Why the Network Layer Is Used

Browsers have layered subsystems:

| Layer                            | Role                                     |
| -------------------------------- | ---------------------------------------- |
| **HTML Parser**                  | Reads and builds the DOM                 |
| **Network / Resource Loader**    | Fetches resources (scripts, CSS, images) |
| **JavaScript Engine (e.g., V8)** | Executes JS code                         |
| **Renderer**                     | Paints the page visually                 |

The **JavaScript engine** doesn’t fetch files — it only runs them.
The **network layer** handles all I/O (HTTP, TCP, caching, etc.).

Example request:

```http
GET /main.js HTTP/1.1
Host: example.com
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/javascript
```

---

### 🧠 Analogy

Think of the browser as a restaurant kitchen:

| Role               | Component     | Description                                 |
| ------------------ | ------------- | ------------------------------------------- |
| 👨‍🍳 Chef         | HTML Parser   | Reads the recipe (HTML) and builds the DOM. |
| 🚴 Delivery Person | Network Layer | Fetches ingredients (JS files) in parallel. |
| 🔥 Cook            | JS Engine     | Executes scripts once everything’s ready.   |

* **Without `defer`** → the chef stops cooking every time an ingredient is missing.
* **With `defer`** → the chef keeps working while the delivery person fetches everything; cooking starts after all prep is done.

---

## 💡 Why Use `defer`

✅ **Improved performance** — HTML keeps loading while JS downloads.
✅ **Guaranteed order** — scripts run in appearance order.
✅ **DOM ready** — ensures the DOM is built before running.
✅ **Best for initialization or DOM-manipulation scripts.**

---

### 💡 When to Use `async`

Use for **independent scripts** — ones that don’t depend on the DOM or other scripts.

Common examples:

* Analytics (`analytics.js`)
* Ads or tracking tags
* External libraries that don’t modify the DOM

Example:

```html
<script src="https://example.com/tracker.js" async></script>
```

---

### 🧠 Analogy for `async`

Think of `async` as a worker who rushes in to perform a task **the moment they’re ready**,
even if the rest of the team (HTML parser) is still working.

* **Async** → “Run as soon as ready, ignore others.”
* **Defer** → “Wait until everyone (DOM) is ready, then run in order.”

---

## 🧱 Key Notes

* `defer` and `async` only work with **external scripts** (`src` required).
* `type="module"` scripts behave like `defer` automatically.
* Even though both load files asynchronously, when executed, they **still run on the main thread**, not in the background.
* If both `async` and `defer` are present, **`async` takes precedence**.

---

## 🧩 Summary Table

| Attribute | HTML Parsing | Script Download | Script Execution | Execution Order | Use Case              |
| --------- | ------------ | --------------- | ---------------- | --------------- | --------------------- |
| *(none)*  | Blocked      | Sequential      | Immediate        | Preserved       | Critical inline logic |
| `async`   | Non-blocking | Parallel        | As soon as ready | Unordered       | Analytics, ads        |
| `defer`   | Non-blocking | Parallel        | After DOM parse  | Ordered         | DOM-related scripts   |
