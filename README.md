# 📝 Full-Stack To-Do List Application

A simple and efficient web application to manage your daily tasks. Built with a **Node.js & Express** backend and a **Vanilla JavaScript** frontend, this project demonstrates full CRUD (Create, Read, Update, Delete) operations using a **MongoDB** database.

## 🚀 Features

* **Add Tasks:** Easily add new tasks to your list.
* **View Tasks:** Real-time fetching of all saved tasks from the database.
* **Update Tasks:** Edit the content of existing tasks.
* **Delete Tasks:** Remove completed or unwanted tasks.
* **Responsive Design:** Clean and simple UI styled with custom CSS.

## 🛠️ Tech Stack

**Backend:**
* [Node.js](https://nodejs.org/) - JavaScript Runtime
* [Express.js](https://expressjs.com/) - Web Framework
* [MongoDB](https://www.mongodb.com/) - NoSQL Database
* [Mongoose](https://mongoosejs.com/) - ODM for MongoDB
* [Cors](https://www.npmjs.com/package/cors) - Cross-Origin Resource Sharing

**Frontend:**
* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**

## 📂 Project Structure

```text
├── backend/
│   ├── controller/      # Logic for handling task operations
│   ├── models/          # MongoDB Mongoose Schema
│   ├── routers/         # API Routes definition
│   ├── server.js        # Entry point for the backend server
│   ├── .env             # Environment variables (not included in repo)
│   └── package.json     # Backend dependencies
│
└── frontend/
    ├── index.html       # Main user interface
    ├── style.css        # Application styling
    └── script.js        # Frontend logic and API calls

```

## ⚙️ Installation & Setup

Follow these steps to get the project running locally on your machine.

### 1. Prerequisites

* Node.js installed.
* MongoDB installed locally or a MongoDB Atlas connection string.

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` folder and add your MongoDB connection string and port:

```env
MONGO_URL=mongodb://localhost:27017/to_do_list
PORT=5000

```

*(Note: Adjust the `MONGO_URL` if you are using MongoDB Atlas)*

Start the server:

```bash
npm start
# OR for development mode (if nodemon is installed)
npm run dev

```

The server should start running on **http://localhost:5000**.

### 3. Frontend Setup

Since the frontend uses Vanilla JavaScript, you don't need to install dependencies.

1. Navigate to the `frontend` folder.
2. Open `index.html` in your browser.
* **Recommended:** Use the "Live Server" extension in VS Code for the best experience.



## 🔗 API Endpoints

The backend provides the following RESTful API endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/get` | Fetch all tasks |
| `POST` | `/api/save` | Add a new task |
| `PUT` | `/api/update/:id` | Update an existing task |
| `DELETE` | `/api/delete/:id` | Delete a task |

## 🛡️ CORS Configuration

The backend is configured to allow requests from any origin by default using the `cors` middleware. This ensures the frontend can communicate with the backend seamlessly during development.





