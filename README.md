# Lab 5 — Event Manager API (MongoDB + Mongoose)

A production-ready REST API for managing events and users, implemented with Express.js, MongoDB and Mongoose. This repository demonstrates clean project structure, schema validation, advanced querying, and sensible defaults for development and testing.

## Highlights

- Robust MongoDB connection handling with retry/timeout support
- Mongoose schemas with validation and indexes
- Full CRUD for Events and Users
- Filtering, sorting, pagination and text search for queries
- Aggregation examples and relationship handling (refs)
- Modular services, controllers and route organization
- Lightweight test scripts for DB connectivity and query correctness

## Tech Stack

- Node.js (ES Modules)
- Express
- MongoDB (local or Atlas)
- Mongoose

## Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or Atlas) and a connection URI

## Quickstart

1. Install dependencies

```bash
npm install
```

2. Create environment file

```bash
cp .env.example .env
# then edit .env to set MONGODB_URI (or whatever variable your config expects)
```

3. Run the app

```bash
# development (with nodemon if configured)
npm run dev

# production
npm start
```

4. Run lightweight tests

```bash
npm run test:db        # checks DB connection
npm run test:queries   # runs sample queries against DB
```

(If these scripts are not present in `package.json`, use `node test-db-connection.js` and `node test-database-queries.js`.)

## Environment

Provide a `.env` with at least the following (example names):

- `MONGODB_URI` — MongoDB connection string
- `PORT` — HTTP port (default 3000)

Adjust names to match `src/config/database.js` if different.

## API Overview

Base path: `/api/v1`

Events
- GET `/events` — list events (supports filters: `status`, `location`, `search`, `minCapacity`, `page`, `limit`)
- GET `/events/upcoming` — upcoming events
- GET `/events/location/:location` — events by location
- GET `/events/:id` — get event by ID
- POST `/events` — create event
- PUT `/events/:id` — update event
- DELETE `/events/:id` — delete event
- POST `/events/:id/attend` — add attendee to event
- DELETE `/events/:id/attend` — remove attendee from event

Users
- GET `/users` — list users
- GET `/users/:id` — get user by ID
- GET `/users/email/:email` — get user by email
- GET `/users/role/:role` — get users by role
- POST `/users` — create user
- PUT `/users/:id` — update user
- DELETE `/users/:id` — delete user

Note: Exact route paths are in `src/routes/`. Confirm route prefixes and adjust accordingly.

## Data Models (summary)

Event (fields of interest): `title`, `description`, `date`, `location`, `capacity`, `attendees`, `status`, `organizer` (ref), `attendeeList` (refs)

User (fields of interest): `name`, `email`, `role`, `eventsAttended` (refs), `eventsOrganized` (refs)

See `src/models/EventSchema.js` and `src/models/UserSchema.js` for full definitions and validations.

## Indexes & Performance

Common indexes (may already be created in schema files):
- `date` — sorting
- `location` — lookups
- `status` — filtering
- `organizer` — joins/lookup
- text index on `title` and `description` for search

## Project Layout

- `server.js` — application entry and Express setup
- `src/config/database.js` — DB connection and options
- `src/models/` — Mongoose schemas and model exports
- `src/services/` — business logic and DB access
- `src/controllers/` — request handlers and response shaping
- `src/routes/` — route definitions and mounting
- `src/utils/` — helpers (apiResponse, validation, etc.)
- `test-db-connection.js`, `test-database-queries.js` — small test scripts

## Docker / Compose

This repo includes `Dockerfile` and `docker-compose.yml`. Use them to run the app and a local MongoDB instance together. Adjust the compose file or Dockerfile as needed for production deployments.

## Contributing

- Follow existing code style (ES Modules, concise functions)
- Add tests for new query logic or schema changes
- Keep controllers thin: prefer adding logic to services

## Troubleshooting

- "Cannot connect to MongoDB": verify `MONGODB_URI` and network access, check `src/config/database.js` options
- Schema validation errors on create/update: validate payloads against rules in `src/models/*`


