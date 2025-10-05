Excellent, Mehedi — this is the **foundation of how JavaScript actually runs code** internally.
Before understanding async behavior, closures, or scope, you must fully grasp **Execution Context** — the “environment” in which JavaScript code is evaluated and executed.

Let’s go **step-by-step**, from the conceptual overview to how the **call stack**, **scope**, and **lexical environments** work together inside the **JavaScript engine**.

---

# ⚙️ What Is an Execution Context?

An **Execution Context (EC)** is an **internal container or environment** where a piece of JavaScript code is executed.
It defines **how variables, functions, and `this`** behave for that specific block of code.

Every time JavaScript runs something — like a script or a function — it **creates a new execution context**.

---

# 🧠 Three Types of Execution Context

| Type                                    | Description                                                 |
| --------------------------------------- | ----------------------------------------------------------- |
| **1. Global Execution Context (GEC)**   | Created once per program; represents the global scope.      |
| **2. Function Execution Context (FEC)** | Created for each function call.                             |
| **3. Eval Execution Context**           | Created when using `eval()` (rarely used, not recommended). |

---

## 🧩 1️⃣ Global Execution Context (GEC)

When you open a JS file or run a script, the engine automatically creates the **global execution context**.

It:

* Creates the **global object**

  * In browser: `window`
  * In Node.js: `global`
* Creates a special `this` binding that points to the global object.
* Sets up **memory for global variables and functions**.

**Example:**

```js
var name = "Mehedi";

function greet() {
  console.log("Hello " + name);
}
```

Here:

* The GEC is created.
* Memory is allocated for `name` and `greet`.
* Then the code is executed line by line.

---

## 🧩 2️⃣ Function Execution Context (FEC)

Every time a function is **called**, a new execution context is created **for that function only**.

Each FEC has its own:

* **Variable Environment** (local variables, parameters)
* **Lexical Environment** (scope chain, outer references)
* **`this` binding**

**Example:**

```js
var name = "Mehedi";

function greet() {
  var message = "Hello " + name;
  console.log(message);
}

greet();
```

### Flow:

1. Global Execution Context created for the entire file.
2. When `greet()` is called:

   * A new Function Execution Context is created.
   * Inside it, a local variable `message` and parameter space are created.
   * After completion, this context is **popped off the call stack**.

---

# 🧱 Structure of an Execution Context

Each Execution Context has **two main phases** and **three key components**.

---

## 🔹 Phases

1. **Creation Phase** (Memory allocation)
2. **Execution Phase** (Code runs line by line)

---

## 🔹 Components

| Component                   | Description                                        |
| --------------------------- | -------------------------------------------------- |
| **1. Variable Environment** | Stores variables and function declarations.        |
| **2. Lexical Environment**  | Stores identifiers and references to outer scopes. |
| **3. `this` Binding**       | Determines the value of `this` in the context.     |

---

## 🧭 1. Creation Phase

Before executing code, the JS engine scans it and allocates memory.

During this phase:

* Variables are initialized to `undefined`.
* Functions are stored entirely in memory.
* The `this` keyword is bound.

**Example:**

```js
console.log(a);
var a = 5;
function test() {}
```

**Creation Phase:**

```
a: undefined
test: function reference
this: global object (window/global)
```

**Execution Phase:**

```
a = 5
```

✅ This is why `var` is hoisted but initialized to `undefined`.

---

## 🧭 2. Execution Phase

Now the code executes line-by-line:

* Variable assignments happen.
* Functions are invoked (creating new execution contexts).
* The call stack grows and shrinks dynamically.

---

# 🧩 Call Stack (Execution Context Stack)

All execution contexts are managed using the **Call Stack** (also known as the **Execution Stack**).

### Behavior:

* When the JS engine starts → GEC is pushed onto the stack.
* When a function is invoked → new FEC pushed on top.
* When function returns → FEC popped off.

**Example:**

```js
function one() {
  console.log("One");
  two();
}
function two() {
  console.log("Two");
}
one();
```

**Stack flow:**

```
1️⃣ GEC created → pushed
2️⃣ one() called → FEC(one) pushed
3️⃣ two() called → FEC(two) pushed
4️⃣ two() completes → popped
5️⃣ one() completes → popped
6️⃣ stack empty → program ends
```

---

# 🧠 Inside a Function Execution Context

Let’s look at what’s inside a typical FEC:

```js
function add(x, y) {
  let sum = x + y;
  return sum;
}

add(2, 3);
```

**Function Execution Context:**

```
{
  Variable Environment: {
    x: 2,
    y: 3,
    sum: undefined
  },
  Lexical Environment: {
    outer: Global Environment
  },
  this: undefined (or global object in non-strict mode)
}
```

---

# 🔍 Lexical Environment (Detailed)

A **Lexical Environment (LE)** is where **variable identifiers** and **references** are stored.
It also contains a reference to its **outer (parent) environment** — this forms the **scope chain**.

### Structure:

```
Lexical Environment = {
  Environment Record: { local variables },
  Outer Environment Reference: pointer to parent LE
}
```

---

### Example:

```js
let a = 10;
function outer() {
  let b = 20;
  function inner() {
    let c = 30;
    console.log(a + b + c);
  }
  inner();
}
outer();
```

**Lexical Chain:**

```
inner() → outer() → global
```

**When `inner()` runs:**

* It first looks for `a`, `b`, `c` in its own environment.
* If not found, it looks “outward” (lexically), not at runtime order.

✅ This is what enables **closures** — inner functions remember their outer variables even after the outer function finishes.

---

# 🧩 `this` Binding in Execution Context

| Context                        | Value of `this`                                       |
| ------------------------------ | ----------------------------------------------------- |
| Global Context                 | Global object (`window` in browser, `global` in Node) |
| Function Context (non-strict)  | Global object                                         |
| Function Context (strict mode) | `undefined`                                           |
| Inside an Object Method        | That object                                           |
| Inside a Class Constructor     | The instance being created                            |

**Example:**

```js
function show() {
  console.log(this);
}
show(); // → window (in browser)
```

**Strict mode:**

```js
"use strict";
function show() {
  console.log(this);
}
show(); // → undefined
```

---

# 🧠 Summary Visualization

```
┌───────────────────────────┐
│       Call Stack          │
│ ┌───────────────────────┐ │
│ │ Function Context (FEC)│ │
│ └───────────────────────┘ │
│ ┌───────────────────────┐ │
│ │ Global Context (GEC)  │ │
│ └───────────────────────┘ │
└───────────────────────────┘

Each Context has:
 - Variable Environment
 - Lexical Environment
 - this Binding
```

---

# ⚡ Summary Table

| Type                  | Created When        | Contains                          | Scope Reference   |
| --------------------- | ------------------- | --------------------------------- | ----------------- |
| **Global EC**         | JS starts executing | Global vars & functions           | None (top-level)  |
| **Function EC**       | Function called     | Parameters, local vars            | Outer environment |
| **Eval EC**           | eval() called       | Temporary eval vars               | Parent scope      |
| **Each Context Has:** |                     | Variable Env, Lexical Env, `this` | ✅                 |

---

# 🧭 In Simple Terms

* **Execution Context** = The “box” where your code runs.
* **Global Context** = The base box (entire program).
* **Function Context** = New box created per function call.
* **Lexical Environment** = Variables + link to outer box.
* **Call Stack** = Stack of these boxes → JS runs top to bottom.
* **`this`** = The object that owns the current execution.

---

Would you like me to explain **how execution context links to closures and scope chains**, showing how variables from outer contexts are preserved even after a function returns?
That’s the next step that completes this concept perfectly.
