import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Send, Instagram, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 16 }}>
              <span className="brand-crest">BMG</span>
              <span className="brand-name" style={{ color: 'white' }}>BMG <span>School</span></span>
            </div>
            <p style={{ maxWidth: 320 }}>
              Samarqand shahridagi ingliz tili o'quv markazi. IELTS, CEFR va General English
              yo'nalishlarida — tez o'rganing, faol o'ynang.
            </p>
          </div>
          <div>
            <h4>Sahifalar</h4>
            <Link to="/kurslar">Kurslar</Link>
            <Link to="/biz-haqimizda">Biz haqimizda</Link>
            <Link to="/test">Darajani aniqlash</Link>
            <Link to="/ariza">Ariza qoldirish</Link>
          </div>
          <div>
            <h4>Aloqa</h4>
            <a href="tel:+998883995414" className="footer-contact-link">
              <Phone size={15} strokeWidth={1.8} /> +998 88 399 54 14
            </a>
            <a href="https://t.me/bmgschool" target="_blank" rel="noreferrer" className="footer-contact-link">
              <Send size={15} strokeWidth={1.8} /> t.me/bmgschool
            </a>
            <a href="https://www.instagram.com/bmg_school" target="_blank" rel="noreferrer" className="footer-contact-link">
              <Instagram size={15} strokeWidth={1.8} /> Instagram
            </a>
            <span className="footer-contact-link" style={{ marginTop: 4 }}>
              <MapPin size={15} strokeWidth={1.8} /> Samarqand, O'zbekiston
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BMG School. Barcha huquqlar himoyalangan.</span>
        </div>
      </div>
    </footer>
  );
}
