import React, { useEffect, useState } from 'react';
import { publicApi } from '../api/ApiClient';

export default function AdminPanel() {
  const [stats, setStats] = useState({ users: 0, projects: 0 });
  useEffect(()=> {
    // For now demo stats:
    setStats({ users: 2345, projects: 456 });
  }, []);
  return (
    <section className="container-lg py-10">
      <h2 className="text-2xl font-extrabold mb-4">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
          <div className="text-sm text-slate-500">Total Users</div>
          <div className="text-3xl font-bold">{stats.users}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
          <div className="text-sm text-slate-500">Total Projects</div>
          <div className="text-3xl font-bold">{stats.projects}</div>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-slate-800 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Audit Logs (demo)</h3>
        <div className="text-sm text-slate-500">Recent actions and system logs will appear here.</div>
      </div>
    </section>
  );
}
