### **Day 17 - Mega Project in Backend with MongoDB**

* Write tests and documentation with Postman and deployment
* Advanced logging with Morgan and Winston
* From idea to Database design

---

### **Vid 146. Write tests and documentation with Postman and deployment**

#### **1. Writing Tests in Postman**

**Basic Steps:**

* **Create a Request**: Start by creating an API request.
* **Go to "Tests" Tab**: Click on the "Tests" tab.
* **Write Test Scripts**: Use JavaScript for tests.

**Example Test Script:**

```javascript
// Check if the status code is 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Check if the response contains a 'name' field
pm.test("Response contains 'name' field", function () {
    pm.response.to.have.jsonBody('name');
});
```

**Other Tests:**

* **Response Time**: `pm.response.responseTime`
* **JSON Body**: `pm.response.to.have.jsonBody`
* **Headers**: `pm.response.to.have.header`
* **Data Type Validation**: `pm.expect(response.json().name).to.be.a('string')`

---

#### **2. Documenting APIs with Postman**

**Steps:**

1. **Create a Collection**: Organize requests into a collection.
2. **Add Descriptions**: Add detailed descriptions for requests and collections.
3. **Generate Docs**: Click "View in Web" to generate public documentation.

**Example Collection Description:**

* **Collection Name**: `User API`
* **Collection Description**: "Endpoints for managing users (GET, POST, PUT, DELETE)."

**Adding Request Descriptions:**

* **GET /users**: "Fetch all users (no authentication needed)."
* **POST /users**: "Create a new user. Requires name and email."

---

#### **3. Deploying APIs**

**Common Deployment Platforms:**

* **Heroku**:

  1. Create a `Procfile` (e.g., `web: node app.js`).
  2. Push code to Heroku: `git push heroku main`.
  3. Get the URL for your app.

* **AWS**:

  1. Create an Elastic Beanstalk environment.
  2. Deploy with `eb init`, `eb create`, `eb deploy`.
  3. Access via the provided URL.

* **Azure**:

  1. Create a Web App on Azure.
  2. Deploy via GitHub or Git.
  3. Access via the given URL.

---

**Example Deployment on Heroku:**

1. Install the Heroku CLI and log in (`heroku login`).
2. Create the app: `heroku create your-app-name`.
3. Deploy: `git push heroku main`.
4. Access the URL provided by Heroku.

---

**Notes:**

* **Testing**: Test edge cases like invalid inputs.
* **Documentation**: Ensure it's clear and shareable.
* **Deployment**: Verify after deployment and monitor performance.

---

### **Vid 147. Advanced logging with Morgan and Winston**

#### **Morgan:**

* **Purpose**: Primarily used for HTTP request logging.
* **Usage**: Useful to log incoming requests in an Express app.
* **Common Formats**: `combined`, `dev`, `tiny`, etc.

#### **Winston:**

* **Purpose**: A versatile logger used for general-purpose logging (not limited to HTTP requests).
* **Usage**: It supports logging to multiple transports (e.g., files, console, remote services).

---

### **Key Concepts:**

1. **Morgan** logging middleware is used to log HTTP request details.
2. **Winston** is used for logging application events with more flexibility (log levels, transports, etc.).

---

### **Code Example:**

#### 1. **Setting up Morgan for HTTP Request Logging:**

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();

// Use morgan for logging HTTP requests in 'combined' format
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### 2. **Setting up Winston for Application Logging:**

```javascript
const winston = require('winston');

// Create a custom logger instance
const logger = winston.createLogger({
  level: 'info',  // Log level to capture
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),  // Log to console
    new winston.transports.File({ filename: 'app.log', level: 'error' }) // Log errors to file
  ],
});

// Use logger for different log levels
logger.info('Information message');
logger.error('Error message');
```

#### 3. **Combining Morgan and Winston:**

For more advanced setups, you can use **Morgan** with **Winston** to log both HTTP requests and application-level logs to files or external services.

```javascript
const express = require('express');
const morgan = require('morgan');
const winston = require('winston');

const app = express();

// Setup Winston Logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'app.log', level: 'error' }),
  ],
});

// Morgan with Winston Stream
app.use(morgan('combined', { stream: { write: msg => logger.info(msg) } }));

app.get('/', (req, res) => {
  logger.info('This is an info log message');
  res.send('Hello from Express with advanced logging!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

### **Key Points:**

* **Morgan** is good for HTTP request logging.
* **Winston** is flexible and allows for multiple transports (console, files, etc.), and different log levels (`info`, `warn`, `error`).
* Combining both makes your app's logging robust and flexible.

---

This approach helps track application behavior, debug errors, and monitor requests easily, all in a production-friendly way.

---

### **Vid 148. From Idea to Database Design**
- MVP (most viable product)
- first information :- what information we will be collecting 
- thinking and learning about the problem statement 

- Moon Modeler (used in production)
- Free alternative (Eraser)

- ER (entity relationship) Diagram 

- all code for app earser 

- todolist app 
    - todos
        - _id string pk
        - content string 
        - complete boolean
        - subTodos ObjectId[] subTodos
        - createdBy ObjectId[] users
        - createdAt Date
        - UpdatedAt Date
    - users
        - _id string pk
        - username string
        - email string
        - password string
    - subTodos
        - _id string pkm
        - content string
        - complete boolean
        - createdBy ObjectId user
        - createdAt Date
        - updatedAt Date
    
- one to many todos.subTodos < subTodos._id
- todos.createdBy - users._id
- subTodos.createdBy - users._id


- practise by thinking about projects

- Ecommerce

- users 
    - _id string pk
    - username string
    - email string
    - password string
- products
    - _id string pk
    - name string
    - description string
    - productImage string
    - price number 
    - stock number 
    - category ObjectId categories
    - owner  ObjectId users     
    - createdAt Date
    - updatedAt Date
- categories
    - _id string pk
    - name string
    - createdAt Date
    - updatedAt Date
- orderItems
    - _id string
    - productId ObjectId products
    - quantity number
- order 
    - _id string pk
    - customer ObjectId user
    - orderItems ObjectId[] orderItems
    - address String
    - status enum "PENDING","CANCELLED","DELIEVERED"
    - paymentId String 
    - createdAt Date
    - updatedAt Date

- product.category - categories._id
- product.owner - users._id
- orderItems.productId - products._id
- orders.customer - users._id
- order.orderItems < orderItems._id



- Hospital management system 

- hospitals
    - _id string pk 
    - name string 
    - addressLine1 string 
    - addressLine2 string
    - city string 
    - pincode string 
    - specialization string[]
    - createdAt Date
    - updatedAt Date

- patients
    - _id string pk 
    - name string 
    - diagnosedWith string
    - address string 
    - age number 
    - gender enum "M" , "F","O"
    - bloodgroup string
    - admittedIn ObjectId hospitals
    - createdAt Date 
    - updatedAt Date
- doctors
    - _id string pk
    - name string
    - salary string
    - qualification string
    - experienceInYears  number 
    - workInHospitals ObjectId[] hospitals
    - createdAt Date
    - updatedAt Date
- medicalRecords 
    - _id string
    - patientId ObjecId patients
    - examinedAt Date
    - problem string
    - description string
    - createdAt Date 
    - updatedAt Date 

Relationships 
- patients.admittedIn - hospitals._id
- doctors.worksInHospitals < hospital._id
- medicalRecords.patientId - patients._id


# Practise 
## Library Management System
## Content Management System 
