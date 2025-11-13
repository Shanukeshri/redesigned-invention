import React from 'react';
import { testimonialData } from '../demoData';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const doubled = [...testimonialData, ...testimonialData];
  return (
    <section className="py-12 bg-gray-50 dark:bg-slate-900">
      <div className="container-lg">
        <h2 className="text-2xl font-extrabold text-center mb-6">What Our Partners Say</h2>
        <div className="marquee">
          <div className="marquee-track">
            {doubled.map((t, idx) => (
              <div key={idx} className="min-w-[300px] bg-white dark:bg-slate-800 rounded-xl p-4 mr-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <div className="font-semibold">{t.name}</div>
                </div>
                <p className="italic text-sm text-slate-600 dark:text-slate-300">"{t.quote}"</p>
                <div className="mt-3 text-xs uppercase text-emerald-600">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
