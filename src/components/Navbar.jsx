import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/kurslar', label: 'Kurslar' },
    { to: '/biz-haqimizda', label: 'Biz haqimizda' },
    { to: '/test', label: 'Darajani aniqlash' },
    { to: '/ariza', label: 'Aloqa' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-crest">BMG</span>
          <span className="brand-name">BMG <span>School</span></span>
        </Link>

        <nav className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/ariza" className="btn btn-primary btn-sm">Ariza qoldirish</Link>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menyu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ color: 'white' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
