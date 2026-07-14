import React, { useEffect, useState } from 'react';
import { FileText, Inbox, BookOpen, ClipboardCheck } from 'lucide-react';
import api from '../../api/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/stats').then((res) => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <div className="admin-topbar">
        <h1>Boshqaruv paneli</h1>
      </div>

      {!stats && <p>Yuklanmoqda...</p>}

      {stats && (
        <>
          <div className="admin-stat-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><FileText size={18} strokeWidth={1.8} /></div>
              <div className="admin-stat-num">{stats.totalApplications}</div>
              <div className="admin-stat-label">Jami arizalar</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><Inbox size={18} strokeWidth={1.8} /></div>
              <div className="admin-stat-num">{stats.newApplications}</div>
              <div className="admin-stat-label">Yangi arizalar</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><BookOpen size={18} strokeWidth={1.8} /></div>
              <div className="admin-stat-num">{stats.totalCourses}</div>
              <div className="admin-stat-label">Faol kurslar</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><ClipboardCheck size={18} strokeWidth={1.8} /></div>
              <div className="admin-stat-num">{stats.totalTestResults}</div>
              <div className="admin-stat-label">Test topshirganlar</div>
            </div>
          </div>

          <div className="admin-card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 16, color: 'var(--navy-900)' }}>Daraja bo'yicha taqsimot</h3>
            {stats.levelBreakdown.length === 0 && <p>Hozircha ma'lumot yo'q.</p>}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {stats.levelBreakdown.map((row) => (
                <div key={row.determined_level} style={{ textAlign: 'center' }}>
                  <div className="admin-stat-num">{row.count}</div>
                  <div className="admin-stat-label">{row.determined_level}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
