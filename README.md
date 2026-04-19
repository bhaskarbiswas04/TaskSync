# 🚀 TaskSync — MERN Stack Project Management System

TaskSync is a full-featured project and task management application built using the MERN stack. It helps teams collaborate, manage projects, assign tasks, and track progress with real-time updates and insightful reports.

---

## 🌐 Live Demo

👉 https://task-sync-client.vercel.app

---

## 📌 Features

### 👥 Authentication & User Management

* Secure login & signup (JWT-based authentication)
* Protected routes for authenticated users
* User profile management
* Change password functionality

---

### 📁 Project Management

* Create, update, and view projects
* Assign teams to projects
* View project-specific tasks
* Filter tasks by status and priority

---

### 👨‍👩‍👧‍👦 Team Management

* Create and manage teams
* Add/remove members
* View team-specific projects and tasks

---

### ✅ Task Management

* Create tasks with:

  * Project & team association
  * Multiple owners
  * Priority & status
  * Tags and deadlines
* Update task status (To Do, In Progress, Completed)
* Edit task details
* Delete tasks
* Task detail view with full information

---

### 🔍 Search Functionality

* Global search across:

  * Projects
  * Teams
  * Tasks
* Instant filtering without reload

---

### 📊 Reports & Analytics

* Tasks completed in the last 7 days
* Total pending work (hours/days)
* Tasks closed by:

  * Team
  * Owner
  * Project
* Interactive charts using Chart.js

---

### ⚙️ Settings Page

* Update profile (name, email)
* Change password
* Set preferences:

  * Default task priority
  * Default task status
  * Theme (dark/light)
* Delete account (with confirmation)

---

### 🎨 UI/UX

* Fully responsive modern UI
* Dark theme by default
* Smooth transitions and loading states
* Clean dashboard layout

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Context API (State Management)
* Axios (API calls)
* Chart.js (Data Visualization)
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt.js (Password hashing)

---

## 📂 Project Structure

```bash
TaskSync/
│
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── routes/
│
├── server/                 # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tasksync.git
cd tasksync
```

---

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 API Endpoints (Sample)

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects`

### Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* POST `/api/tasks/:id`
* DELETE `/api/tasks/:id`

### Settings

* POST `/api/settings/profile`
* POST `/api/settings/password`
* POST `/api/settings/preferences`
* DELETE `/api/settings/delete`

---

## 📈 Future Improvements

* Real-time updates using WebSockets
* Email notifications
* Drag-and-drop task board (Kanban)
* File attachments in tasks
* Role-based access control (Admin/User)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Bhaskar Biswas**
MERN Stack Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub — it helps a lot!
