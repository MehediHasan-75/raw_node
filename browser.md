# 🧭 **Browser Overview**

**Browser:** Software that lets you access and view information on the World Wide Web.

---

## 🧩 **Main Structure of a Browser**

### 1. **User Interface (UI)**

Displays page contents and interacts with the user.

* Takes user input (like URLs, clicks, form data).
* Sends commands (like typing a URL or clicking a link) to the **Browser Engine**.

---

### 2. **Browser Engine**

Acts as the communication bridge between the UI and the core components (Rendering Engine and JS Engine).

* Instructs the Rendering Engine **what and when to render**.
* Handles communication between user actions (like clicking a link) and web content.
* Computes CSS units (e.g., converting `10px` to device pixels).
* Manages tabs, navigation stack, back-forward cache, timers, and user interactions.

📘 **Examples:**

* **Blink** (Chrome, Edge, Opera)
* **WebKit** (Safari)
* **Gecko** (Firefox)

---

### 3. **Rendering Engine**

Responsible for visual output — converts web code (HTML, CSS, JS) into pixels you see.

**Steps inside rendering:**

1. **Parse HTML** → Build **DOM Tree**
2. **Parse CSS** → Build **CSSOM Tree**
3. Combine → **Render Tree**
4. **Layout** → Compute positions and sizes
5. **Reflow** – Recalculate layout (triggered by DOM/CSS changes)
6. **Painting** → Draw pixels on screen
7. **Repaint** – Redraw pixels without re-layout (e.g., color change)

---

### 4. **Networking Layer**

Handles all **communication** with servers:

* Sends **HTTP/HTTPS requests**
* Manages DNS lookup, TCP handshake, SSL/TLS encryption
* Receives and decodes responses
* Downloads resources (HTML, CSS, JS, images, etc.)
* Handles redirects, compression (gzip/br), and caching
* Manages **cookies**, **cache**, and **security (SSL/TLS)**

**Timers and Performance:**

* Measures network latency
* Implements keep-alive and connection pooling
* Uses service workers and HTTP cache to reduce network calls

---

### 5. **JavaScript Engine**

Executes **JavaScript code** embedded in web pages.

**Core Features:**

* Parses and compiles JS into bytecode or machine code
* Performs Just-In-Time (JIT) compilation for speed
* Optimizes frequently executed code
* Handles the **event loop**, callbacks, promises, and async/await

**Event Loop and Timers:**

* **Call Stack:** Executes functions in order
* **Event Queue:** Stores asynchronous tasks
* **Timers:**

  * `setTimeout(fn, delay)` → Single callback
  * `setInterval(fn, delay)` → Repeated execution
* **Microtasks** (Promises, MutationObservers) run before the next macro task

📘 **Examples:**

* **V8** → Chrome, Edge, Opera
* **SpiderMonkey** → Firefox
* **JavaScriptCore** → Safari

These engines **compile JS to machine code** for faster performance.

---

### 6. **UI Backend**

Responsible for drawing basic widgets like address bar, back button, tab and windows using **OS-level libraries** (e.g., Windows UI APIs, macOS Cocoa).

**In short:**

* The **UI Backend** paints the **browser’s outer shell**.
* The **Rendering Engine** paints the **web page inside** it.

---

### 7. **Data Storage**

Browsers store various kinds of data locally:

* **Cookies**
* **Cache**
* **LocalStorage / SessionStorage**
* **IndexedDB**
* **Bookmarks / History**

---

## 🧠 **Simplified Diagram**

```
+-----------------------------------+
|           User Interface          |
+-----------------+-----------------+
|    Browser Engine (Controller)    |
+-----------------+-----------------+
| Rendering Engine|JavaScript Engine|
+-----------------+-----------------+
|    Networking   |   UI Backend    |
+-----------------+-----------------+
|        Data Persistence (Storage) |
+-----------------------------------+
```

### 🪄 In Simple Analogy

Think of your browser like a **restaurant**:

* **You (user)**: Place an order (type a URL).
* **Browser engine**: The **supplier** who takes your order and coordinates everything.
* **Rendering engine**: The **chef** who prepares the meal (draws the webpage).
* **JavaScript engine**: The **assistant chef** who handles dynamic tasks (scripts).
* **Network module**: The **waiter** bringing ingredients (files) from the web.
