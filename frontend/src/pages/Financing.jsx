import React, { useEffect, useState } from 'react';
import { investments as investmentsApi, projects as projectsApi } from '../api/ApiClient';
import { demoInvestments, demoProjects } from '../demoData';

function InvestmentCard({ inv, onCancel }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">Project: {inv.projectId}</div>
          <div className="text-sm text-slate-500">{inv.createdAt}</div>
        </div>
        <div className="text-right">
          <div className="font-bold">₹{inv.amount}</div>
          <div className="text-sm">{inv.status}</div>
          {inv.status !== 'cancelled' && <button onClick={()=>onCancel(inv._id)} className="text-sm text-red-600 mt-2">Cancel</button>}
        </div>
      </div>
    </div>
  );
}

export default function Financing() {
  const [investments, setInvestments] = useState(demoInvestments);
  const [projects, setProjects] = useState(demoProjects);
  const [selectedProject, setSelectedProject] = useState(demoProjects[0]._id);
  const [amount, setAmount] = useState(100000);

  useEffect(()=> {
    investmentsApi.list().then(r => { if (r?.success) setInvestments(r.data); }).catch(()=>{});
    projectsApi.list().then(r => { if (r?.success) setProjects(r.data); }).catch(()=>{});
  }, []);

  const invest = async () => {
    try {
      const res = await investmentsApi.create({ projectId: selectedProject, amount });
      if (res?.success) setInvestments(prev => [res.data, ...prev]);
    } catch (err) { console.error(err); alert('Investment failed'); }
  };

  const cancel = async (id) => {
    setInvestments(prev => prev.map(p => p._id === id ? {...p, status: 'cancelled'} : p));
    try { await investmentsApi.delete(id); } catch (err) { console.error(err); }
  };

  return (
    <section className="container-lg py-10">
      <h2 className="text-2xl font-extrabold mb-4">Financing & Investment Hub</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
          <h3 className="font-semibold mb-2">Invest in a Project</h3>
          <select value={selectedProject} onChange={e=>setSelectedProject(e.target.value)} className="w-full px-3 py-2 border rounded mb-3">
            {projects.map(p => <option key={p._id} value={p._id}>{p.name} — {p.type}</option>)}
          </select>
          <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="w-full px-3 py-2 border rounded mb-3" />
          <button onClick={invest} className="px-4 py-2 bg-emerald-600 text-white rounded">Invest Now</button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Your Investments</h3>
          <div className="space-y-3">
            {investments.map(inv => <InvestmentCard key={inv._id} inv={inv} onCancel={cancel} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
