import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, BookOpen, HelpCircle, BarChart3, LogOut } from 'lucide-react';
import { ADMIN_BASE } from '../../config';

export default function AdminLayout() {
  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem('bmg_admin_info') || '{}');

  function logout() {
    localStorage.removeItem('bmg_admin_token');
    localStorage.removeItem('bmg_admin_info');
    navigate(`${ADMIN_BASE}/login`);
  }

  const links = [
    { to: ADMIN_BASE, label: 'Boshqaruv paneli', icon: LayoutDashboard, end: true },
    { to: `${ADMIN_BASE}/arizalar`, label: 'Arizalar', icon: FileText },
    { to: `${ADMIN_BASE}/kurslar`, label: 'Kurslar', icon: BookOpen },
    { to: `${ADMIN_BASE}/savollar`, label: 'Test savollari', icon: HelpCircle },
    { to: `${ADMIN_BASE}/natijalar`, label: 'Test natijalari', icon: BarChart3 },
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">
          <span className="brand-crest">BMG</span>
          <span className="brand-name">Admin</span>
        </div>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <l.icon size={18} strokeWidth={1.8} />
            {l.label}
          </NavLink>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
            {info.full_name || 'Admin'}
          </div>
          <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={logout}>
            <LogOut size={15} strokeWidth={1.8} /> Chiqish
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
