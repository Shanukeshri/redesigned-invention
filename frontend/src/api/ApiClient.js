const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const AI_BASE = import.meta.env.VITE_AI_BASE_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  const json = await res.json().catch(() => null);
  return json;
}

export const auth = {
  register: (payload) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/api/auth/me')
};

export const projects = {
  list: (q = '') => request(`/api/projects${q ? '?'+q : ''}`),
  get: (id) => request(`/api/projects/${id}`),
  create: (payload) => request('/api/projects', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/api/projects/${id}`, { method: 'DELETE' })
};

export const carbon = {
  list: (q='') => request(`/api/carbon${q ? '?'+q : ''}`),
  create: (payload) => request('/api/carbon', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/api/carbon/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/api/carbon/${id}`, { method: 'DELETE' })
};

export const investments = {
  list: () => request('/api/investments'),
  create: (payload) => request('/api/investments', { method: 'POST', body: JSON.stringify(payload) }),
  delete: (id) => request(`/api/investments/${id}`, { method: 'DELETE' })
};

export const publicApi = {
  renewablePotential: () => request('/api/public/renewable-potential'),
  weather: (q) => request(`/api/public/weather?${q}`),
  training: () => request('/api/public/training')
};

export const external = {
  discom: () => request('/api/external/discom'),
  iot: (deviceId, q='') => request(`/api/external/iot/${deviceId}${q ? '?'+q : ''}`),
  policyTargets: () => request('/api/external/policy-targets'),
  subsidies: () => request('/api/external/subsidies')
};

export const ai = {
  renewableForecast: (payload) => request('/api/ai/renewable-forecast', { method: 'POST', body: JSON.stringify(payload) }),
  carbonProjection: (payload) => request('/api/ai/carbon-projection', { method: 'POST', body: JSON.stringify(payload) }),
  policyImpact: (payload) => request('/api/ai/policy-impact', { method: 'POST', body: JSON.stringify(payload) })
};

export default {
  auth, projects, carbon, investments, publicApi, ai, external
};
