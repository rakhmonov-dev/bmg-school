import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { ADMIN_BASE } from '../../config';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('bmg_admin_token', res.data.token);
      localStorage.setItem('bmg_admin_info', JSON.stringify(res.data.admin));
      navigate(ADMIN_BASE);
    } catch (err) {
      setError(err.response?.data?.error || 'Kirishda xatolik');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <div className="brand" style={{ color: 'var(--navy-900)', marginBottom: 26 }}>
          <span className="brand-crest">BMG</span>
          <span className="brand-name" style={{ color: 'var(--navy-900)' }}>Admin panel</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@bmgschool.uz"
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
          {error && <div className="form-error" style={{ marginBottom: 16 }}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  );
}
