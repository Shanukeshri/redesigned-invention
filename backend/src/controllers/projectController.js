import Project from '../models/Project.js';

export const listProjects = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.state) filter['location.state'] = req.query.state;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;
    const projects = await Project.find(filter).limit(200);
    res.json({ success:true, data: projects });
  } catch (err) { next(err); }
};

export const getProject = async (req, res, next) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ success:false, message:'Not found' });
    res.json({ success:true, data: p });
  } catch (err) { next(err); }
};

export const createProject = async (req, res, next) => {
  try {
    const body = req.body;
    body.ownerId = req.user._id;
    const p = await Project.create(body);
    res.json({ success:true, data: p });
  } catch (err) { next(err); }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success:false, message:'Not found' });
    // allow owner, govt or admin
    if (!req.user._id.equals(project.ownerId) && req.user.role !== 'govt' && req.user.role !== 'admin') {
      return res.status(403).json({ success:false, message:'Forbidden' });
    }
    Object.assign(project, req.body);
    await project.save();
    res.json({ success:true, data: project });
  } catch (err) { next(err); }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success:false, message:'Not found' });
    if (!req.user._id.equals(project.ownerId) && req.user.role !== 'admin') {
      return res.status(403).json({ success:false, message:'Forbidden' });
    }
    await project.remove();
    res.json({ success:true, message:'Deleted' });
  } catch (err) { next(err); }
};

