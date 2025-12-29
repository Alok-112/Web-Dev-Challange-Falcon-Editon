Day 7 - Building a Complete Backend

- Separation of app with index
- Express configuration and CORS
- Standard ApiResponse and API errors
- Keeping data in constants

### Vid 115. Separation of app with index
- main entry - index.js 
app.js
```js
import express from 'express'
const app = express()
app.get('/',(req,res)=>{
    res.send("Welcome to basecamp");
})

export default app
```

### Vid 116. Express configuration and CORS

cors - cross resource origin sharing 


```js

// Basic configuration 

import express from 'express'
import cors from 'cors'
app.use -> middleware
app.use(express.json({limit:"16kb"}))
app.use(epress.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

// cors configurations
app.use(cors({
    origin:process.env.CORS_ORIGIN.split(",") || "https://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
}),)

app.get('/',(req,res)=>{
    res.send("Welcome to basecampy")
})
```

- Server will accept json so through app use can server 
- Server will accept links and we can set limit 16kb which is more than enough
- its standard pratise to set then limit 


### Vid 117. Standard ApiResponse and API errors

Below is a **point-wise explanation in Markdown** for both files, written clearly and simply.

---

## 📁 `apiError.js`

This file defines a **custom error class** used to handle errors in a structured and consistent way.

### 🔹 Purpose

* To standardize **API error handling**
* To send meaningful error responses from the backend

### 🔹 Code Breakdown

```js
class ApiError extends Error {
```

* Extends JavaScript’s built-in `Error` class

---

```js
constructor(
  statusCode,
  message = "Something went wrong",
  errors = [],
  stack = ""
)
```

* **`statusCode`** → HTTP status code (e.g., 400, 401, 500)
* **`message`** → Error message (default: `"Something went wrong"`)
* **`errors`** → Array for detailed validation or field errors
* **`stack`** → Optional custom stack trace

---

```js
super(message);
```

* Calls the parent `Error` constructor
* Ensures the error message works like a normal JS error

---

```js
this.statusCode = statusCode;
this.data = null;
this.message = message;
this.success = false;
this.errors = errors;
```

* **`statusCode`** → HTTP error code
* **`data`** → Always `null` for errors
* **`success`** → Always `false`
* **`errors`** → Extra error details (useful for validation errors)

---

```js
if (stack) {
  this.stack = stack;
} else {
  Error.captureStackTrace(this, this.constructor);
}
```

* Uses provided stack trace if available
* Otherwise captures the stack trace automatically

---

```js
export { ApiError };
```

* Makes the class reusable across the project

---

### ✅ When to Use `ApiError`

* Authentication errors
* Validation errors
* Database or server failures
* Any API failure that needs a clean response

---

## 📁 `apiErrorResponse.js` (ApiResponse)

This file defines a **standard success response structure** for APIs.

### 🔹 Purpose

* To keep all successful API responses consistent
* To simplify frontend handling of responses

---

### 🔹 Code Breakdown

```js
class ApiResponse {
```

* Defines a response wrapper class

---

```js
constructor(statusCode, data, message = "Success") {
```

* **`statusCode`** → HTTP status code (200, 201, etc.)
* **`data`** → Actual response data
* **`message`** → Optional success message

---

```js
this.statusCode = statusCode;
this.data = data;
this.message = message;
```

* Stores response information

---

```js
this.success = statusCode < 400;
```

* Automatically sets:

  * `true` for success responses
  * `false` for error status codes

---

```js
export { ApiResponse };
```

* Exports the class for use in controllers

---

## 🔄 Difference Between `ApiError` and `ApiResponse`

| Feature     | ApiError | ApiResponse              |
| ----------- | -------- | ------------------------ |
| Used for    | Errors   | Successful responses     |
| success     | ❌ false  | ✅ true (if status < 400) |
| data        | null     | Actual response data     |
| Extends     | `Error`  | Plain class              |
| Status Code | Required | Required                 |

---

## 🧠 Example Usage

```js
// Success response
return res
  .status(200)
  .json(new ApiResponse(200, user, "User fetched successfully"));
```

```js
// Error response
throw new ApiError(404, "User not found");
```

---

## ✅ Why This Pattern Is Good

* Clean and consistent API responses
* Easy error handling in frontend
* Professional backend architecture
* Scales well in large projects



### Vid 118. Keeping data in constants

Below is a **point-wise explanation in Markdown** for this file, similar to the previous one.

---

## 📁 Role & Task Status Constants File

This file defines **enums and helper arrays** used to manage **user roles** and **task statuses** in a consistent way across the application.

---

## 🔐 `UserRolesEnum`

### 🔹 Purpose
- Defines all **possible roles** a user can have
- Prevents use of hard-coded strings throughout the codebase

---

### 🔹 Code Breakdown

```js
export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};
```

- **`ADMIN`** → Full system access
- **`PROJECT_ADMIN`** → Manages projects and members
- **`MEMBER`** → Regular user with limited permissions

✅ Using constants avoids typos like `"Admin"` vs `"admin"`

---

## 📦 `AvailableUserRole`

### 🔹 Purpose
- Provides an **array of valid user roles**
- Useful for **validation**, **middleware**, and **database schema enums**

---

### 🔹 Code Breakdown

```js
export const AvailableUserRole = Object.values(UserRolesEnum);
```

- Converts the enum into an array:
```js
["admin", "project_admin", "member"]
```

---

### 🔹 Example Usage

```js
if (!AvailableUserRole.includes(user.role)) {
  throw new ApiError(400, "Invalid user role");
}
```

---

## 📝 `TaskStatusEnum`

### 🔹 Purpose
- Defines all **possible states of a task**
- Keeps task status values consistent across the app

---

### 🔹 Code Breakdown

```js
export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};
```

- **`TODO`** → Task not started
- **`IN_PROGRESS`** → Task is currently being worked on
- **`DONE`** → Task completed

---

## 📦 `AvailableTaskStatues`

### 🔹 Purpose
- Holds all valid task status values in an array
- Used for validation and schema constraints

---

### 🔹 Code Breakdown

```js
export const AvailableTaskStatues = Object.values(TaskStatusEnum);
```

- Results in:
```js
["todo", "in_progress", "done"]
```

⚠️ **Note:** There is a small typo in the variable name:
```js
AvailableTaskStatues ❌
AvailableTaskStatuses ✅ (recommended)
```

---

## 🔄 Why Use This Pattern?

- Centralized role & status management
- Easy validation
- Prevents magic strings
- Cleaner and safer code
- Easier to update in the future

---

## 🧠 Example Combined Usage

```js
if (!AvailableTaskStatues.includes(task.status)) {
  throw new ApiError(400, "Invalid task status");
}
```

---

## 📌 Summary

| Constant | Purpose |
|-------|--------|
| `UserRolesEnum` | Defines user roles |
| `AvailableUserRole` | List of valid user roles |
| `TaskStatusEnum` | Defines task states |
| `AvailableTaskStatues` | List of valid task states |

---
