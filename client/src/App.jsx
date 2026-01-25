import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TeamPage from './pages/TeamPage';
import SettingsPage from './pages/SettingsPage';
import ProjectsPage from './pages/ProjectsPage';

// Components
import DashboardLayout from './components/DashboardLayout';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="h-full w-full">
          <ToastContainer position="bottom-right" theme="dark" autoClose={3000} hideProgressBar={true} />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="kanban" element={<KanbanBoard />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;
