# 🌐 Raw Node.js Uptime Monitoring API

A backend API built **from scratch using only Node.js core modules** (no Express or frameworks).
It provides **user authentication, token-based authorization**, and a **URL uptime monitoring system** with optional Twilio SMS alerts.

---

## 🚀 Features

* 🔐 **User Authentication (CRUD)**

  * Create, read, update, and delete users
  * Password hashing with `crypto`
  * Token-based authentication

* 🔑 **Token Management**

  * Generate and verify tokens for secure API access
  * Token auto-expiry and extension

* 📡 **Uptime Monitoring**

  * Users can create “checks” to monitor any HTTP/HTTPS URL
  * Worker process automatically checks uptime in the background
  * Alerts users via Twilio SMS if site status changes

* ⚙️ **Environment Support**

  * `staging` and `production` modes
  * Configurable port, secret keys, and Twilio credentials

* 🧠 **Raw Node Architecture**

  * Built without Express — using only `http`, `https`, and native Node APIs
  * Clean modular structure (`routes`, `handlers`, `helpers`, `lib`)

---

## 🗂️ Project Structure

```
📦 raw-node-uptime-api
├── index.js              # App entry – starts server & background workers
├── lib/
│   ├── server.js         # HTTP server setup
│   ├── workers.js        # Background uptime checker
│   ├── data.js           # File-based data storage (CRUD)
│   └── notifications.js  # Twilio SMS integration
├── handlers/
│   └── routeHandlers/
│       ├── userHandler.js   # User CRUD logic
│       ├── tokenHandler.js  # Authentication tokens
│       ├── checkHandler.js  # URL monitoring logic
│       └── sampleHandler.js # Sample/test route
├── helpers/
│   ├── environments.js   # Environment configuration
│   ├── utilities.js      # Hashing, random string, JSON parsing
│   └── handleReqRes.js   # Unified request/response handler
└── routes.js             # Route mapping
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/raw-node-uptime-api.git
cd raw-node-uptime-api
```

### 2️⃣ Configure environment

Edit `/helpers/environments.js` and add your **Twilio credentials**:

```js
twilio: {
  fromPhone: '+1234567890',
  accountSid: 'your_account_sid',
  authToken: 'your_auth_token',
}
```

### 3️⃣ Run the app

Start in **staging** (default):

```bash
node index.js
```

Start in **production**:

```bash
NODE_ENV=production node index.js
```

The server will start on port `3000` (staging) or `5001` (production).

---

## 📬 API Endpoints

### 👤 User Routes

| Method | Path                  | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/user`               | Create new user                |
| GET    | `/user?phone={phone}` | Get user info (requires token) |
| PUT    | `/user`               | Update user info               |
| DELETE | `/user?phone={phone}` | Delete user                    |

### 🔑 Token Routes

| Method | Path             | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/token`         | Generate new token  |
| GET    | `/token?id={id}` | Retrieve token info |
| PUT    | `/token`         | Extend token expiry |
| DELETE | `/token?id={id}` | Delete token        |

### 📡 Check Routes

| Method | Path             | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/check`         | Create new URL check |
| GET    | `/check?id={id}` | Get existing check   |
| PUT    | `/check`         | Update check info    |
| DELETE | `/check?id={id}` | Delete check         |

---

## 📦 Data Storage

This project uses **file-based storage** (like a mini database).
Each resource (user, token, check) is saved as a `.json` file inside the `.data/` directory.

Example:

```
.data/
 ├── users/
 ├── tokens/
 └── checks/
```

---

## 🧰 Technologies Used

* **Node.js Core Modules:** `http`, `https`, `fs`, `crypto`, `url`
* **Twilio API:** for SMS alerts
* **JSON File System:** for persistent data storage

---

## 🛠️ Future Improvements

* Add email notifications
* Implement rate limiting & validation middleware
* Migrate to MongoDB or PostgreSQL
* Add a frontend dashboard