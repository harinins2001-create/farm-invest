FarmInvest Lite

FarmInvest Lite is a simple full-stack demo application built as part of a Mobile Development Challenge.
It allows users to view a list of farm investments and add new investments locally using a React Native (Expo) mobile app and a Node.js + MySQL backend.

Project Structure
farminvest-lite/
│
├── backend/        # Express + MySQL API
│   ├── index.js
│   ├── package.json
│   ├── schema.sql
│   ├── seed.sql
│   └── README.md
│
├── mobile/         # Expo React Native app
│   └── FarmInvestLite/
│
└── README.md       # Root instructions

Tech Stack

Mobile
Expo (Managed Workflow)
React Native
TypeScript
FlatList, Modal
Jest + React Native Testing Library

Backend
Node.js
Express
MySQL
mysql2 (prepared statements)

Backend Setup & Run
1. Create Database
  Open MySQL and run:
    SOURCE schema.sql;
    SOURCE seed.sql;
2. Install Dependencies
  cd backend
    npm install
3. Start Server
    npm run dev

Backend will run at:
  http://localhost:3000

Available Endpoints
  GET /api/investments
  POST /api/investments

Mobile App Setup & Run
1. Install Dependencies
  cd mobile/FarmInvestLite
    npm install
2. Configure Backend URL
   Update your local IP address in:
    src/constants.ts
    export const BACKEND_URL = "http://192.168.8.XXX:3000";
    Do not use localhost — use your machine’s local IP.
3. Start Expo
  npx expo start
  Scan the QR code using Expo Go or run on an emulator.

Features Implemented
  Fetch investments from backend API
  Display investments using FlatList
  Pull-to-refresh support
  Add new investment using modal form
  Optimistic UI update with rollback on error
  Loading and error states
  TypeScript typings
  One unit test for component rendering

Running Tests
  npm test

Assumptions & Notes
  No authentication is required.
  Data is stored locally in MySQL.
  Optimistic updates improve perceived performance.
  App is intentionally kept minimal as per challenge scope.
