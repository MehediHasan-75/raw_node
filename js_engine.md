# ⚙️ What Is a JavaScript Engine?

A **JavaScript engine** is a **program** (or subsystem inside the browser) that **reads, compiles, and executes JavaScript code**.

It is designed to:

1. Parse and understand JS source code.
2. Optimize it for fast execution.
3. Manage memory and garbage collection.
4. Communicate with the **browser engine** and **rendering engine** to update the DOM, CSSOM, or trigger visual changes.

---

# 🌍 Popular JavaScript Engines

| Browser                           | JavaScript Engine          | Language Written In | Key Features                                    |
| --------------------------------- | -------------------------- | ------------------- | ----------------------------------------------- |
| **Chrome / Edge / Opera / Brave** | **V8**                     | C++                 | Just-In-Time (JIT) compiler, TurboFan optimizer |
| **Firefox**                       | **SpiderMonkey**           | C++ / Rust          | First JS engine ever built, advanced JIT        |
| **Safari**                        | **JavaScriptCore (Nitro)** | C++                 | Multi-tier JIT (baseline, DFG, FTL)             |
| **Old Edge / IE**                 | **Chakra**                 | C++                 | Now open-source as ChakraCore                   |
| **Node.js**                       | **V8**                     | C++                 | Same as Chrome, embedded for backend JS         |

---

# 🧩 JavaScript Engine Architecture (Internal Components)

Every modern JS engine consists of several tightly connected subsystems:

```
Source Code
   ↓
Parser → AST → Interpreter → JIT Compiler → Machine Code → Execution
```

Let’s break down each part in detail 👇

---

## 1. **Parser (Syntax Analyzer)**

### 🔹 Function:

* Converts JavaScript **source code (plain text)** into an **Abstract Syntax Tree (AST)**.
* The AST represents the **syntactic structure** of the code.

### 🔹 Process:

1. **Lexical Analysis (Tokenization)**

   * Breaks source code into tokens: keywords, identifiers, symbols.
   * Example:

     ```js
     let x = 5;
     ```

     → Tokens: `let`, `x`, `=`, `5`, `;`

2. **Parsing (Grammar Analysis)**

   * Verifies syntax and builds the **AST**.
   * Example AST:

     ```
     VariableDeclaration
     ├── Identifier: x
     └── Literal: 5
     ```

If syntax errors are found (e.g., missing semicolon), parsing halts immediately.

---

## 2. **Abstract Syntax Tree (AST)**

* Internal **tree-like representation** of JS code.
* Each node corresponds to a syntactic construct (variable, function, loop, etc.).
* Example:

  ```js
  function greet(name) {
    return "Hello " + name;
  }
  ```

  → AST:

  ```
  FunctionDeclaration
  ├── Identifier: greet
  └── BlockStatement
      └── ReturnStatement
          └── BinaryExpression (+)
              ├── Literal: "Hello "
              └── Identifier: name
  ```

The AST is crucial for further stages (optimization and execution).

---

## 3. **Interpreter (Bytecode Generator)**

### 🔹 Role:

* Translates the AST into **bytecode** — a lower-level, portable representation.
* Executes this bytecode **immediately** for fast startup.

Example:

```js
let a = 3 + 4;
```

→ Bytecode (simplified):

```
LoadConst 3
LoadConst 4
Add
Store a
```

### 🔹 V8 Example:

V8 used to use an interpreter called **Ignition**.
It quickly interprets JS into bytecode before optimization.

---

## 4. **JIT Compiler (Just-In-Time Compiler)**

### 🔹 Purpose:

To **convert hot (frequently executed)** parts of the bytecode into **machine code** for speed.

### 🔹 Process:

1. Interpreter runs JS initially.
2. The engine monitors which functions or loops are executed repeatedly.
3. These “hot” sections are handed to the **JIT compiler**.
4. The JIT compiles them into **optimized native machine code** for the CPU.
5. Execution switches to the compiled code for better performance.

### 🔹 Example Engines:

| Engine             | JIT Component        | Description                                               |
| ------------------ | -------------------- | --------------------------------------------------------- |
| **V8**             | TurboFan             | Advanced optimizer that generates high-speed machine code |
| **SpiderMonkey**   | IonMonkey + Baseline | Two-tier JIT for warm and hot code                        |
| **JavaScriptCore** | DFG + FTL JIT        | Multi-layer optimization pipeline                         |

---

## 5. **Profiler and Deoptimizer**

* The JIT collects **runtime type information** (e.g., variable types, function call frequency).
* If assumptions become invalid (like a variable changing type), the JIT **deoptimizes** back to bytecode.
* This dynamic behavior allows JS engines to stay both *fast* and *flexible*.

---

## 6. **Garbage Collector (Memory Manager)**

### 🔹 Purpose:

Automatically manage memory by reclaiming space no longer used.

### 🔹 Process:

* JS uses **automatic garbage collection** via **mark-and-sweep**:

  1. **Mark phase:** Engine marks all objects reachable from roots (like the global object or current scope).
  2. **Sweep phase:** Removes unreferenced (unreachable) objects.

### 🔹 Example:

```js
function run() {
  let obj = { name: "Mehedi" };
}
run();
// After function exits, obj is no longer reachable → garbage collected
```

---

## 7. **Heap and Stack Memory**

| Memory Area | Used For                        | Example              |
| ----------- | ------------------------------- | -------------------- |
| **Stack**   | Function calls, local variables | `let x = 10;`        |
| **Heap**    | Objects, arrays, closures       | `{ name: "Mehedi" }` |

When the stack unwinds, variables go out of scope, but heap objects persist until GC cleans them up.

---

## 8. **Execution Context and Call Stack**

Every JS execution happens inside an **execution context**, which contains:

* Variable environment
* Lexical environment (scope)
* `this` binding

These contexts are stored in the **call stack**:

```
Global Context
 ├── Function A()
 │     └── Function B()
```

The stack grows and shrinks as functions are called and returned.

---

# 🧠 JavaScript Engine Pipeline Summary

```
JavaScript Source Code
   ↓
Lexical Analysis → Tokens
   ↓
Parser → AST
   ↓
Interpreter → Bytecode
   ↓
JIT Compiler → Machine Code
   ↓
Execution → Memory Management
```

---

# 🔥 Optimizations in Modern JS Engines

1. **Hidden Classes & Inline Caches**

   * Speeds up property access by predicting object structure.

2. **Speculative Optimization**

   * Assumes variable types (e.g., all numbers) and recompiles if type changes.

3. **Lazy Parsing**

   * Only parses functions when they are needed, reducing load time.

4. **Concurrent Garbage Collection**

   * GC runs in parallel with execution to reduce pauses.

5. **WebAssembly Integration**

   * Executes precompiled binary code alongside JS for performance-critical tasks.

6. **Multi-threaded Compilation**

   * Compiles code in parallel to reduce latency.

---

# 💡 Example: How the JS Engine Interacts with the Browser

```
User clicks button
 ↓
Browser Engine → JS Engine executes onClick() handler
 ↓
Function modifies DOM (via Rendering Engine)
 ↓
Rendering Engine updates Render Tree → Layout → Paint
 ↓
User sees updated content
```

---

# 🧱 Summary Table

| Stage | Component         | Purpose                                 |
| ----- | ----------------- | --------------------------------------- |
| 1     | Parser            | Converts JS → AST                       |
| 2     | Interpreter       | Runs bytecode for fast startup          |
| 3     | JIT Compiler      | Compiles hot code → native machine code |
| 4     | Profiler          | Tracks execution for optimization       |
| 5     | Garbage Collector | Manages memory automatically            |
| 6     | Call Stack        | Manages function execution order        |

---

# 🧩 In Simple Terms

| Engine                | Role                                   |
| --------------------- | -------------------------------------- |
| **Rendering Engine**  | Draws the web page                     |
| **Browser Engine**    | Coordinates subsystems                 |
| **JavaScript Engine** | Executes logic, controls interactivity |
