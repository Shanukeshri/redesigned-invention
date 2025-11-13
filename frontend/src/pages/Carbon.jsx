import React, { useEffect, useState } from 'react';
import { carbon as carbonApi } from '../api/ApiClient';
import { demoCarbonReports } from '../demoData';

function CarbonCard({ r, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{r.projectId || r.entityId}</div>
          <div className="text-sm text-slate-500 dark:text-slate-300">{r.periodStart} — {r.periodEnd}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{r.emissionsCO2eKg} kg</div>
          <button onClick={()=>onDelete && onDelete(r._id)} className="text-sm text-red-600 mt-2">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function Carbon() {
  const [list, setList] = useState(demoCarbonReports);
  useEffect(()=> {
    carbonApi.list().then(r => { if (r?.success) setList(r.data); }).catch(()=>{});
  }, []);

  const handleDelete = async (id) => {
    setList(prev => prev.filter(x=>x._id !== id));
    try { await carbonApi.delete(id); } catch (err) { console.error(err); }
  };

  return (
    <section className="container-lg py-10">
      <h2 className="text-2xl font-extrabold mb-6">Carbon Tracking & Reporting</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(r => <CarbonCard key={r._id} r={r} onDelete={handleDelete} />)}
      </div>
    </section>
  );
}
