import React from 'react';
import { demoInitiatives } from '../demoData';
import { Sun, Wind, Zap, ArrowRight } from 'lucide-react';

const ICONS = { Sun, Wind, Zap };

export default function InitiativesSection() {
  return (
    <section className="py-20">
      <div className="container-lg">
        <h2 className="text-2xl font-extrabold text-center mb-4">Key Renewable Initiatives in India</h2>
        <p className="text-center text-slate-600 mb-8">Exploring major policy decisions and projects driving India's sustainable energy transition.</p>

        <div className="space-y-12">
          {demoInitiatives.map(i => {
            const Icon = ICONS[i.icon] || Sun;
            return (
              <div key={i.id} className={`flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden bg-gray-50 dark:bg-slate-800`}>
                <div className="md:w-1/2">
                  <img src={i.image} alt={i.title} className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center gap-4">
                  <Icon className="w-10 h-10 text-emerald-500" />
                  <h3 className="text-2xl font-semibold">{i.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{i.text}</p>
                  <div className="mt-4 text-emerald-600 inline-flex items-center gap-2 cursor-pointer">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
