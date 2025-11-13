import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth() || {};
  return (
    <nav className="p-4 bg-slate-800 text-white flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">RenewNet</Link>
        <Link to="/projects" className="hidden sm:inline">Projects</Link>
        <Link to="/carbon" className="hidden sm:inline">Carbon</Link>
        <Link to="/ai" className="hidden sm:inline">AI</Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle/>
        {user ? (
          <>
            <span className="text-sm hidden md:inline">{user.name} ({user.role})</span>
            <button onClick={logout} className="text-sm px-3 py-1 border rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}
