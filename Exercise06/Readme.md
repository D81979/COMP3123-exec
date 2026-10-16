# COMP3123 Exercise 06 — Notes CRUD API

Completed using the professor's starter `week06-mongodb-notes-app.zip`. Built with Node.js, Express, Mongoose and MongoDB.

## Features

- CRUD routes: POST `/notes`, GET `/notes`, GET `/notes/:noteId`, PUT `/notes/:noteId`, DELETE `/notes/:noteId`.
- Validates note content and MongoDB IDs; returns 400, 404, or 500 where appropriate.
- Supports `noteTitle`, `noteDescription`, `priority` (`HIGH`, `MEDIUM`, `LOW`), `dateAdded` and `dateUpdated`.
- All API requests use JSON. POST and PUT expect a `content` object.
- `.env` is excluded from GitHub and the ZIP.

## Run locally

1. Install **Node.js 22+** and open the `Exercise06` folder in VS Code.
2. Run `npm install` in that folder (the folder containing `package.json`).
3. Create `.env` based on `.env.example` **OR keep your existing working `.env`**. In your case, set `PORT=5050` because port `8081` is already occupied by Mongo Express. Keep your existing MongoDB Atlas `DB_URL` unchanged.
4. Run `npm start` and keep the server terminal open.
5. Open `http://localhost:5050/` to see the welcome page.
6. In Postman, import `COMP3123-Exec06-Postman.json`. Run tests **01 through 08 in order**. The first POST request saves the new MongoDB `_id` automatically for the ID-based requests.

Sample private `.env` contents (replace the DB_URL with your own existing Atlas connection):

```dotenv
PORT=5050
DB_URL=mongodb://127.0.0.1:27017/week06_notes
```

**Never commit your actual `.env` file, database password, or `node_modules`.**

## Routes and expected results

| Request | URL | Expected status |
|---|---|---|
| POST | `/notes` | 201 Created |
| GET | `/notes` | 200 OK |
| GET | `/notes/:noteId` | 200 OK / 404 missing |
| PUT | `/notes/:noteId` | 200 OK / 404 missing |
| DELETE | `/notes/:noteId` | 200 OK / 404 missing |
| GET invalid ID | `/notes/invalid-id` | 400 Bad Request |

Example body for POST or PUT (select Body → raw → JSON):

```json
{
  "content": {
    "noteTitle": "My First Note",
    "noteDescription": "Learning Node and MongoDB",
    "priority": "HIGH",
    "dateAdded": "14/Oct/2026",
    "dateUpdated": "14/Oct/2026"
  }
}
```

GET and DELETE need **no request body**. A successful empty GET all returns `[]`.

## Lab evidence and submission

- Save screenshots for POST, GET all, GET by ID, PUT and DELETE showing URL, method, response and HTTP status.
- Save one additional screenshot for 400 (invalid ID or missing content) or 404, if requested.
- Create a GitHub repository named `101581979_COMP3123-exec06` (confirm the required student-ID format with your professor). Upload the Exercise06 project files **except** `.env` and `node_modules`.
- Submit the source ZIP `101581979-COMP3123-exec06.zip` plus Postman screenshots and GitHub link.
- Docker/Vercel hosting is optional and not needed for this exercise.

## What was fixed

- Registered `NoteRoutes` in `server.js` to fix `Cannot GET /notes`.
- Corrected the broken model import and implemented the five missing CRUD handlers.
- Removed incorrect GET/DELETE body validation.
- Set the default server port and Postman collection to `5050` to avoid Mongo Express on `8081`.
- Removed deprecated MongoDB driver connection options and corrected the port log.
- Added a working npm start script, schema validation, and safe environment-variable setup.
