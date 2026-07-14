import React, { useEffect, useState } from 'react';
import api from '../api/client';

export default function ApplicationForm({ presetCourseId, presetTestResultId }) {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    course_id: presetCourseId || '',
    preferred_time: 'Kunduzi',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    api.get('/courses').then((res) => setCourses(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (presetCourseId) setForm((f) => ({ ...f, course_id: presetCourseId }));
  }, [presetCourseId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.full_name.trim() || !form.phone.trim()) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.post('/applications', {
        ...form,
        course_id: form.course_id || null,
        test_result_id: presetTestResultId || null,
      });
      setStatus('done');
      setForm({ full_name: '', phone: '', course_id: '', preferred_time: 'Kunduzi', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.error || 'Xatolik yuz berdi, qayta urinib ko\'ring.');
    }
  }

  if (status === 'done') {
    return (
      <div className="form-success">
        Rahmat! Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid-2">
        <div className="form-row">
          <label htmlFor="full_name">Ism familiya *</label>
          <input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} required placeholder="Masalan: Aziza Karimova" />
        </div>
        <div className="form-row">
          <label htmlFor="phone">Telefon raqam *</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="+998 90 123 45 67" />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-row">
          <label htmlFor="course_id">Qiziqtirgan kurs</label>
          <select id="course_id" name="course_id" value={form.course_id} onChange={handleChange}>
            <option value="">Tanlanmagan</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title} ({c.level_range})</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="preferred_time">Qulay vaqt</label>
          <select id="preferred_time" name="preferred_time" value={form.preferred_time} onChange={handleChange}>
            <option>Kunduzi</option>
            <option>Kechqurun</option>
            <option>Dam olish kunlari</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="message">Qo'shimcha izoh</label>
        <textarea id="message" name="message" rows="3" value={form.message} onChange={handleChange} placeholder="Savollaringiz bo'lsa, yozing..." />
      </div>

      {status === 'error' && <div className="form-error" style={{ marginBottom: 16 }}>{errorMsg}</div>}

      <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ width: '100%' }}>
        {status === 'sending' ? 'Yuborilmoqda...' : 'Ariza yuborish'}
      </button>
    </form>
  );
}
