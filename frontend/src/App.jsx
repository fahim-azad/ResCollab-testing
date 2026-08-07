import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage, RegisterPage, ForgotPasswordPage, EmailVerificationPage } from './pages/AuthPages';
import { DashboardPage } from './pages/DashboardPage';
import { PapersPage } from './pages/PapersPage';
import { DatasetsPage } from './pages/DatasetsPage';
import { SourceCodePage } from './pages/SourceCodePage';
import { ResearcherProfilePage } from './pages/ResearcherProfilePage';
import { SupervisorDirectoryPage } from './pages/SupervisorDirectoryPage';
import { ResearchIdeasPage } from './pages/ResearchIdeasPage';
import { OpenProjectsPage } from './pages/OpenProjectsPage';
import { LabsPage } from './pages/LabsPage';
import { CommunityPage } from './pages/CommunityPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { WorkspacePage } from './pages/WorkspacePage';
import SearchDashboard from './features/search/SearchDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        
        {/* Core App with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search" element={<SearchDashboard />} />
          <Route path="/papers" element={<PapersPage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/code" element={<SourceCodePage />} />
          <Route path="/researchers" element={<ResearcherProfilePage />} />
          <Route path="/supervisors" element={<SupervisorDirectoryPage />} />
          <Route path="/ideas" element={<ResearchIdeasPage />} />
          <Route path="/projects" element={<OpenProjectsPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          
          {/* Catch-all for mockup routes */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center py-32">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">🚧</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Module under construction</h2>
                <p className="text-gray-500">This premium feature is being designed for production.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
