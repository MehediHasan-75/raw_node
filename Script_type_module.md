# 💡 About `type="module"`

You can also load scripts using the **ES Module system**. It is similar to `defer` but not same.  `type="module"` = **`defer` + ES Modules + strict mode + dependency management**.

```html
<script type="module" src="main.js"></script>
```

### 🔍 Behavior

`type="module"` scripts automatically behave like **`defer`**. But:

* Maintain **execution order** based on import dependencies.
* Run in **strict mode** and **module scope** *(variables aren’t global)*
* Support `import` and `export` *(modular JS support)*

Example:

```js
// main.js
import { greet } from './utils.js';
greet('Mehedi');

// utils.js
export function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

---

# ⚙️ How the Browser Loads Module Dependencies

When you write:

```html
<script type="module" src="main.js"></script>
```

the browser loads and executes your scripts through the **ES Module system** — automatically handling dependencies.

---

### 🧠 Step-by-Step

1. **HTML Parsing Begins**
   The browser starts reading HTML and encounters
   `<script type="module" src="main.js">`.

2. **Module Scheduled**

   * Fetches `main.js` asynchronously *(same as `defer`)*
   * HTML parsing continues *(same as `defer`)*

3. **Imports Detected**
   The **module parser** scans `main.js` before execution.
   For every line like:

   ```js
   import { greet } from './utils.js';
   ```

   Tt automatically fetches all required modules and their dependencies.
   - If the browser’s module parser found one or more import statements it began fetching those files (and their dependencies) before running any code.
   - Execution waits until all are fetched and parsed.
   - Only when every dependency is ready, the browser executes them in the correct order.

5. **Dependency Graph Built**

   ```
   main.js
     └── utils.js
           └── constants.js
   ```

   Each module is downloaded **once**, even if imported multiple times *(extra behavior)*.

6. **Execution Order**
   Runs **bottom-up** in dependency order *(extra — determined by imports)*:
   `constants.js` → `utils.js` → `main.js`

7. **Caching**
   Modules are cached and reused *(extra — efficient re-imports)*.

---

### 🔁 Visualization

```
HTML Parser
   ↓
<script type="module" src="main.js">
   ↓
main.js ──→ utils.js ──→ constants.js
   ↓                 ↓
executes last   executes first
```

---

### ⚙️ Quick Comparison

| Attribute       | HTML Parsing                   | Execution Timing                   | Scope                  | Supports Imports? | Use Case               |
| --------------- | ------------------------------ | ---------------------------------- | ---------------------- | ----------------- | ---------------------- |
| `defer`         | Non-blocking                   | After DOM parsed                   | Global scope           | ❌ No              | DOM manipulation       |
| `type="module"` | Non-blocking *(same as defer)* | After DOM parsed *(same as defer)* | Module scope *(extra)* | ✅ Yes *(extra)*   | Modern modular scripts |



