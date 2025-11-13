import React, { useState, useEffect } from 'react';
import { Zap, Globe, CheckCircle } from 'lucide-react';
import { fetchLiveStats } from '../utils/fetchLiveStats';
import { demoAIResponse } from '../demoData';

export default function LiveStatsWidget() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    setLoading(true);
    fetchLiveStats("India's renewable energy statistics", setStats).finally(()=> setLoading(false));
  }, []);

  const items = stats ? [
    { label: "Renewable Capacity", value: `${stats.renewableCapacityGW} GW`, icon: Zap, color: 'text-emerald-600', progress: Math.min((stats.renewableCapacityGW/400)*100, 100) },
    { label: "CO₂ Emissions Saved", value: `${stats.co2SavedMillionTons} MT`, icon: CheckCircle, color: 'text-sky-600', progress: Math.min((stats.co2SavedMillionTons/50)*100, 100) },
    { label: "Active Projects", value: `${stats.activeProjects}`, icon: Globe, color: 'text-yellow-600', progress: Math.min((stats.activeProjects/10000)*100, 100) }
  ] : [];

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="container-lg">
        <h2 className="text-2xl font-extrabold text-center mb-6">India's Renewable Energy Impact (Live Mock Data)</h2>

        {loading ? (
          <div className="text-center">Loading live data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((it, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
                <div className="flex items-center gap-4">
                  <it.icon className={`w-12 h-12 ${it.color}`} />
                  <div>
                    <div className="text-3xl font-bold">{it.value}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-300 uppercase">{it.label}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="stat-progress mt-2">
                    <div className="fg" style={{ width: `${it.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
