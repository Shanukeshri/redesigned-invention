import React, { useState, useEffect } from 'react';
import { projects as projectsApi } from '../api/ApiClient';
import { useParams, useNavigate } from 'react-router-dom';
import { demoProjects } from '../demoData';

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '', type: 'solar', capacityMW: 0.0,
    status: 'draft', location: { state: '', district: '' }, funding: { required: 0, raised: 0 }
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if (id) {
      const found = demoProjects.find(d=>d._id === id);
      if (found) setProject(found);
      // fetch real
      projectsApi.get(id).then(r=> { if (r?.success) setProject(r.data); }).catch(()=>{});
    }
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await projectsApi.update(id, project);
      } else {
        await projectsApi.create(project);
      }
      navigate('/projects');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally { setLoading(false); }
  };

  return (
    <section className="container-lg py-8">
      <h2 className="text-2xl font-extrabold mb-4">{id ? 'Edit Project' : 'Create Project'}</h2>
      <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={project.name} onChange={e=>setProject({...project, name: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select value={project.type} onChange={e=>setProject({...project, type: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded">
            <option value="solar">Solar</option>
            <option value="wind">Wind</option>
            <option value="battery">Battery</option>
            <option value="microgrid">Microgrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Capacity (MW)</label>
          <input type="number" value={project.capacityMW} onChange={e=>setProject({...project, capacityMW: parseFloat(e.target.value) || 0})} className="mt-1 w-full px-3 py-2 border rounded"/>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select value={project.status} onChange={e=>setProject({...project, status: e.target.value})} className="mt-1 w-full px-3 py-2 border rounded">
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <input value={project.location?.state || ''} onChange={e=>setProject({...project, location: {...project.location, state: e.target.value}})} className="mt-1 w-full px-3 py-2 border rounded"/>
        </div>

        <div>
          <label className="block text-sm font-medium">District</label>
          <input value={project.location?.district || ''} onChange={e=>setProject({...project, location: {...project.location, district: e.target.value}})} className="mt-1 w-full px-3 py-2 border rounded"/>
        </div>

        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <button type="button" onClick={()=>navigate('/projects')} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded">{loading ? 'Saving...' : 'Save Project'}</button>
        </div>
      </form>
    </section>
  );
}
