import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Users2, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <span className="eyebrow">Biz haqimizda</span>
            <h2 style={{ fontSize: 'var(--text-3xl)', margin: '14px 0 22px', color: 'var(--navy-900)' }}>
              "Best Minds Grow" — bilim faqat mashq bilan o'sadi
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ marginBottom: 16 }}>
              BMG School — Samarqand shahridagi ingliz tili o'quv markazi. Bizning maqsadimiz —
              til o'rganishni zerikarli darslardan chiqarib, amaliy va qiziqarli jarayonga aylantirish.
              Shu sababli har bir darsda o'yin elementlari, guruh muhokamalari va real hayotiy
              vaziyatlar qatnashadi.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ marginBottom: 16 }}>
              Kurslarimiz A1 dan B2 darajasigacha, General English, CEFR standartlari va IELTS
              imtihoniga tayyorgarlikni qamrab oladi. Har bir o'quvchi uchun aniq maqsad va
              bosqichma-bosqich rivojlanish yo'li belgilanadi.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p>
              Bizga qo'shiling — darajangizni bepul aniqlang va o'zingizga mos dasturni tanlang.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight section-dark">
        <div className="container">
          <Reveal className="admin-stat-grid" style={{ marginBottom: 0 }}>
            <div className="admin-stat-card" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="admin-stat-icon" style={{ background: 'rgba(232,205,124,0.12)', color: 'var(--gold-300)' }}>
                <GraduationCap size={18} strokeWidth={1.8} />
              </div>
              <div className="admin-stat-num" style={{ color: 'var(--gold-300)' }}>A1–B2</div>
              <div className="admin-stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>daraja oralig'i</div>
            </div>
            <div className="admin-stat-card" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="admin-stat-icon" style={{ background: 'rgba(232,205,124,0.12)', color: 'var(--gold-300)' }}>
                <Award size={18} strokeWidth={1.8} />
              </div>
              <div className="admin-stat-num" style={{ color: 'var(--gold-300)' }}>IELTS</div>
              <div className="admin-stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>CEFR • General</div>
            </div>
            <div className="admin-stat-card" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="admin-stat-icon" style={{ background: 'rgba(232,205,124,0.12)', color: 'var(--gold-300)' }}>
                <Users2 size={18} strokeWidth={1.8} />
              </div>
              <div className="admin-stat-num" style={{ color: 'var(--gold-300)' }}>Guruh</div>
              <div className="admin-stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>va individual</div>
            </div>
            <div className="admin-stat-card" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="admin-stat-icon" style={{ background: 'rgba(232,205,124,0.12)', color: 'var(--gold-300)' }}>
                <MapPin size={18} strokeWidth={1.8} />
              </div>
              <div className="admin-stat-num" style={{ color: 'var(--gold-300)' }}>Samarqand</div>
              <div className="admin-stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>joylashuv</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <Reveal>
            <Link to="/ariza" className="btn btn-primary">Ariza qoldirish</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
