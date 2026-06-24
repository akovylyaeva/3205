# URL Checker Service

A web application for asynchronous URL availability checking

## Tech Stack

### Backend

* Node.js
* TypeScript
* Express
* In-memory storage

### Frontend

* React
* TypeScript
* Zustand
* Vite

## Features

* Create URL checking jobs
* Asynchronous URL processing
* HTTP HEAD requests
* Random delay (0–10 seconds)
* Maximum 5 concurrent requests per job
* Job cancellation
* Job status tracking
* Real-time updates via polling

## Local run

### Backend

```bash
npm i
npm run dev
```

Backend runs on: `http://localhost:3000`

### Frontend

```bash
cd frontend
npm i
npm run dev
```

Frontend runs on `http://localhost:5173`

## Docker

```bash
docker compose up --build
```