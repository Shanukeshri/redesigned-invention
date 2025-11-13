import React, { useEffect, useState } from 'react';
import { projects as projectsApi } from '../api/ApiClient';
import ProjectCard from '../components/ProjectCard';
import { demoProjects } from '../demoData';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [list, setList] = useState(demoProjects);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    projectsApi.list().then(r => {
      if (r?.success && Array.isArray(r.data)) setList(r.data);
    }).catch(()=>{}).finally(()=> setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    // optimistic remove
    setList(prev => prev.filter(p => p._id !== id));
    try { await projectsApi.delete(id); } catch (err) { console.error(err); }
  };

  const handleEdit = (project) => {
    window.location.href = `/projects/${project._id}/edit`;
  };

  return (
    <section className="container-lg py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold">Project Management</h2>
        <div className="flex items-center gap-3">
          {user && (['govt','sme','admin'].includes(user.role)) && (
            <Link to="/projects/new" className="px-4 py-2 bg-emerald-600 text-white rounded">Create Project</Link>
          )}
          <Link to="/financing" className="px-4 py-2 border rounded">Go to Financing Hub</Link>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list.map(p => <ProjectCard key={p._id} project={p} onDelete={handleDelete} onEdit={handleEdit} />)}
        </div>
      )}
    </section>
  );
}
