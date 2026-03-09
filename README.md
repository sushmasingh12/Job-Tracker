# JobTrackr 🎯

> A full-stack job application tracking platform — built with React + Node.js + MongoDB.

Track every job you apply to, manage application statuses, and get AI-powered resume insights — all in one place.

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Hook Form
- React Router v6
- Redux Toolkit

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (Access + Refresh tokens)
- express-validator

---

## Project Structure

```
jobtrackr/
├── frontend/                   # React app
│   └── src/
│       ├── features/
│       │   ├── auth/           # Login, Register
│       │   ├── applications/   # CRUD, filters, detail view
│       │   └── dashboard/      # Stats, charts
│       ├── shared/             # Navbar, Sidebar, UI components
│       └── pages/              # Route-level page wrappers
│
├── backend/                    # Express API
│   └── src/
│       ├── features/
│       │   ├── auth/           # Register, Login, JWT refresh
│       │   └── applications/   # Full CRUD + stats
│       └── shared/
│           ├── middleware/     # authenticate, errorHandler, validate
│           └── utils/          # apiResponse, generateTokens
│
├── .gitignore
└── README.md
```
## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/jobtrackr.git
cd jobtrackr
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev                # runs on http://localhost:5173
```

---
