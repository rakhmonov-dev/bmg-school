import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import api from '../../api/client';

const emptyForm = {
  question_text: '', option_a: '', option_b: '', option_c: '', option_d: '',
  correct_option: 'a', level: 'A1', sort_order: 0, is_active: 1,
};

export default function AdminQuestions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  function load() {
    setLoading(true);
    api.get('/test/questions/all').then((res) => setItems(res.data)).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm({ ...item });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (editing) {
      await api.put(`/test/questions/${editing.id}`, form);
    } else {
      await api.post('/test/questions', form);
    }
    setModalOpen(false);
    load();
  }

  async function remove(id) {
    if (!window.confirm("Bu savolni o'chirishga ishonchingiz komilmi?")) return;
    await api.delete(`/test/questions/${id}`);
    load();
  }

  return (
    <div>
      <div className="admin-topbar">
        <h1>Test savollari</h1>
        <button className="btn btn-primary btn-sm" onClick={openCreate}>+ Yangi savol</button>
      </div>

      <div className="admin-card">
        {loading ? (
          <p style={{ padding: 24 }}>Yuklanmoqda...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Savol</th>
                <th>Daraja</th>
                <th>To'g'ri javob</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((q) => (
                <tr key={q.id}>
                  <td style={{ maxWidth: 320 }}>{q.question_text}</td>
                  <td>{q.level}</td>
                  <td style={{ textTransform: 'uppercase' }}>{q.correct_option}</td>
                  <td>
                    <span className={`status-pill ${q.is_active ? 'status-enrolled' : 'status-declined'}`}>
                      {q.is_active ? 'Faol' : 'Yashirilgan'}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(q)}>Tahrirlash</button>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(q.id)}>O'chirish</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--ink-400)' }}>Savollar yo'q</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Savolni tahrirlash' : 'Yangi savol'}</h3>
              <button type="button" className="modal-close" onClick={() => setModalOpen(false)} aria-label="Yopish">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-row">
                <label>Savol matni *</label>
                <textarea required rows="2" value={form.question_text} onChange={(e) => setForm({ ...form, question_text: e.target.value })} />
              </div>
              <div className="form-grid-2">
                <div className="form-row">
                  <label>Variant A *</label>
                  <input required value={form.option_a} onChange={(e) => setForm({ ...form, option_a: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Variant B *</label>
                  <input required value={form.option_b} onChange={(e) => setForm({ ...form, option_b: e.target.value })} />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-row">
                  <label>Variant C *</label>
                  <input required value={form.option_c} onChange={(e) => setForm({ ...form, option_c: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Variant D *</label>
                  <input required value={form.option_d} onChange={(e) => setForm({ ...form, option_d: e.target.value })} />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-row">
                  <label>To'g'ri javob *</label>
                  <select value={form.correct_option} onChange={(e) => setForm({ ...form, correct_option: e.target.value })}>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Daraja *</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                  </select>
                </div>
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
