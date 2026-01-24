## Day 3 - Introduction to Databases

## Tasks
- Introduction to databases
- SQL vs NOSQL Databases
- A Quick tour of MongoDB

### Vid 101. Introduction to databases

- Some FAQs
    -  🤔 Why do we need database on the first place 
    - 🟰 Answer is simple (storing the information in database permanently)

- ✅No Database is good , No database is bad 
- 🔥It's all about the situation and the goal and what your problem is 
- CRUD (Create Read Update Delete) operation is all we want to know

![Database Types](image-3.png)

- In monogoDB everthing is an object 
- ORM (Object-Relational Mapping):
Maps relational (SQL) database tables to programming-language objects.

- ODM (Object-Document Mapping):
Maps document-based (NoSQL) databases to programming-language objects (e.g., MongoDB with Mongoose).
- Mongoose(ODM) , Prisma(ORM) , Drizzel(ORM)
- Relational DB → ORM
- Document DB → ODM



### Vid 102. SQL vs NOSQL Databases

([SQL Vs NoSQL](https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql))
#### SQL 
- SQL (Structured Query Language)
- Structured data
- Relational Database
- Data within Rows and Columns 
- e.g. Oracle, MySQL, PostgreSQL, MSSQL , SQLite

#### NoSQL
- NoSQL(Not Only Structured Query Language)
- unstructured data
- diffrent types of NoSQL datatypes like 
document , key-value, coulumn-family , graph

### Vid 103. A Quick tour of MongoDB

Here are **clear step-by-step points** to **create and use MongoDB Atlas** 👇

---

## 1️⃣ Create MongoDB Atlas Account

* Go to **MongoDB Atlas website**
* Sign up using **Google / GitHub / Email**
* Log in to the Atlas dashboard

---

## 2️⃣ Create a Project

* Click **New Project**
* Give it a project name
* Click **Create Project**

---

## 3️⃣ Create a Cluster

* Click **Build a Cluster**
* Choose **Shared (Free – M0)** tier
* Select:

  * Cloud provider (AWS / GCP / Azure)
  * Region (closest to you)
* Click **Create Cluster**
* Wait 1–3 minutes for setup

---

## 4️⃣ Create Database User

* Go to **Database Access**
* Click **Add New Database User**
* Set:

  * Username
  * Password
* Give **Read and Write** permissions
* Save user

---

## 5️⃣ Allow Network Access

* Go to **Network Access**
* Click **Add IP Address**
* Choose:

  * `0.0.0.0/0` (allow access from anywhere — for learning)
* Confirm

---

## 6️⃣ Get Connection String

* Go to **Clusters**
* Click **Connect**
* Choose **Connect your application**
* Copy the **MongoDB connection URI**

Example:

```
mongodb+srv://username:password@cluster0.mongodb.net/dbname
```

---

## 7️⃣ Connect Using Mongoose (Node.js Example)

* Install dependencies:

```bash
npm install mongoose
```

* Connect to Atlas:

```js
import mongoose from "mongoose";

mongoose.connect("YOUR_ATLAS_URI")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
```

---

## 8️⃣ Create Schema & Model

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);
```

---

## 9️⃣ Perform CRUD Operations

```js
// Create
await User.create({ name: "Alex", email: "alex@mail.com" });

// Read
const users = await User.find();

// Update
await User.updateOne({ name: "Alex" }, { email: "new@mail.com" });

// Delete
await User.deleteOne({ name: "Alex" });
```

---

## 🔟 View Data in Atlas

* Go to **Browse Collections**
* Select database → collection
* See documents live

---

### Quick Summary

* **Atlas = Cloud MongoDB**
* **Mongoose = ODM**
* **URI connects app to Atlas**
* **Schemas control data structure**

