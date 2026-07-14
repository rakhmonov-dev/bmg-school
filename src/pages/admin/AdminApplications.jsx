import React, { useEffect, useState } from 'react';
import api from '../../api/client';

const STATUS_LABELS = {
  new: 'Yangi',
  contacted: "Bog'lanildi",
  enrolled: "Ro'yxatdan o'tdi",
  declined: 'Rad etildi',
};

export default function AdminApplications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  function load() {
    setLoading(true);
    api.get('/applications').then((res) => setItems(res.data)).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await api.patch(`/applications/${id}/status`, { status });
    load();
  }

  async function remove(id) {
    if (!window.confirm("Bu arizani o'chirishga ishonchingiz komilmi?")) return;
    await api.delete(`/applications/${id}`);
    load();
  }

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter);

  return (
    <div>
      <div className="admin-topbar">
        <h1>Arizalar</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--cream-200)' }}>
          <option value="all">Barchasi</option>
          <option value="new">Yangi</option>
          <option value="contacted">Bog'lanildi</option>
          <option value="enrolled">Ro'yxatdan o'tdi</option>
          <option value="declined">Rad etildi</option>
        </select>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: 24 }}>Yuklanmoqda...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ism</th>
                <th>Telefon</th>
                <th>Kurs</th>
                <th>Vaqt</th>
                <th>Sana</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td>{app.full_name}</td>
                  <td>{app.phone}</td>
                  <td>{app.course_title || '—'}</td>
                  <td>{app.preferred_time || '—'}</td>
                  <td>{new Date(app.created_at).toLocaleDateString('uz-UZ')}</td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className={`status-pill status-${app.status}`}
                      style={{ border: 'none', background: 'transparent', fontWeight: 600 }}
                    >
                      {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(app.id)}>O'chirish</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center', color: 'var(--ink-400)' }}>Arizalar topilmadi</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
