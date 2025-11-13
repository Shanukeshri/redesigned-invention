import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <section className="container-lg py-10">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          <div className="flex justify-end gap-2">
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
}
