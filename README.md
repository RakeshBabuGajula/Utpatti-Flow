# Utpatti Flow – SDLC Project Management Utility

## Project Overview
Utpatti Flow is a high-level project management system designed to visually demonstrate the Software Development Life Cycle (SDLC). It features a Kanban-style workflow, real-time task tracking, and a comprehensive history log of every phase transition.

The goal is to provide a clean, production-quality tool that balances professional utility with modern, subtle 3D aesthetics.

## Tech Stack
### Frontend
- **React.js**: Functional components with Hooks.
- **CSS3**: Custom styling with Glassmorphism and subtle 3D effects.
- **Context API**: For state management of tasks and users.

### Backend
- **Node.js & Express.js**: Robust RESTful API services.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM for strict schema modeling.

### Key Features
- **SDLC Kanban Board**: Drag-and-drop tasks across Backlog, Design, Development, Testing, Deployment, and Done.
- **Task History**: Detailed audit log of every movement.
- **User Management**: Create and assign users to tasks.
- **Modern UI**: Startup-grade aesthetics with depth and modern interactions.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

### Installation
1. Clone the repository.
2. Install Server Dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install Client Dependencies:
   ```bash
   cd client
   npm install
   ```
4. Configure Environment:
   - Create `.env` in `server/` with `MONGO_URI` and `PORT`.

### Running the App
- **Server**: `npm start` (or `npm run dev`)
- **Client**: `npm run dev`

## Architecture Design
- **Controller-Service Pattern**: Business logic is separated from HTTP handling.
- **Clean Architecture**: scalable folder structure.

## Future Improvements
- Migration to Next.js for SSR.
- Integration with external tools (Jira, GitHub).
- Mobile version with Flutter.
