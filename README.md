# LAB 5: MongoDB & Database Mastery

## Event Manager API with MongoDB and Mongoose

A professional REST API demonstrating MongoDB integration with Mongoose ODM.

## Features

- ✅ MongoDB connection management
- ✅ Mongoose schemas with validation
- ✅ Full CRUD operations
- ✅ Advanced queries (filtering, sorting, pagination)
- ✅ Database indexes for performance
- ✅ Aggregation pipelines
- ✅ Relationship management (one-to-many)
- ✅ Modular code architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- ES Modules

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB installed locally or MongoDB Atlas account

### Installation

```bash
# Clone the repository
git clone https://github.com/mohamedalibenchiekh/lab-5-mongodb
cd lab-5-mongodb

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
```

### Running the Application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Testing

```bash
# Test database connection
npm run test:db

# Test advanced queries
npm run test:queries
```

## API Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/events | Get all events (with filters) |
| GET | /api/v1/events/upcoming | Get upcoming events |
| GET | /api/v1/events/location/:location | Get events by location |
| GET | /api/v1/events/:id | Get event by ID |
| POST | /api/v1/events | Create new event |
| PUT | /api/v1/events/:id | Update event |
| DELETE | /api/v1/events/:id | Delete event |
| POST | /api/v1/events/:id/attend | Add attendee |
| DELETE | /api/v1/events/:id/attend | Remove attendee |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/users | Get all users |
| GET | /api/v1/users/:id | Get user by ID |
| GET | /api/v1/users/email/:email | Get user by email |
| GET | /api/v1/users/role/:role | Get users by role |
| POST | /api/v1/users | Create user |
| PUT | /api/v1/users/:id | Update user |
| DELETE | /api/v1/users/:id | Delete user |

## Query Parameters

### Events Filtering

- `status`: Filter by event status
- `location`: Filter by location (case-insensitive)
- `search`: Search in title and description
- `minCapacity`: Filter by minimum capacity
- `page`: Pagination page number
- `limit`: Items per page

## Database Schema

### Event Schema

```javascript
{
  title: String (required, min 3, max 100)
  description: String (max 1000)
  date: Date (required, future date)
  location: String (required, min 2, max 100)
  capacity: Number (required, min 1, max 10000)
  attendees: Number (default: 0)
  status: String (enum: upcoming, ongoing, completed, cancelled)
  organizer: ObjectId (ref: User)
  attendeeList: [ObjectId] (ref: User)
}
```

### User Schema

```javascript
{
  name: String (required, min 2, max 50)
  email: String (required, unique)
  role: String (enum: user, organizer, admin)
  eventsAttended: [ObjectId] (ref: Event)
  eventsOrganized: [ObjectId] (ref: Event)
}
```

## Project Structure

```
lab-5-mongodb/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── EventSchema.js
│   │   ├── UserSchema.js
│   │   └── index.js
│   ├── services/
│   │   ├── eventService.js
│   │   └── userService.js
│   ├── controllers/
│   │   ├── eventController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   ├── userRoutes.js
│   │   └── index.js
│   └── utils/
│       ├── apiResponse.js
│       └── validationService.js
├── server.js
├── test-db-connection.js
├── test-database-queries.js
├── package.json
└── .env
```

## Database Indexes

The following indexes are created for performance:

- `date: 1` - For sorting events by date
- `location: 1` - For location-based queries
- `status: 1` - For status filtering
- `organizer: 1` - For organizer lookups
- `createdAt: -1` - For sorting by creation date
- `title: "text", description: "text"` - For full-text search

## Deliverables Checklist

- [x] src/config/database.js - DB connection
- [x] src/models/EventSchema.js - Event schema
- [x] src/models/UserSchema.js - User schema
- [x] src/models/index.js - Models export
- [x] src/services/eventService.js - Event service
- [x] src/services/userService.js - User service
- [x] src/controllers/eventController.js - Updated
- [x] server.js - With DB connection
- [x] test-database-queries.js - Query tests
