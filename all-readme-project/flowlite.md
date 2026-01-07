<div align="center">
  <img src="./public/images/favico.png" alt="Flowlite Logo" width="80" height="80">
  <h1><strong>Flowlite - Task Management System</strong></h1>
  
  <p align="center">
    <strong>A modern, intuitive task management platform for teams and individuals</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16.x-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=flat-square&logo=redux" alt="Redux">
  </p>
</div>

---

## 🎯 Overview

Flowlite is a full-featured task management web application designed to help teams collaborate effectively and manage projects with ease. Built with modern technologies like **Next.js 16**, **React 19**, and **TypeScript**, it provides a seamless experience for organizing tasks, tracking progress, and coordinating team efforts.

This repository contains the **Frontend** application. For the backend API, see [BE---Task-Management](https://github.com/DUCTONBUI96/BE---Task-Management/tree/tqa).

<div align="center">
  <img src="./src/assets/HomePage.png" alt="Flowlite Homepage" width="100%">
</div>

### ✨ Key Features

- 🔐 **User Authentication** - Secure sign-in/sign-up with JWT token management
- 📁 **Project Management** - Create and organize multiple projects
- ✅ **Task Management** - Full CRUD operations with drag-and-drop Kanban board
- 👥 **Team Collaboration** - Add members to projects with role-based access
- 💬 **Comments System** - Real-time task discussions and collaboration
- 📊 **Dashboard Analytics** - Visual statistics with charts and metrics
- 🌓 **Dark/Light Mode** - Customizable theme preferences with system sync
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Updates** - State management with Redux Toolkit and redux-persist

### 🎯 Use Cases

| Use Case | Key Features |
|----------|-------------|
| **Development Teams** | Sprint planning, task assignment, progress tracking with Kanban boards, code review coordination |
| **Project Management** | Resource allocation, deadline management, team workload overview, project analytics and metrics |
| **Startups & Agencies** | Lightweight project setup, quick task creation, team collaboration, milestone tracking, visual dashboards |
| **Educational Groups** | Assignment distribution, progress tracking, deadline management, team communication and feedback |
| **Freelancers & Consultants** | Client project organization, task prioritization, multi-project management, deliverable tracking |
| **Product Teams** | Feature planning, backlog management, work prioritization, requirements collaboration |

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16, React 19 |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **State Management** | Redux Toolkit, Redux Persist |
| **UI Components** | Radix UI, Lucide Icons, React Icons |
| **Charts** | ApexCharts |
| **Calendar** | FullCalendar |
| **HTTP Client** | Axios |
| **Notifications** | Sonner Toast |
| **Drag & Drop** | React DnD |

</div>

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/            # Admin dashboard layouts
│   │   ├── (my-pages)/     # Dynamic project pages
│   │   └── (others-pages)/ # Additional pages
│   ├── (full-width-pages)/ # Auth & error pages
│   │   ├── (auth)/         # Sign-in, Sign-up
│   │   └── (error-pages)/  # 404, Error pages
│   └── projects/           # Project listing page
├── components/             # Reusable UI components
│   ├── auth/               # Authentication forms
│   ├── calendar/           # Calendar components
│   ├── charts/             # Data visualization (Bar, Line)
│   ├── common/             # Shared components
│   ├── dashboard/          # Dashboard widgets
│   ├── landing/            # Landing page (Navbar, Footer)
│   ├── project/            # Project cards & dialogs
│   ├── task/               # Task management components
│   │   ├── BoardView.tsx   # Kanban board
│   │   ├── ListView.tsx    # List view
│   │   ├── AddTaskDialog   # Task creation
│   │   ├── TaskDetailDrawer# Task details
│   │   └── CommentSection  # Task comments
│   ├── team/               # Team member management
│   └── ui/                 # Base UI primitives
├── store/                  # Redux store configuration
│   └── slice/              # Redux slices
│       ├── authSlice.ts    # Authentication state
│       ├── projectSlice.ts # Projects state
│       ├── taskSlice.ts    # Tasks state
│       └── ...             # Other slices
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions & API links
├── types/                  # TypeScript type definitions
├── context/                # React Context providers
└── constants/              # Application constants
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| **Node.js** | 18.x or later (20.x recommended) |
| **npm/yarn** | Latest version |
| **Backend API** | Running on `http://localhost:3001` |

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/tquocan04/mini-management-project.git
cd mini-management-project
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

> 💡 Use `--legacy-peer-deps` flag if you encounter peer dependency errors.

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📸 Features Walkthrough

### 🔐 Authentication

| Feature | Description |
|---------|-------------|
| Sign Up | Create a new account with email and password |
| Sign In | Secure login with JWT authentication |
| Persistent Sessions | Stay logged in with redux-persist |

### 📁 Project Management

| Feature | Description |
|---------|-------------|
| Create Projects | Set up new projects with name and description |
| Project Dashboard | Overview with task statistics and team info |
| Team Members | Add and manage project collaborators |

### ✅ Task Management

| Feature | Description |
|---------|-------------|
| **Kanban Board** | Drag-and-drop task organization |
| **List View** | Traditional task list with filters |
| **Task Details** | Full task information in drawer panel |
| **Task Status** | Track progress (To Do, In Progress, Done, etc.) |
| **Task Priority** | Set priority levels (Low, Medium, High, Critical) |
| **Deadlines** | Set and track task due dates |
| **Assignments** | Assign tasks to team members |
| **Comments** | Collaborate through task discussions |

### 📊 Dashboard & Analytics

| Feature | Description |
|---------|-------------|
| Task Statistics | Total, In Progress, Completed counts |
| Team Overview | Member count and activity |
| Visual Charts | Line and Bar charts with ApexCharts |

---

## 🔗 API Integration

This frontend connects to the **Task Management Backend API**. Ensure the backend is running before starting the frontend.

### API Endpoints Used

| Category | Endpoints |
|----------|-----------|
| **Auth** | `/api/users/signup`, `/api/users/login` |
| **Projects** | `/api/projects`, `/api/projects/:id/member` |
| **Tasks** | `/api/tasks`, `/api/projects/:id/tasks` |
| **Comments** | `/api/tasks/:id/comments`, `/api/comments/:id` |
| **Metrics** | `/api/projects/:id/statistics` |

---

## 🏗️ Architecture

### State Management

The application uses **Redux Toolkit** for centralized state management:

- `authSlice` - User authentication state
- `projectSlice` - Projects list and operations
- `currentProjectSlice` - Active project context
- `projectTasksSlice` - Tasks within current project
- `commentsSlice` - Task comments
- `taskStatusesSlice` - Available task statuses
- `taskPrioritiesSlice` - Available priority levels
- `projectMembersSlice` - Project team members

### Styling Approach

- **Tailwind CSS v4** for utility-first styling
- **Framer Motion** for smooth animations
- **Radix UI** for accessible component primitives
- **Dark/Light theme** support via Context API

---

## 👥 Authors

| Author | GitHub |
|--------|--------|
| **Quoc An Tran** | [@tquocan04](https://github.com/tquocan04) |
| **Duc Ton Bui** | [@DUCTONBUI96](https://github.com/DUCTONBUI96) |
| **Quoc Long Tran** | [@quoclong20222428](https://github.com/quoclong20222428) |
| **Tuan Anh Do** | [@TuananhDo0308](https://github.com/TuananhDo0308) |
| **Hong Anh Le** | [@anhlehong](https://github.com/anhlehong) |

---

## 📄 License

This project is developed for educational purposes as part of the Advanced Software Engineering course.

---

<div align="center">
  <p>
    <strong>Built with ❤️ by Quoc An Tran, Duc Ton Bui, Quoc Long Tran, Tuan Anh Do, and Hong Anh Le</strong><br>
  </p>
</div>