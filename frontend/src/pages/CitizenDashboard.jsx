import React, { useEffect, useState } from 'react';
import { publicApi } from '../api/ApiClient';

export default function CitizenDashboard() {
  // Simple personal emission tracker demo
  const [profile, setProfile] = useState({ name: 'Demo Citizen', household: 4 });
  const [emissions, setEmissions] = useState(3.4); // tCO2e/year
  useEffect(()=> {
    // Optionally fetch personalized data
  }, []);

  return (
    <section className="container-lg py-10">
      <h2 className="text-2xl font-extrabold mb-4">Citizen Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <div className="text-sm text-slate-500">Household Size</div>
          <div className="text-xl font-bold">{profile.household}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <div className="text-sm text-slate-500">Annual Emissions</div>
          <div className="text-xl font-bold">{emissions} tCO₂e</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <div className="text-sm text-slate-500">Actions to reduce</div>
          <ul className="list-disc pl-5">
            <li>Install rooftop solar</li>
            <li>Improve home insulation</li>
            <li>Use energy-efficient appliances</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
