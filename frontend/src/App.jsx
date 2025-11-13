import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectEditor from './pages/ProjectEditor';
import Carbon from './pages/Carbon';
import AI from './pages/AI';
import Financing from './pages/Financing';
import LocalGovtOnboarding from './pages/LocalGovtOnboarding';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-rn-dark dark:text-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={
              <ProtectedRoute roles={['govt','sme','admin']}>
                <ProjectEditor />
              </ProtectedRoute>
            } />
            <Route path="/projects/:id/edit" element={
              <ProtectedRoute roles={['govt','sme','admin']}>
                <ProjectEditor />
              </ProtectedRoute>
            } />
            <Route path="/carbon" element={<Carbon />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/onboarding" element={<LocalGovtOnboarding />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <CitizenDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
