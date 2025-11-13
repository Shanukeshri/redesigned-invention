import React from 'react';
import HeroSection from '../sections/HeroSection';
import LiveStatsWidget from '../sections/LiveStatsWidget';
import InitiativesSection from '../sections/InitiativesSection';
import GetInvolvedSection from '../sections/GetInvolvedSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import { demoProjects } from '../demoData';

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <LiveStatsWidget />
      <InitiativesSection />
      <section className="container-lg">
        <h2 className="text-2xl font-extrabold mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {demoProjects.map(p => (
            <div key={p._id} className="p-4 bg-white dark:bg-slate-800 rounded shadow">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm">{p.location.state} • {p.type}</p>
            </div>
          ))}
        </div>
      </section>
      <GetInvolvedSection />
      <TestimonialsSection />
    </div>
  );
}
