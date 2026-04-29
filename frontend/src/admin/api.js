import { API } from '../config.js';

const BASE = API.replace('/api', '') + '/api/admin';

function headers() {
  const token = localStorage.getItem('btcons_admin_token');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

async function req(method, path, body) {
  const res = await fetch(BASE + path, { method, headers: headers(), body: body ? JSON.stringify(body) : undefined });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const adminApi = {
  login:   (u, p)   => req('POST', '/login', { username: u, password: p }),
  // content
  getContent:         () => req('GET', '/content'),
  putContent: (k, v) => req('PUT', `/content/${k}`, { value: v }),
  // upload
  uploadImage: async (file) => {
    const token = localStorage.getItem('btcons_admin_token');
    const form = new FormData(); form.append('image', file);
    const res = await fetch(BASE + '/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  },
  // projects
  getProjects:    ()       => req('GET',    '/projects'),
  createProject:  (body)   => req('POST',   '/projects', body),
  updateProject:  (id, b)  => req('PUT',    `/projects/${id}`, b),
  deleteProject:  (id)     => req('DELETE', `/projects/${id}`),
  // news
  getNews:        ()       => req('GET',    '/news'),
  createNews:     (body)   => req('POST',   '/news', body),
  updateNews:     (id, b)  => req('PUT',    `/news/${id}`, b),
  deleteNews:     (id)     => req('DELETE', `/news/${id}`),
  // jobs
  getJobs:        ()       => req('GET',    '/jobs'),
  createJob:      (body)   => req('POST',   '/jobs', body),
  updateJob:      (id, b)  => req('PUT',    `/jobs/${id}`, b),
  deleteJob:      (id)     => req('DELETE', `/jobs/${id}`),
  // contacts
  getContacts:    ()       => req('GET',    '/contacts'),
  deleteContact:  (id)     => req('DELETE', `/contacts/${id}`),
};
