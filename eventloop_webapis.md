# ⚙️ JavaScript’s Execution Model

JavaScript is **single-threaded**, meaning it can **only execute one task at a time** on the **main thread** — there’s only one *call stack*.

But JS can still handle **asynchronous tasks** (like fetching data, timers, and UI events) using the **Event Loop**, **Web APIs**, and **callback queues**.


# 🧠 The Key Players

There are **five** major components you need to understand:

```
1️⃣ Call Stack
2️⃣ Heap
3️⃣ Web APIs
4️⃣ Callback / Task Queue
5️⃣ Event Loop
```
---

## 🧩 1. Call Stack (Execution Context Stack)

* Managed by the **JavaScript Engine** (like V8).
* It’s where functions get **pushed (called)** and **popped (returned)**.
* Only one function executes at a time.

**Example:**

```js
function greet() {
  console.log("Hello");
}
greet();
```

Execution steps:

```
push greet() → execute → pop greet()
```

If the call stack is full (too many nested calls), you get a **Stack Overflow** error.

---

## 🧩 2. Heap

* Managed by the **JS Engine** for **memory allocation**.
* Objects, arrays, and closures are stored here dynamically.
* Used by the garbage collector for memory management.

---

## 🧩 3. Web APIs

### 🔹 What Are They?

**Web APIs** are **browser-provided features** (not part of the JavaScript language itself).

They run **outside the JS engine**, allowing **asynchronous operations**.

When you call something like:

* `setTimeout()`
* `fetch()`
* `addEventListener()`
* `XMLHttpRequest()`
* `DOM events`
* `Geolocation API`

These functions are handled by the **browser’s Web API environment**, not the JS engine.

---

### 🔹 Example

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside Timeout");
}, 2000);

console.log("End");
```

### 🔹 Step-by-Step Process:

1. `console.log("Start")` → executes immediately (stack).
2. `setTimeout()` → passed to **Web API**, timer runs in browser (not blocking JS).
3. `console.log("End")` → executes immediately.
4. After 2 seconds, Web API pushes callback to the **Callback Queue**.
5. **Event Loop** checks if the call stack is empty → then moves the callback from the queue → executes it.

**Output:**

```
Start
End
Inside Timeout
```

---

## 🧩 4. Callback / Task Queue (a.k.a. Macrotask Queue)

* Stores **callbacks** from asynchronous operations (timers, events, network responses, etc.).
* Waits until the **call stack is empty** before pushing a callback back for execution.
* Handled by the **Event Loop**.

Examples of **macrotasks**:

* `setTimeout`
* `setInterval`
* `I/O callbacks`
* `DOM events`

---

## 🧩 5. Event Loop

### 🔹 What It Does

The **Event Loop** is the “manager” that constantly checks:

> *“Is the call stack empty?”*

If yes, it moves tasks (callbacks, promises, etc.) from their queues into the call stack for execution.

### 🔹 The Loop Process (Simplified)

```
while (true) {
  if (callStack.isEmpty()) {
    eventLoop.moveNextTaskFromQueueToStack();
  }
}
```

It’s like a **traffic controller** between:

* JS engine (call stack)
* Web APIs
* Queues (task & microtask)

---

# ⚡ Microtasks vs Macrotasks

JavaScript has **two kinds of queues** that the event loop manages differently.

---

### 🧩 Microtask Queue

* Handles **promises**, **MutationObservers**, and **queueMicrotask()**.
* **Higher priority** than macrotasks.
* Executed **immediately after** the current call stack is empty — before any macrotasks.

**Examples:**

```js
Promise.resolve().then(() => console.log("Microtask"));
queueMicrotask(() => console.log("Also Microtask"));
```

---

### 🧩 Macrotask Queue

* Handles **setTimeout**, **setInterval**, **fetch callbacks**, **DOM events**, etc.
* Executed **after microtasks are done**.

---

### ⚖️ Execution Order Example

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

**Step-by-Step:**

1. `console.log("1")` → executes.
2. `setTimeout()` → goes to Web API, then callback to macrotask queue.
3. `Promise.then()` → goes to microtask queue.
4. `console.log("4")` → executes.
5. Call stack empty → Event loop checks microtask queue first → runs `"3"`.
6. Then macrotask queue → runs `"2"`.

**Output:**

```
1
4
3
2
```

---

# 🔁 Full Flow Diagram (Conceptually)

```
        ┌────────────────────────────┐
        │        JavaScript Engine   │
        │ ┌──────────────┐           │
        │ │  Call Stack  │◄──────────┐│
        │ └──────────────┘           ││
        └──────────┬─────────────────┘│
                   │                  │
                   ▼                  │
         ┌──────────────────┐         │
         │    Web APIs      │         │
         └──────────────────┘         │
                   │                  │
                   ▼                  │
       ┌──────────────────────┐       │
       │  Callback Queue      │◄──────┘
       └──────────────────────┘
                   │
                   ▼
           ┌────────────────┐
           │   Event Loop   │
           └────────────────┘
                   │
                   ▼
           ┌────────────────┐
           │  Call Stack    │
           └────────────────┘
```

---

# 🧱 Example: `fetch()` and Event Loop

```js
console.log("Start");

fetch("https://api.example.com")
  .then(() => console.log("Fetch done"));

console.log("End");
```

**Execution:**

1. `"Start"` → logged immediately.
2. `fetch()` → Web API handles the network request asynchronously.
3. `"End"` → logged immediately.
4. After fetch completes → `.then()` callback goes to **microtask queue**.
5. Event Loop executes the `.then()` callback next.

**Output:**

```
Start
End
Fetch done
```

---

# ⚙️ Summary of All Queues and Components

| Component           | Managed By | Handles                          | Priority |
| ------------------- | ---------- | -------------------------------- | -------- |
| **Call Stack**      | JS Engine  | Running current function         | —        |
| **Heap**            | JS Engine  | Memory (objects, closures)       | —        |
| **Web APIs**        | Browser    | Async tasks (timers, DOM, fetch) | —        |
| **Microtask Queue** | Event Loop | Promises, MutationObserver       | 🥇 High  |
| **Macrotask Queue** | Event Loop | setTimeout, I/O, events          | 🥈 Low   |
| **Event Loop**      | Browser    | Coordinates everything           | —        |

---

# 🧠 In Simple Terms

* The **JavaScript engine** executes one task at a time.
* The **Web APIs** handle async work like timers and network requests in the background.
* The **Event Loop** constantly checks the call stack.
* Once the stack is empty, it moves **microtasks** (like promises) first, then **macrotasks** (like timeouts) into execution.
* This makes JS **non-blocking** and **asynchronous**, even though it’s single-threaded.

---

# 🧩 Real-World Analogy

Think of:

* **Call Stack** → the Chef (can cook one dish at a time)
* **Web APIs** → Kitchen assistants (boil water, bake, fetch data)
* **Callback Queue** → Completed orders waiting to be served
* **Event Loop** → The Waiter, checking if the chef is free to serve next order
* **Microtasks** → VIP orders (promises) that always get served first
