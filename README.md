# Hotels App

A full-stack application to fetch and display hotel data from a MongoDB database, built with React (frontend) and Node.js/Express (backend).

**Frontend:** https://hotels-frontend-f82.vercel.app/

**Backend:** https://hotels-backend-f82.vercel.app/hotels

## Features

1. Fetch and display all hotel names from the database.
2. Fetch and display the full details of a specific hotel (e.g., "New Hotel 1") — including location, rating, and price range.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas), Mongoose
- **Deployment:** Vercel (both frontend and backend)

## Project Structure

```
hotels-app/
│
├── backend/
│   ├── api/
│   │   └── index.js            # Express app, routes, and server entry point
│   ├── db/
│   │   └── db.connect.js       # MongoDB connection setup
│   ├── models/
│   │   └── hotel.models.js     # Hotel Mongoose schema
│   ├── .env                    # Environment variable
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Allhotels.jsx    # Displays all hotel names
    │   │   └── Hotelbyname.jsx  # Displays details of one hotel
    │   ├── useFetch.js          # Custom hook for data fetching
    │   └── App.jsx              # Combines both components
    ├── package.json
    └── vite.config.js
```

## API Endpoints

| Method | Endpoint                          | Description                          |
|--------|------------------------------------|---------------------------------------|
| GET    | `/`                                 | Health check — confirms API is running |
| GET    | `/hotels`                           | Returns all hotels                    |
| GET    | `/hotels/:hotelName`                | Returns details of one hotel by name  |
| GET    | `/hotels/directory/:phoneNumber`    | Returns a hotel by phone number       |
| GET    | `/hotels/rating/:hotelRating`       | Returns hotels matching a rating      |
| GET    | `/hotels/category/:hotelCategory`   | Returns hotels matching a category    |
| POST   | `/hotels`                           | Adds a new hotel                      |
| POST   | `/hotels/:hotelId`                  | Updates a hotel by ID                 |
| DELETE | `/hotels/:hotelId`                  | Deletes a hotel by ID                 |

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas account and cluster
- npm

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd hotels-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
MONGODB=your_mongodb_atlas_connection_string
```

Run the backend server:

```bash
npm run dev
```

The server runs on `http://localhost:5000` by default.

### 3. Seed the database (optional, first-time setup)

To populate MongoDB with sample hotel data:

```bash
node seed.js
```

This inserts 4 sample hotels: "New Hotel", "New Hotel 1", "New Hotel 2" (x2).

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default (Vite's default port).

Make sure the API URL used in `useFetch` calls (inside `AllHotels.jsx` and `HotelByName.jsx`) points to your running backend — `http://localhost:5000` for local development, or your deployed backend URL (e.g., `https://your-backend.vercel.app`) for production.

## Deployment

Both frontend and backend are deployed separately on Vercel.

- **Backend:** deployed as a serverless Node/Express app. Set the `MONGODB` environment variable in the Vercel project settings (Settings → Environment Variables).
- **Frontend:** deployed as a static Vite build. Update the API base URL in the frontend code to point to the deployed backend URL before deploying.

Ensure CORS is enabled on the backend (already configured via the `cors` package) so the deployed frontend can call the deployed backend across origins.

## Notes

- MongoDB creates a database/collection only after the first document is inserted — connecting alone does not create visible data in Atlas.
- Hotel names with spaces (e.g., "New Hotel 1") must be URL-encoded using `encodeURIComponent()` when used in fetch requests, since the `/hotels/:hotelName` route does an exact string match.
- Route order matters: `/hotels/directory/:phoneNumber`, `/hotels/rating/:hotelRating`, and `/hotels/category/:hotelCategory` must be defined **before** the generic `/hotels/:hotelName` route in `api/index.js`, otherwise Express will incorrectly match those paths as hotel names.
- 
