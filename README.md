# 🧱 Team Portfolio Project

A full-stack web application built with **React (Vite)** for the frontend and **Node.js (Express)** for the backend.  
This app is containerized with **Docker** and orchestrated using **Docker Compose**, making it easy to deploy and maintain.

---

## 📁 Project Structure

team-portfolio/
├── frontend/ # React app (Vite)
│ ├── src/ # React components, assets, and logic
│ ├── public/ # Static files
│ ├── old-html/ # Legacy static design (for reference)
│ ├── Dockerfile # Frontend container build file
│ ├── package.json # Frontend dependencies and scripts
│ ├── vite.config.js # Vite configuration
│ └── .env # Frontend environment variables (VITE_API_URL)
│
├── backend/ # Node.js / Express API
│ ├── src/
│ │ └── server.js # Main Express server entry point
│ ├── Dockerfile # Backend container build file
│ ├── package.json # Backend dependencies and scripts
│ └── .env # Backend environment variables (PORT, DB, etc.)
│
├── docker-compose.yml # Runs both frontend and backend containers
├── .gitignore # Ignores node_modules, .env, etc.
└── README.md # Project documentation (you’re reading it!)


---

## 🚀 Quick Start (Using Docker)

### 1. Build and Run the Stack
From the project root:
```bash
docker compose build
docker compose up -d

2. Access the App
Service  	URL	                   Description
Frontend	http://localhost:3010      React web interface
Backend         http://localhost:4210      Express API endpoint


## ⚙️ Environment Variables

Frontend (frontend/.env)
VITE_API_URL=http://backend:8200
Used by Vite to communicate with the backend API (internal Docker network).



Backend (backend/.env)
PORT=8200
NODE_ENV=development
FRONTEND_URL=http://localhost:3010


## 🧑‍💻 Developer Guide
1. Local Development (without Docker)

Run backend:
cd backend
npm install
npm start



Run frontend:
cd frontend
npm install
npm run dev



Visit:

Frontend → http://localhost:5173
Backend → http://localhost:4210

| Endpoint       | Method | Description              |
| -------------- | ------ | ------------------------ |
| `/`            | GET    | Health check             |
| `/api/members` | GET    | Returns team member data |



3. Code Formatting & Linting

To keep the code clean:
npm run lint


4. Folder Naming Rules

Keep React components under frontend/src/components/.

Use lowercase for backend filenames (e.g., server.js, routes.js).

Store all secrets in .env (never commit these to Git).




## 🧠 Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Frontend         | React (Vite), HTML, CSS, JavaScript |
| Backend          | Node.js, Express                    |
| Containerization | Docker, Docker Compose              |
| Reverse Proxy    | Nginx (inside frontend image)       |
