## How to Create an Initial Node.js Server
### dependencies -> configuration and scaffolding -> Create the server -> Handle requests and responses(extract req data's and send response) -> start the server
### 1. **Set up dependencies**

Use built-in Node.js modules:

* `http` → create the server
* `url` → parse the request URL
* `string_decoder` → decode incoming request data

```js
// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
```

---

### 2. **App configuration and scaffolding**

```js
// App object
const app = {};

// Configuration
app.config = {
  port: 3000,
};
```

---

### 3. **Create the server**

```js
// Create and start server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(app.config.port, () => {
    console.log(`Server listening on port ${app.config.port}`);
  });
};
```

> `http.createServer()` creates an HTTP server that listens for requests and executes the handler function (`handleReqRes`).

---

### 4. **Handle requests and responses**

```js
// Handle request and response
app.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const query = parsedUrl.query;
  const headers = req.headers;

  const decoder = new StringDecoder('utf-8');
  let body = '';

  // Collect request body data
  req.on('data', (buffer) => {
    body += decoder.write(buffer);
  });

  req.on('end', () => {
    body += decoder.end();
    console.log('Request received:', { path, method, query, headers, body });

    // Send response
    res.end('Hello world');
  });
};
```

---

### 5. **Start the server**

```js
app.createServer();
```

---

### 🔁 **Request-Response Flow**

```
Client (Browser/Postman)
   ↓
HTTP Request  →  req object (url, method, headers, data)
   ↓
Server Logic  →  handle request and process data
   ↓
HTTP Response →  res.end("Hello world")
   ↓
Client receives response
```

---

✅ **Run:**

```bash
node index.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser — you’ll see `Hello world`.
