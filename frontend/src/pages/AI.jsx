import React, { useState } from 'react';
import { ai as aiApi } from '../api/ApiClient';
import { demoAIResponse } from '../demoData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AI() {
  const [state, setState] = useState('Gujarat');
  const [out, setOut] = useState(demoAIResponse);
  const [loading, setLoading] = useState(false);

  const runForecast = async () => {
    setLoading(true);
    try {
      const res = await aiApi.renewableForecast({ state });
      if (res?.requestId) setOut(res);
    } catch (err) {
      console.error(err);
      alert('AI call failed, showing demo data.');
    } finally { setLoading(false); }
  };

  const series = (out.predictedGenerationMW || []).map((v, i) => ({ name: `T+${i}`, value: v }));

  return (
    <section className="container-lg py-10">
      <h2 className="text-2xl font-extrabold mb-4">AI — Renewable Forecast</h2>
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
        <div className="flex gap-3 items-center mb-4">
          <input value={state} onChange={e=>setState(e.target.value)} className="px-3 py-2 border rounded" placeholder="State"/>
          <button onClick={runForecast} disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded">{loading ? 'Running...' : 'Run Forecast'}</button>
        </div>

        <div style={{ width: '100%', height: 360 }} className="bg-white dark:bg-slate-900 p-4 rounded">
          <ResponsiveContainer>
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded">
            <div className="text-sm text-slate-500">Growth Rate</div>
            <div className="text-xl font-bold">{out.growthRatePercent}%</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded">
            <div className="text-sm text-slate-500">Top Influencers</div>
            <div className="text-lg font-semibold">{(out.topInfluencers || []).join(', ')}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded">
            <div className="text-sm text-slate-500">Target Achievement (2030)</div>
            <div className="text-xl font-bold">{out.targetAchievementForecast?.predictedAchievementPercent}%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
