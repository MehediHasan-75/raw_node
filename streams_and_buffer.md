### Buffers in Node.js

A **buffer** is a temporary storage area for raw binary data. It is a part of the stream's flow (like drops of water in a waterfall). When data is read in chunks through a stream, each chunk is stored in a buffer. Similarly, when writing data to a stream, buffers are used to hold the data before sending it.

### Streams in Node.js

**Streams** are a flow of data piece by piece (like a waterfall's stream). This is especially useful when you don’t want to load everything into memory at once.

A stream can be represented as `buffer1 + buffer2 + ...` where the full data comes together. Data received or watched can be thought of as `buffer1` and `buffer2`.

| Stream | --> Part1 --> | Part2 --> Part3 | (Let's say part 2 and part 3 form a buffer) --> Full data. In Node.js, you cannot work directly with parts; instead, buffers or chunks are received and worked on once they are complete.

There are **four types of streams** in Node.js:

1. **Readable Streams** – For reading data. Examples: `fs.createReadStream`, `http.IncomingMessage`.

```js
const fs = require('fs');
/*
Create a readable stream with `fs.createReadStream`, which efficiently reads the file in chunks and emits the 'data' event whenever new data is available for processing (when the buffer is filled).
*/
const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

/*
This event handler listens for `data` events emitted by `ourReadStream` when a chunk is ready. Here, a chunk is raw data (in bytes).
*/

ourReadStream.on('data', (chunk) => {
  console.log(chunk.toString());
});

console.log('hello');
```

2. **Writable Streams** – For writing data. Examples: `fs.createWriteStream`, `http.ServerResponse`.

```js
const http = require('http');

/*
In this example, `req` is a readable stream, and `res` is a writable stream. 
When the root URL ('/') is accessed, the server sends an HTML form to the client.
*/
const server = http.createServer((req, res) => {
  if (req.url == '/') {
    res.write('<html><head><title>Form</title></head>');
    res.write('<body><form method="post" action="/process"><input name="message" /></form></body>'); 
    res.end(); // Form submission redirects to /process, sending data via POST

  } else if (req.url == '/process' && req.method == 'POST') {
    // Reading data from the request stream (req)
    console.log(req.data);
    res.write('This is the about us page');
    res.end();
  } else {
    res.write('Not Found');
    res.end();
  }
});

server.listen(3000);
```

**Problem**: `console.log(req.data)` will not show any data because the data is coming as a string. We need to listen to the `data` and `end` events on `req` to capture the data.

**Corrected code**:

```js
else if (req.url == '/process' && req.method == 'POST') {
  let body = '';
  
  req.on('data', (chunk) => {
    body += chunk;
  });
  
  req.on('end', () => {
    res.write('This is the about us page');
    res.end();
  });
}
```

3. **Duplex Streams** – These can be both readable and writable. Example: TCP sockets (`net.Socket`).
4. **Transform Streams** – A type of duplex stream that can modify the data as it's read or written. Example: `zlib.createGzip` for compression.

#### Common Stream Methods

* `.pipe()` – Connects a readable stream to a writable stream, allowing data to flow from one to the other.
* `.on()` – Event listener for stream events like `data`, `end`, and `error`.

**Example with `.pipe()`**:
For reading from one file and writing to another (copying data):

```js
const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

ourReadStream.on('data', (chunk) => {
  ourWriteStream.write(chunk);
});
```

But using `.pipe()` simplifies this process:

```js
const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

ourReadStream.pipe(ourWriteStream);
```

This approach automatically handles the data flow between the readable and writable streams, making the code cleaner and more efficient.
