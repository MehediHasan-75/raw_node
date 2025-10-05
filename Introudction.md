# How a browser executes JavaScript?

1. **Page load & script discovery**

* HTML parser reads the document top-to-bottom.
* When it hits a `<script>`:

  * **blocking** by default: HTML parsing pauses until the script is fetched & executed.
  * `defer`: fetch during parsing, execute after HTML is parsed (before `DOMContentLoaded`).[Details](/).
  * `async`: fetch during parsing, execute ASAP when ready (order not guaranteed).
  * `type="module"`: ES modules load **deferred**, support `import`, run in strict mode, and have their own dependency graph.

2. **Fetch**

* Network layer downloads the JS (or pulls from cache).
* CSP, CORS, and integrity checks (for external scripts) may apply.

3. **Hand-off to the JS engine**

* The browser gives the source to its engine (e.g., **V8** in Chromium, **SpiderMonkey** in Firefox, **JavaScriptCore** in Safari).

4. **Parsing → AST → (Bytecode/IR)**

* **Parser** tokenizes & builds an **AST** (Abstract Syntax Tree).
* **Compiler pipeline** lowers the AST to **bytecode/IR** for a baseline interpreter.

5. **Interpretation & Just-In-Time (JIT) compilation**

* A fast interpreter starts running the bytecode immediately.
* **Profilers** watch hot code paths; **JIT** compiles those to optimized native machine code.
* If assumptions break (e.g., types change), the engine **deopts** back to safer code.

6. **Memory model**

* **Heap** for objects/functions/closures; **stack** for call frames.
* **Garbage collector** reclaims unreachable objects (often generational/incremental).

7. **Web APIs live outside the engine**

* `setTimeout`, `fetch`, `DOM`, `Canvas`, `WebSocket`, etc. are **browser-provided** (not JS language features).
* When you call them, you cross a boundary from the engine to **browser subsystems**.

8. **Concurrency model: event loop**

* JS is **single-threaded** (on the main thread), so concurrency uses an **event loop** with queues:

  * **Task (macro-task) queue**: `setTimeout`, user input, network callbacks, `postMessage`, script execution units.
  * **Microtask queue**: **promises** (`.then`/`await` continuations), `queueMicrotask`, `MutationObserver`.
* **Turn of the loop**:

  1. Run one macro-task to completion.
  2. Drain all microtasks.
  3. Update rendering (layout/paint/composite).
  4. Repeat.

9. **DOM & rendering pipeline**

* JS that touches the DOM updates the **DOM tree** and possibly **CSSOM**.
* Browser may need **style** → **layout** → **paint** → **compositing**.
* It batches work to ~60fps (or display refresh) with **rAF** (`requestAnimationFrame`) before painting.

10. **Modules & dependency loading**

* ES modules fetch imports (potentially in parallel), build a **module graph**, then **instantiate** and **evaluate** in correct dependency order.
* Each module has its own scope; imports are live bindings.

11. **Workers**

* **Web Workers** run JS off the main thread with their own event loop (no direct DOM access).
* Communicate via **message passing** (structured cloning/transferables).

12. **Security boundaries**

* **Same-Origin Policy** gates DOM access across origins.
* **CSP** restricts script sources/inline execution.
* **Isolated realms/iframed** content keeps code and globals separate.

---

## Mental model (TL;DR)

**JS code** → parsed & (JIT) compiled by the **engine** → calls into **Web APIs** (browser) → results/callbacks queued → **event loop** runs tasks & microtasks → **DOM/CSSOM** updates → **render**.


### ⚙️ The Problem

JavaScript depended on **browser APIs** (like `document`, `window`, `alert`) to do anything useful.
So it **couldn’t run outside** a browser — there were no file systems, no network sockets, no OS access.

---

### ⚡ The Solution — Node.js

* **Created by:** *Ryan Dahl* in **2009*.
* **Idea:** Use Google’s **V8** JavaScript engine (from Chrome) but **run it on the server**, not in the browser.
* **Replaced browser APIs** with:

  * `fs` (File System)
  * `http`, `net`, `os`
  * `process`, `Buffer`, etc.
    These provide access to system-level features missing in browsers.

---

### 🧩 How Node.js Recreates the Environment

| Browser Component | Node.js Equivalent                          |
| ----------------- | ------------------------------------------- |
| DOM / window      | ❌ (Not needed)                              |
| Event Loop        | ✅ via **libuv** (C++ library for async I/O) |
| Web APIs          | ✅ Node Core Modules (fs, net, http)         |
| Engine            | ✅ V8                                        |
| Modules           | ✅ CommonJS / ES Modules                     |

---

### 🔄 Summary Flow

**JS code → Node runtime → V8 engine → libuv (handles async I/O + event loop) → OS.**

