In Node.js, the **global object** provides access to globally available variables and functions without needing imports. It solves the problem of the absence of the `window` object (common in browsers). Key features include:

### 1. **Global Variables/Functions**:

* **`global`**: Access or define global variables.

  ```javascript
  global.myVar = 100;
  console.log(myVar); // Output: 100
  ```
* **`globalThis`**: Standard way to refer to the global object across environments.

  ```javascript
  globalThis.myVar = 200;
  console.log(myVar); // Output: 200
  ```

### 2. **Built-in Objects**:

* **`process`**: Provides information about the current process.

  ```javascript
  console.log(process.version); // Output: Node.js version
  ```
* **`require()`**: Import modules.

  ```javascript
  const fs = require('fs');
  ```
* **`Buffer`**: Handle binary data.

  ```javascript
  const buffer = Buffer.from('Hello');
  console.log(buffer); // Output: <Buffer 48 65 6c 6c 6f>
  ```

### 3. **Global Constants**:

* **`NaN`, `Infinity`, `undefined`**:

  ```javascript
  console.log(NaN);        // Output: NaN
  console.log(Infinity);   // Output: Infinity
  console.log(undefined);  // Output: undefined
  ```

### 4. **Timer Functions**:

* **`setTimeout()` & `setInterval()`**: Delay or repeat code execution.

  ```javascript
  setTimeout(() => {
    console.log("Runs once after 2 seconds");
  }, 2000);

  setInterval(() => {
    console.log("Runs every 2 seconds");
  }, 2000);
  ```

### 5. **`console`**:

* Used for logging to the console.

  ```javascript
  console.log("Hello, World!");  // Output: Hello, World!
  console.error("This is an error!"); // Output: This is an error!
  ```
### Node.js Module System and Questions

#### 1. **Where Do `__dirname` and `__filename` Come From?**

In Node.js, **`__dirname`** and **`__filename`** are special variables automatically provided by the module system. They contain the absolute paths to the current module's directory and file, respectively. These are not part of the `global` object, but they are **implicitly available** in every module.

```javascript
console.log(__dirname);  // Output: Absolute path of current directory
console.log(__filename); // Output: Absolute path of current file
```

#### 2. **Why Don’t Variables Automatically Become Global Like in the Browser?**

In contrast to the browser's `window` object, **Node.js** does not automatically make variables global. Each module in Node.js has its own isolated scope. This prevents conflicts between different modules' variables, which would otherwise lead to unintended behavior.

#### 3. **Where Does the Output of `console.log(module)` Come From?**

The `module` object is automatically created for every file in Node.js. It contains metadata about the module, including **`exports`**, **`filename`**, and others. When you call `console.log(module)`, it outputs the details of the current module, including its `exports` object, which holds what the module is exporting.

#### 4. **How Node.js Solves the Global Scope Problem: IIFE (Immediately Invoked Function Expression)**

In vanilla JavaScript, variables in different scripts can overlap in the global scope, causing conflicts. For example:

```javascript
// test.js
var a = 7;

// test1.js
var b = 9;
console.log(a + b); // Output: 16
```

In an HTML file, if both scripts are included, the global scope is shared, and the result is `16` because the variables are not encapsulated.

Node.js solves this by wrapping each file/module in an **Immediately Invoked Function Expression (IIFE)**. This keeps variables isolated within their own scope, preventing conflicts.

```javascript
(function(exports, require, module, __filename, __dirname) {
  return module.exports;
});
```

#### 5. **Node.js Module Example**

In Node.js, when you `require` a module, its code is executed, and the module's **`exports`** object is returned. Here’s how you encapsulate a module:

```javascript
// people.js
var people = ["Mehedi", "XYZ"];
module.exports = { people };

// index.js
const people = require("./people");
console.log(people);  // Output: { people: ['Mehedi', 'XYZ'] }
```

You **manually export** data with `module.exports` to make it available for other files to use.

#### 6. **`exports` and `module.exports`**

The `exports` object is initialized as an empty object. To expose variables or functions from a module, you can assign them to `module.exports`.

Example:

```javascript
// people.js
var people = ["Mehedi", "XYZ"];
module.exports = { people };

// index.js
const people = require("./people");
console.log(people);  // Output: { people: ['Mehedi', 'XYZ'] }
```

By default, `exports` is empty, but when you assign values to `module.exports`, they are shared across files.

#### Conclusion

Node.js's module system uses **encapsulation** to ensure each file/module has its own isolated scope, avoiding global conflicts. The `require()` function is used to load modules, and **`module.exports`** controls what a module exposes.


But question is if we use* **`__dirname` & `__filename`**: Paths to the current module’s directory and file.

  ```javascript
  console.log(__dirname);  // Output: Absolute path of current directory
  console.log(__filename); // Output: Absolute path of current file
  ```
they are not included in global. where did they come?

and another question is veriable declare korar por window r moto globale e jacche na kno?


clonsole.log(module) korle module er oputut asche koi theke?

vanila js er porblem holo tara encapsulated na.  test.js e jodi a = 7 thake r test1.js e jodi b=9, console.log(a+b) thake. ekhon html file e <script src = 'test.js> and <sricpt src = 'test.js`> dile console . log er outpt asbe 16 karon first e prothom scirpt load hbe erpor second script a peye jabe. karon era encapsulated na. 
Node js solved this problem. node js e jokhon amra ek ekta file likhi seti ektu iffee er moddhe cole jay(funciton diye wrape hoye jay) (iffee holo ekta function jeta nijei nijeke call kore).

syntext

func(){exports, required, module __filename, __dirname){
return module.exports.
});

//so node er moduar sysem holo ekta file er content r ektay share heb na. every spaeret file in node js = node module.


lets people.js

var poeporle = ["mehedi", "xyz"]


index.js 

const people = require ("./people")


console.log(people) // array print hbe na karon return module.exports (encapsulation theke) requturn korche a empty object. amader manually module.exports e assing kore deya lagbe. karon people.js er duniya/score alada and amader bole deya agbe eita k require korle kon kon jinish er access onnno file pabe.


so people.js should be 

var poepole = ["mehedi", "xyz"] 

module.exports = {people}

exports er default value = {}
require = function jeta amra use kori onno module e use korar jonno. const people = require ("./people")
 dile iffe ta exicture hoy and module.exports er value return kore.

so answers to the questions. 

give anserws of previous question.

add intoroduction to core node modules.
