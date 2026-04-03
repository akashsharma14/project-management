import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./screens/dashboard_page";
import KanbanPage from "./screens/kanban_page";   
import LandingPage from "./screens/landing_page";
import LoginPage from "./screens/login_page";
import ProfileSettings from "./screens/profile_settings";
import ProjectsPage from "./screens/projects_page";
import TaskPage from "./screens/tasks_page";
import TeamManagement from "./screens/team_manage";

export default function App() {
  return (
    <Routes>
        <Route path="/"            element={<LandingPage />} />
        <Route path="/login"            element={<LoginPage />} />
        <Route path="/profile"       element={<ProfileSettings />} />
        <Route path="/teams"     element={<TeamManagement />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/projects"    element={<ProjectsPage />} />
        <Route path="/kanban"     element={<KanbanPage />} />
        <Route path="/dashboard"    element={<DashboardPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}