### Day 18 - Mega Project in Backend with MongoDB

- Database design for Video Tube
- Backend project structure
- Connect database professionally in MERN



### Vid 149. Database design for Video Tube

- design youtube system 
- twitter like posts 
- video , comments , users , posts 
- ![ER Diagram](./youtube_copy_ER_Diagram.png)

code 
```
users [icon: user] {
  id string pk
  username string
  email string
  fullName string
  avatar string
  coverImage string
  watchHistory ObjectId[] videos
  password string
  refreshToken string
  createdAt Date
  updatedAt Date
}

videos [icon: video] {
  id string pk
  owner ObjectId users
  videoFile string
  thumbnail string
  title string
  description string
  duration number
  views number
  isPublished boolean
  createdAt Date
  updatedAt Date
}

subscriptions [icon: money] {
  id string pk
  subscriber ObjectId users
  channel ObjectId users
  createdAt Date
  updatedAt Date
}

likes [icon: thumbs-up] {
  id string pk
  video ObjectId videos
  comment ObjectId comments
  post ObjectId posts
  likedBy ObjectId users
  createdAt Date
  updatedAt Date
}

comments [icon: comment] {
  id string pk
  video ObjectId videos
  owner ObjectId users
  content string
  createdAt Date
  updatedAt Date
}

playlists [icon: library] {
  id string pk
  owner ObjectId users
  videos ObjectId[] videos
  name string
  description string
  createdAt Date
  updatedAt Date
}

posts [icon: message-square] {
  id string pk
  owner ObjectId users
  content string
  createdAt Date
  updatedAt Date  
}

users.watchHistory <> videos.id


videos.owner - users.id

subscriptions.subscriber - users.id
subscriptions.channel - users.id

likes.likedBy - users.id
likes.video - videos.id
likes.comment - comments.id
likes.post - posts.id

comments.owner - users.id

comments.video - videos.id

playlists.owner - users.id
playlists.videos < videos.id

posts.owner - users.id

// follows.followee - users.id
// follows.follower - users.id
```


### Vid 150. Backend project structure

- concepts on the go 
- mini projects to learn things 
- setting up the structure

- nodemon and prettier setup 
- structure of the files 
- VIDTUBE
├── node_modules/
└── src/
    ├── controllers/
    ├── db/
    ├── models/
    ├── routes/
    ├── utils/
    └── index.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── app.js
├── constant.js
├── index.js
├── package-lock.json
└── package.json

- dev dependencies setup such as nodemon and prettier 

### Vid 151. Connect database professionally in MERN

Below are **simple, professional Markdown notes** explaining **Database Connection in MERN** with **MongoDB Atlas**, including **index file, constants, db folder**, etc.
Easy language + clean structure 👇

---

# 📦 Database Connection in MERN (MongoDB Atlas)

## 🔹 What is MERN?

**MERN** =

* **M**ongoDB (Database)
* **E**xpress.js (Backend framework)
* **R**eact.js (Frontend)
* **N**ode.js (Runtime)

---

## 🔹 MongoDB Atlas

**MongoDB Atlas** is a **cloud-based MongoDB database service**.

### Why use MongoDB Atlas?

* No local database setup
* Secure & scalable
* Free tier available
* Easy connection using URL

---

## 📁 Backend Folder Structure (Professional)

```txt
backend/
│── src/
│   ├── config/
│   │   └── db.js
│   ├── constants/
│   │   └── constants.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── app.js
│
│── index.js
│── .env
│── package.json
```

---

## 📌 `index.js` (Main Entry File)

### Purpose:

* Starts the server
* Connects database before running app

### Why important?

* Central starting point
* Ensures DB is connected before API runs

```js
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
```

---

## 📁 `config/db.js` (Database Connection File)

### Purpose:

* Handles MongoDB connection logic
* Keeps DB code separate (clean & professional)

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error);
    process.exit(1);
  }
};

export default connectDB;
```

---

## 📁 `constants/constants.js`

### Purpose:

* Store fixed values (constants)
* Avoid hard-coding everywhere

### Examples:

```js
export const DB_NAME = "mernApp";
export const PORT = 5000;
```

### Why use constants?

* Easy maintenance
* Clean code
* Reusable values

---

## 📄 `.env` File (Environment Variables)

### Purpose:

* Store secret data securely
* Never push this to GitHub ❌

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### Why `.env`?

* Keeps credentials safe
* Easy to change environment (dev / prod)

---

## 🔐 MongoDB Atlas Connection Steps

1. Create account on **MongoDB Atlas**
2. Create a **Cluster**
3. Add **Database User**
4. Whitelist IP (`0.0.0.0/0` for dev)
5. Copy **Connection String**
6. Paste into `.env`

---

## ✅ Best Practices (Professional)

* Use `async/await` for DB connection
* Separate DB logic in `config` folder
* Use `.env` for secrets
* Connect DB **before** starting server
* Handle errors properly

---

## 🧠 Summary

* `index.js` → starts server
* `db.js` → connects MongoDB
* `constants.js` → stores fixed values
* MongoDB Atlas → cloud database
* `.env` → stores secrets securely








