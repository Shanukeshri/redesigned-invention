import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProjectCard({ project, onDelete, onEdit }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{project.name}</h3>
          <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">{project.type}</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{project.location?.state} • {project.location?.district}</p>
        <p className="text-sm mt-2">Capacity: {project.capacityMW} MW</p>
        <p className="text-sm mt-1">Status: <strong>{project.status}</strong></p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={()=>onEdit && onEdit(project)} className="px-3 py-1 border rounded">Edit</button>
          <button onClick={()=>onDelete && onDelete(project._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
        </div>
        <button className="flex items-center gap-2 text-emerald-600">
          Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
