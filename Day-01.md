# Day 1 - Journey of Backend with NodeJs and Projects

## Tasks
- Backend - NodeJs Libuv and Source Code 
- Handling Files in NodeJs as Project 


# Video 97.  Backend - NodeJS LibUV and source code



## What is Node.js?
- Node.js is a JavaScript runtime built on Chrome’s V8 engine.
- It allows JavaScript to run outside the browser.
- Mainly used for backend/server-side development.

## Why Node.js?
- Single-threaded but highly scalable.
- Uses non-blocking, asynchronous architecture.
- Ideal for APIs, real-time apps, and backend services.

## Frontend vs Backend
- Frontend: Runs in the browser (HTML, CSS, JS).
- Backend: Runs on the server (Node.js).
- Backend listens to requests on a specific PORT.

## Server Architecture
- Client sends a request → Server processes it → Response is returned.
- Node.js can handle multiple requests efficiently.

## APIs
- API = bridge between frontend and backend.
- Helps frontend communicate with server logic and database.

## Databases
- SQL: Structured data (MySQL, PostgreSQL).
- NoSQL: Flexible schema (MongoDB).
- Backend interacts with databases to store and retrieve data.

## LibUV
- LibUV is a C library used internally by Node.js.
- Handles:
  - File system operations
  - Network requests
  - Event loop
- Enables non-blocking I/O in Node.js.

## NPM (Node Package Manager)
- Used to install third-party libraries.
- Helps reuse code instead of writing everything from scratch.

## Key Takeaway
- Node.js is the foundation of modern backend development.
- Understanding its architecture is crucial before building projects.


# File Handling in Node.js – To-Do Project (Video 98)

## Project Overview
- Build a command-line To-Do application using Node.js.
- Learn real-world file handling concepts.

## Project Setup
- Create a folder: `to-do`
- Create a file: `to-do.js`

## Using fs Module
- `fs` (File System) module is used to read/write files.
- Imported using:
  const fs = require("fs");

## Command Line Arguments
- Node.js provides `process.argv` to read terminal inputs.
- Used to identify commands like:
  - add
  - list
  - remove

## Data Storage
- Tasks are stored in a JSON file.
- Functions created to:
  - Load existing tasks
  - Add new tasks
  - Save tasks back to file

## Error Handling
- Try-catch blocks used to handle:
  - File not found errors
  - JSON parsing errors

## Debugging
- Common issue: circular JSON reference.
- Proper debugging helps avoid crashes.

## Learning Outcome
- Node.js feels natural if you know JavaScript.
- File-based projects build strong backend fundamentals.

## Next Steps
- Implement remove functionality.
- Explore third-party npm packages.

