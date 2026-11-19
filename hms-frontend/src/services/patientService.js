const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
});

const handleResponse = async (res) => {
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Request failed');
  return json.data;
};

export const patientService = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== undefined && v !== null))
    ).toString();
    return fetch(`${API_BASE}/patients${qs ? '?' + qs : ''}`, { headers: getAuthHeader() }).then(handleResponse);
  },
  
  getById: (id) =>
    fetch(`${API_BASE}/patients/${id}`, { headers: getAuthHeader() }).then(handleResponse),

  getSummary: (id) =>
    fetch(`${API_BASE}/patients/${id}/summary`, { headers: getAuthHeader() }).then(handleResponse),

  create: (data) =>
    fetch(`${API_BASE}/patients`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (id, data) =>
    fetch(`${API_BASE}/patients/${id}`, {
      method: 'PATCH',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${API_BASE}/patients/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    }).then((res) => { if (!res.ok) throw new Error('Delete failed'); }),
};
