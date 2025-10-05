## ⚙️ What Is **Strict Mode** in JavaScript?

**Strict mode** is a special mode that makes JavaScript behave in a **safer, cleaner, and more predictable** way.

You can enable it manually with:

```js
'use strict';
```

or automatically (it’s **on by default** in modules — like `type="module"`).

---

### 🧠 Why It Exists

JavaScript’s early design was very lenient — it allowed silent mistakes that could lead to bugs.
Strict mode helps catch those mistakes early by enforcing better rules.

---

### 🚫 What Strict Mode Changes

| Behavior                         | Without Strict Mode               | With Strict Mode                      |
| -------------------------------- | --------------------------------- | ------------------------------------- |
| **Undeclared variables**         | Allowed (creates global variable) | ❌ Throws an error                     |
| **Duplicate parameter names**    | Allowed                           | ❌ Error                               |
| **`this` in functions**          | Refers to `window`                | ❌ `undefined` unless explicitly bound |
| **Silent errors**                | Ignored                           | ❌ Throws exceptions                   |
| **Deleting variables/functions** | Allowed                           | ❌ Error                               |
| **Reserved keywords**            | May be used accidentally          | ❌ Protected for future JS features    |

---

### 🧩 Example

```js
// Without strict mode
x = 10;        // Creates a global variable (bug!)
console.log(x); // 10

// With strict mode
'use strict';
y = 20; // ❌ ReferenceError: y is not defined
```

---

### 💡 Why It Matters for Modules

All **ES modules (`type="module"`)** automatically run in **strict mode** —
you don’t need to write `"use strict"` yourself.

That means:

* You can’t create accidental globals.
* Errors are caught early.
* Your code behaves consistently across browsers.

---

### 🧠 In short

> **Strict mode = “No more silent bugs.”**
> It enforces clean, intentional JavaScript — and that’s why all modern code (including modules) uses it by default.
