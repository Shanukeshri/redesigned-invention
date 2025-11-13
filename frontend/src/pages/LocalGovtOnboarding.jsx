import React, { useState } from 'react';
import { publicApi } from '../api/ApiClient';

export default function LocalGovtOnboarding() {
  const [form, setForm] = useState({ name: '', state: '', district: '', contact: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // In production we'd POST to /api/localgov or similar. Here we just show success.
    setSubmitted(true);
  };

  return (
    <section className="container-lg py-10">
      <h2 className="text-2xl font-extrabold mb-4">Local Government & SME Onboarding</h2>
      {!submitted ? (
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-800 p-6 rounded shadow">
          <input placeholder="Organization Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="px-3 py-2 border rounded" />
          <input placeholder="Contact Person" value={form.contact} onChange={e=>setForm({...form, contact:e.target.value})} className="px-3 py-2 border rounded" />
          <input placeholder="State" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} className="px-3 py-2 border rounded" />
          <input placeholder="District" value={form.district} onChange={e=>setForm({...form, district:e.target.value})} className="px-3 py-2 border rounded" />
          <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="px-3 py-2 border rounded" />
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">Apply</button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
          <h3 className="font-semibold">Application received</h3>
          <p>Thank you. We'll review your onboarding request and reach out to {form.email}.</p>
        </div>
      )}
    </section>
  );
}
