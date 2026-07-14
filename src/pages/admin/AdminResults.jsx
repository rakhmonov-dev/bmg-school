import React, { useEffect, useState } from 'react';
import api from '../../api/client';

export default function AdminResults() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/test/results').then((res) => setItems(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-topbar">
        <h1>Test natijalari</h1>
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
                <th>Natija</th>
                <th>Daraja</th>
                <th>Sana</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id}>
                  <td>{r.full_name}</td>
                  <td>{r.phone}</td>
                  <td>{r.score} / {r.total}</td>
                  <td><span className="status-pill status-enrolled">{r.determined_level}</span></td>
                  <td>{new Date(r.created_at).toLocaleDateString('uz-UZ')}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--ink-400)' }}>Natijalar yo'q</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
