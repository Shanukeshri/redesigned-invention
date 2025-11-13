import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [idx, setIdx] = useState(0);
  const taglines = [
    "Powering Tomorrow. Today.",
    "Sustainable Energy for a Brighter Future.",
    "The Sun is Our Biggest Partner."
  ];
  useEffect(() => {
    const t = setInterval(()=> setIdx(v => (v+1) % taglines.length), 5000);
    return ()=> clearInterval(t);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[80vh] bg-[url('https://placehold.co/1400x800/22C55E/ffffff?text=Renewable+Energy+Landscape')] bg-cover bg-center flex items-center">
      <div className="absolute inset-0 bg-slate-900/50"></div>
      <div className="container-lg relative z-10 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          <span className="hero-tagline">{taglines[idx]}</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-light mb-6">Join the global movement toward net-zero emissions. Invest in clean, reliable power for a sustainable planet.</p>
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-6 py-3 rounded-full font-bold shadow">
            Start Your Green Journey <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
