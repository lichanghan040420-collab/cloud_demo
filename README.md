# Project Name: Goods Management System
## Group Info
- Group No: 5
- Members:
  - Ding PeiYang (SID: 13055546)
  - Wang YaoShun (SID: 13071522)
  - Li ChangHan (SID: 13077194)
  - Fan ZeKun (SID: 13057320)
  - Cheung ChiChung (SID: 13137299)

---

## Project File Introduction

- **public**
   Stores static resource files (background images)

- **views**
   Stores EJS template files
   Includes pages:
    - `login.ejs`: Login page
    - `index.ejs`: Home page
    - `inbound.ejs`: Cargo inbound page
    - `outbound.ejs`: Cargo outbound page
    - `edit.ejs`: Edit page
    - `search.ejs`: Search page
    - `list.ejs`: Cargo list page

- **README.md**
  File used to describe the basic information and usage of the project

- **package.json**
  Project configuration file, containing basic information, startup scripts, and dependencies.
  - **name**: Project name
  - **version**: Version number
  - **main**: Main entry file (server.js)
  - **scripts**:
    - start: Start the server
    - test: Default test script
  - **dependencies**:
    - dotenv: Environment variables
    - ejs: Template engine
    - express: Web framework
    - express-session: Session management
    - mongoose: MongoDB database

- **server.js**
   Main entry file of the project
   Functions:
    - Start the Express server and listen on a port
    - Configure middleware (body-parser, express-session, static resource directory, etc.)
    - Set up EJS template engine and views directory
    - Connect to MongoDB database(To protect database security, we deploy the link directly in the environment variables of the Render platform)
    - Provide login/logout logic (session-based)
    - Define CRUD page routes (inbound, outbound, edit, search, list)
    - Define RESTful API (/api/cargo) supporting GET/POST/PUT/DELETE
- **models**
  No models folder is used in this project.

---

## Cloud-based Server URL
https://cloud-demo-9d7c.onrender.com/

---

## Operation Guides
### Login
- Test account and password: `admin / 123456`
- Open the website and enter the account and password. If successful, you will enter the home page.

### Logout
- After using the website, click `Home` to return to the main page, then click `Login`.
- You will be redirected back to the `Login` page.

### CRUD Web Pages
- **Create**
  - Click the `GO TO Inbound` button on the home page or the `Inbound` button on subpages to open the `Cargo Inbound` page.
  - Enter cargo information in the form: `Cargo Name`, `Cargo Code`, `Cargo Quantity`, `Cargo Remark` (only `quantity` is numerical, others are strings).
  - Click the `Add Inbound` button.
  - If successful, the system will insert the cargo into the database and display a message: **Added:...(Code:..., Quantity:...)**

- **Delete**
  - Click the `GO TO Outbound` button on the home page or the `Outbound` button on subpages to open the `Cargo Outbound` page.
  - Enter the `Cargo Code` in the form.
  - Click the `Delete Cargo` button.
  - If successful, the system will delete the cargo and display a message: **Cargo with code ... has been deleted.**

- **Search**
  - Click the `GO TO Search` button on the home page or the `Search` button on subpages to open the `Cargo Search` page.
  - Enter `Cargo Name or Code` in the form.
  - Click the `Search Cargo` button.
  - If successful, the system will display cargo information:
    
    **Cargo Information:
    Name: ...
    Code: ...
    Quantity: ...
    Remark: ...**
   
    (When searching by name, if multiple cargos share the same name, only the one with the smallest code value will be returned.)  

- **Read**
  - Click the `GO TO List` button on the home page or the `List` button on subpages to open the `Cargo List` page.
  - The form will display the four stored cargo attributes.

- **Update**
  - Click the `GO TO Edit` button on the home page or the `Edit` button on subpages to open the `Cargo Edit` page.
  - First enter the `Cargo Code` in the form, then input `New Cargo Name`, `New Cargo Quantity`, and `New Cargo Remark`.
  - Click the `Update Cargo` button.
  - If successful, the system will update the cargo and display a message: **Cargo ... updated: Name=..., Quantity=...**
 
### Environment Variables Setup
To ensure the project runs correctly，This project uses a .env file to store sensitive information, such as the MongoDB connection string.
### How the .env File Works
- The project uses the dotenv package to load the .env file.
- In the server.js file, the following code ensures the environment variables are loaded:
  javascript
  require('dotenv').config();
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  
- The process.env.MONGO_URI retrieves the MONGO_URI value from the .env file, allowing the application to connect to the database.

### RESTful CRUD Services
- **GET** `/api/cargo/:code` → Retrieve a specific cargo
- **POST** `/api/cargo` → Add a new cargo
- **PUT** `/api/cargo/:code` → Update a specific cargo
- **DELETE** `/api/cargo/:code` → Delete a specific cargo

### RESTful CRUD Services Testing
// Create
```javascript
curl -X POST https://cloud-demo-9d7c.onrender.com/api/cargo \
-H "Content-Type: application/json" \
-d '{"name": "Test", "code": "T001", "quantity": 50, "remark": "RESTful CRUD services test"}'
```
// Read
```javascript
curl -X GET https://cloud-demo-9d7c.onrender.com/api/cargo/T001
```
// Update
```javascript
curl -X PUT https://cloud-demo-9d7c.onrender.com/api/cargo/T001 \
-H "Content-Type: application/json" \
-d '{"name": "Test_Updated", "quantity": 100}'
```
// Delete
```javascript
curl -X DELETE https://cloud-demo 9d7c.onrender.com/api/cargo/T001
```

