# JobTrackr 🎯



**JobTrackr** helps you stay organized during your job hunt. Track applications, manage your resume, and get AI-powered insights to land your next role.

---

## ✨ Key Features

-   **Dashboard**: Visualize your job hunt progress with stats and charts.
-   **Application Tracker**: Manage job applications with a robust filtering and search system.
-   **AI Resume Optimizer**: Upload and analyze resumes using Google Gemini AI for intelligent feedback.
-   **Secure Authentication**: JWT-based auth system with Access & Refresh tokens.
-   **User Settings**: Personalize your profile, notifications, and AI preferences.
-   **Responsive Design**: Modern UI built with Tailwind CSS, optimized for all devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **Form Handling**: React Hook Form
- **PDF Processing**: react-pdf & jsPDF

### Backend
- **Runtime**: Node.js & Express
- **Database**: MongoDB & Mongoose
- **AI Integration**: Google Generative AI (Gemini)
- **Security**: JWT, Helmet, CORS, BCryptJS
- **Communication**: Nodemailer for emails

---

## 📁 Project Structure

```text
Job-Tracker/
├── frontend/           # React app (Vite, Redux, Tailwind)
│   └── src/
│       ├── features/   # Auth, Dashboard, Applications, Resume
│       ├── shared/     # Reusable components & hooks
│       └── pages/      # Main route pages
├── backend/            # Express API (Node.js, MongoDB)
│   └── src/
│       ├── features/   # API routes & controllers
│       ├── shared/     # Middleware, Utils, Config
│       └── server.js   # Entry point
└── README.md           # Unified documentation
```

---

## 🚀 Getting Started

### Prerequisites
-   **Node.js**: version 18 or higher.
-   **MongoDB**: A running instance (Local or Atlas).
-   **Gemini API Key**: Required for AI features.

### 1. Clone the project
```bash
git clone https://github.com/your-username/Job-Tracker.git
cd Job-Tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder with:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
# Open a new terminal
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder with:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the frontend:
```bash
npm run dev
```

---

## 🔧 Available Scripts

### Backend
- `npm run dev`: Start development server with Nodemon.
- `npm start`: Start production server.
- `npm run migrate`: Run database index fixes.

### Frontend
- `npm run dev`: Start Vite development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint check.

---


