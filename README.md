#  Utpatti Flow – SDLC Project Management Utility

<img width="1536" height="1024" alt="utpatti flow thumbnail" src="https://github.com/user-attachments/assets/3eda75f8-4305-4860-9154-abd3e2b37d1f" />


Utpatti Flow is a full-stack **MERN-based project management application** designed to visualize and manage the **Software Development Life Cycle (SDLC)** using a modern, intuitive, and scalable approach.

This project was built as part of an **internship selection assignment** for the **Utpatti Fellowship (Mitt Arv)** and focuses on clean architecture, real-world workflows, and user-centric design.

---

## 📌 Problem Statement

In many software teams, task tracking across different SDLC stages is fragmented and lacks transparency.  
Common challenges include:
- No clear visibility into task progress
- Difficulty tracking task ownership
- Missing history of task transitions
- Poor coordination between team members

These issues often lead to delays, inefficiency, and reduced productivity.

---

## 💡 Solution Overview

Utpatti Flow provides a **centralized platform** to:
- Visualize SDLC stages using a Kanban board
- Track tasks as they move across phases
- Maintain a complete history of task transitions
- Manage users, teams, and projects effectively

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  
- Modern dark UI with animated shader backgrounds  

### Backend
- Node.js  
- Express.js  
- RESTful API architecture  

### Database
- MongoDB (with Mongoose)

---

## ✨ Key Features

- 📊 **Dashboard** with task statistics and workflow status
- 📁 **Projects & Tasks Management**
- 🧩 **Kanban Board** for SDLC phases:
  - Design  
  - Development  
  - Testing  
  - Deployment  
  - Done  
- 🕒 **Task History Tracking** for every phase transition
- 👥 **Team Management** with role display
- ⚙️ **User Profile & Settings**
- 🎨 **Modern UI/UX** with subtle 3D shader backgrounds
- 📱 **Responsive Design**

---

## 🔁 SDLC Workflow

Each task progresses through predefined SDLC stages.  
Every transition is logged, ensuring:

- Accountability  
- Transparency  
- Complete audit trail  

This closely reflects real-world software development workflows.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)

### Clone the Repository
```bash
git clone https://github.com/RakeshBabuGajula/Utpatti-Flow.git
cd utpatti-flow
Install Dependencies
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
Environment Variables
Create a .env file in the server directory:

MONGO_URI=your_mongodb_connection_string
PORT=5000
Run the Application
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```
🔒 Security Notes

Basic API protection using CORS and middleware

Designed to support future authentication (JWT, RBAC)

🚀 Future Enhancements

Authentication & role-based access control
Notifications & activity logs
Analytics and productivity insights
Next.js or Flutter frontend
Golang / Python backend services
Cloud deployment (AWS / GCP)

🎯 Assignment Alignment

This project fulfills all assignment requirements:
✔ MERN stack usage
✔ CRUD operations
✔ SDLC visualization
✔ Task history tracking
✔ Clean, maintainable code
✔ Future-ready architecture

👤 Author

Rakesh Babu Gajula

📌 Conclusion

Utpatti Flow demonstrates strong fundamentals in full-stack development, an understanding of real-world SDLC workflows, and the ability to design and deliver a complete, scalable product.
