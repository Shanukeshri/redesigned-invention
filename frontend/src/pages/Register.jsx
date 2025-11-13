import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [payload, setPayload] = useState({ name:'', email:'', password:'', role:'citizen' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(payload);
      nav('/');
    } catch (err) {
      alert(err.message || 'Register failed');
    }
  };

  return (
    <section className="container-lg py-10">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={submit} className="space-y-3">
          <input placeholder="Name" value={payload.name} onChange={e=>setPayload({...payload, name: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <input placeholder="Email" value={payload.email} onChange={e=>setPayload({...payload, email: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <input type="password" placeholder="Password" value={payload.password} onChange={e=>setPayload({...payload, password: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <select value={payload.role} onChange={e=>setPayload({...payload, role: e.target.value})} className="w-full px-3 py-2 border rounded">
            <option value="citizen">Citizen</option>
            <option value="sme">SME</option>
            <option value="govt">Govt</option>
            <option value="investor">Investor</option>
            <option value="ngo">NGO</option>
          </select>
          <div className="flex justify-end gap-2">
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">Register</button>
          </div>
        </form>
      </div>
    </section>
  );
}
