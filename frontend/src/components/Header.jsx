import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = [
    { name: 'Home', to: '/' },
    { name: 'Projects', to: '/projects' },
    { name: 'Carbon', to: '/carbon' },
    { name: 'AI', to: '/ai' },
    { name: 'Financing', to: '/financing' },
    { name: 'Onboarding', to: '/onboarding' }
  ];
  return (
    <header className="bg-white/90 backdrop-blur sticky top-0 z-40 shadow-sm">
      <div className="container-lg flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-emerald-700 font-extrabold">
          <Leaf className="w-7 h-7 text-emerald-500" />
          RenewNet
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map(n => <Link key={n.name} to={n.to} className="text-slate-700 hover:text-emerald-600">{n.name}</Link>)}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:inline text-sm text-slate-700">{user.name} ({user.role})</span>
              <button onClick={logout} className="text-sm px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="text-sm px-3 py-1 bg-emerald-600 text-white rounded">Register</Link>
            </>
          )}
          <button className="md:hidden p-2" onClick={()=>setOpen(!open)} aria-label="menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="container-lg flex flex-col py-3">
            {nav.map(n => <Link key={n.name} to={n.to} onClick={()=>setOpen(false)} className="py-2">{n.name}</Link>)}
            <div className="mt-2 flex gap-2">
              <Link to="/login" onClick={()=>setOpen(false)} className="px-3 py-2 border rounded">Login</Link>
              <Link to="/register" onClick={()=>setOpen(false)} className="px-3 py-2 bg-emerald-600 text-white rounded">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
