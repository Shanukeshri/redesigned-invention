import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-200">
      <div className="container-lg grid grid-cols-1 md:grid-cols-4 gap-6 py-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="font-bold">RenewNet</span>
          </div>
          <p className="text-sm text-gray-300">Accelerating renewable adoption with transparent carbon intelligence.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/projects" className="hover:text-white">Projects</a></li>
            <li><a href="/ai" className="hover:text-white">AI Forecasts</a></li>
            <li><a href="/financing" className="hover:text-white">Financing Hub</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">info@renewnet.org</p>
          <p className="text-sm">+91 80000 00000</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Get Started</h4>
          <p className="text-sm">Join our network of municipalities, SMEs and investors.</p>
          <button className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded">Partner Today</button>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} RenewNet. All rights reserved.
      </div>
    </footer>
  );
}
