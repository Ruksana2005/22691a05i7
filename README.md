
# 🔗 URL Shortener

A full-stack URL shortening service built with Node.js, Express, and React. This application allows users to create short, shareable links for long URLs, track click activity, and set expiration times.

## 📁 Project Structure

```
project/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UrlForm.jsx
│   │   │   └── UrlTable.jsx
│   │   └── App.jsx
│   └── public/
│       └── index.html
├── server/                  # Express backend
│   ├── routes/
│   │   ├── shorten.js
│   │   └── redirect.js
│   ├── models/
│   │   └── Url.js
│   ├── db.js
│   └── server.js
├── package.json
└── README.md
```

## 🚀 Features

- Generate short links for long URLs
- Custom short codes (optional)
- Expiration time setting for links
- Redirect and track clicks
- View click statistics (time, source, location simulated)
- Persistent storage using MongoDB

## 🛠️ Tech Stack

- Frontend: React, Axios
- Backend: Node.js, Express.js
- Database: MongoDB (or SQLite for dev)
- Styling: Plain CSS / TailwindCSS (optional)

## 🧪 How to Run

### Backend

1. Clone the repo:
    ```bash
    git clone https://github.com/yourname/url-shortener.git
    cd url-shortener/server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start server:
    ```bash
    node server.js
    ```

> Make sure MongoDB is running locally or update the connection string in `db.js`.

### Frontend

1. Navigate to the client directory:
    ```bash
    cd ../client
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm start
    ```

## 📦 API Endpoints

### POST `/shorten`
- Request: `{ longUrl, validity, customCode }`
- Response: `{ shortUrl }`

### GET `/:id`
- Redirects to the original URL if it exists and is not expired.

### GET `/:id/stats` (optional)
- Returns click history and metadata.

## 📄 License

MIT License. Free for personal and commercial use.

---

© 2025 URL Shortener Project
