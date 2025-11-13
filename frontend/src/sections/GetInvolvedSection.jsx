import React from 'react';

export default function GetInvolvedSection() {
  return (
    <section className="py-16 bg-emerald-700 text-white">
      <div className="container-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-6">
          <h3 className="text-3xl font-extrabold mb-3">Be the Change: Take Action Now</h3>
          <p className="mb-4 text-lg">Every individual choice contributes to a cleaner grid. Explore opportunities to partner with us, invest in projects, or switch to cleaner energy options today.</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-full font-semibold">Get Involved</button>
            <a href="/onboarding" className="px-4 py-2 border rounded-full">Onboard Local Govt</a>
          </div>
        </div>
        <div>
          <img src="https://placehold.co/800x600/10B981/ffffff?text=Community+Project" alt="Community" className="w-full h-64 md:h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
