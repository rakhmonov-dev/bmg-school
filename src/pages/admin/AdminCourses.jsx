import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import api from '../../api/client';

const emptyForm = {
  title: '', level_range: '', format: '', duration: '', price: '', description: '', icon_key: 'book', sort_order: 0, is_active: 1,
};

export default function AdminCourses() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  function load() {
    setLoading(true);
    api.get('/courses/all').then((res) => setItems(res.data)).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(course) {
    setEditing(course);
    setForm({ ...course });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (editing) {
      await api.put(`/courses/${editing.id}`, form);
    } else {
      await api.post('/courses', form);
    }
    setModalOpen(false);
    load();
  }

  async function remove(id) {
    if (!window.confirm("Bu kursni o'chirishga ishonchingiz komilmi?")) return;
    await api.delete(`/courses/${id}`);
    load();
  }

  return (
    <div>
      <div className="admin-topbar">
        <h1>Kurslar</h1>
        <button className="btn btn-primary btn-sm" onClick={openCreate}>+ Yangi kurs</button>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: 24 }}>Yuklanmoqda...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Daraja</th>
                <th>Davomiylik</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.level_range}</td>
                  <td>{c.duration || '—'}</td>
                  <td>
                    <span className={`status-pill ${c.is_active ? 'status-enrolled' : 'status-declined'}`}>
                      {c.is_active ? 'Faol' : 'Yashirilgan'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(c)}>Tahrirlash</button>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(c.id)}>O'chirish</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--ink-400)' }}>Kurslar yo'q</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Kursni tahrirlash' : 'Yangi kurs'}</h3>
              <button type="button" className="modal-close" onClick={() => setModalOpen(false)} aria-label="Yopish">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-row">
                <label>Nomi *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-grid-2">
                <div className="form-row">
                  <label>Daraja oralig'i *</label>
                  <input required value={form.level_range} onChange={(e) => setForm({ ...form, level_range: e.target.value })} placeholder="A1-A2" />
                </div>
                <div className="form-row">
                  <label>Davomiylik</label>
                  <input value={form.duration || ''} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="4 oy" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-row">
                  <label>Format</label>
                  <input value={form.format || ''} onChange={(e) => setForm({ ...form, format: e.target.value })} placeholder="Guruh, haftada 3 kun" />
                </div>
                <div className="form-row">
                  <label>Narx (matn)</label>
                  <input value={form.price || ''} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Kelishilgan holda" />
                </div>
              </div>
              <div className="form-row">
                <label>Tavsif</label>
                <textarea rows="3" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              {editing && (
                <div className="form-row">
                  <label>Holat</label>
                  <select value={form.is_active} onChange={(e) => setForm({ ...form, is_active: Number(e.target.value) })}>
                    <option value={1}>Faol</option>
                    <option value={0}>Yashirilgan</option>
                  </select>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="submit" className="btn btn-primary">Saqlash</button>
                <button type="button" className="btn btn-outline-dark" onClick={() => setModalOpen(false)}>Bekor qilish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
