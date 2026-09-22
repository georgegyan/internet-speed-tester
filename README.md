# Internet Speed Tester

A simple internet speed testing API built with Node.js and Express.

## Project Structure

```text
backend/
	src/
		app.js
		server.js
		controllers/
			test.controller.js
		routes/
			test.routes.js
```

## Getting Started

### Requirements

- Node.js
- pnpm

### Install dependencies

```bash
cd backend
pnpm install
```

### Run the server

For development:

```bash
pnpm dev
```

For production:

```bash
pnpm start
```

The API runs at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Returns a basic API status message |
| GET | `/api/test/ping` | Measures server response latency |
| GET | `/api/test/download?size=10` | Downloads a test file in megabytes |
| POST | `/api/test/upload` | Receives an upload and calculates upload speed |

The `size` query parameter for the download endpoint is optional and defaults to `10` MB.

## Current Status

The project currently contains the initial backend API. Upload testing is implemented in the controller and will be completed as the project develops.
