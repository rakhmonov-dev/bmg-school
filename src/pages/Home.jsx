import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import LevelPath from '../components/LevelPath';
import CourseCard from '../components/CourseCard';
import Gallery from '../components/Gallery';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses').then((res) => setCourses(res.data)).catch(() => {});
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="orb hero-orb-1" aria-hidden="true" />
        <div className="orb hero-orb-2" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">BMG School — Samarqand</span>
            <h1>
              Ingliz tilini <em>tez o'rganing</em>,<br />faol o'ynab mustahkamlang
            </h1>
            <p className="hero-sub">
              A1 dan B2 gacha — IELTS, CEFR va General English yo'nalishlarida
              amaliy mashg'ulotlar, o'yin asosidagi metodika va tajribali ustozlar.
            </p>
            <div className="hero-cta">
              <Link to="/test" className="btn btn-primary">Bepul darajani aniqlash testi</Link>
              <Link to="/ariza" className="btn btn-outline">Ariza qoldirish</Link>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <div className="hero-meta-num"><CountUp end={426} suffix="+" /></div>
                <div className="hero-meta-label">obunachi, faol jamoa</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-num">A1–B2</div>
                <div className="hero-meta-label">barcha darajalar uchun</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-num">6.5+</div>
                <div className="hero-meta-label">o'rtacha IELTS maqsad band</div>
              </div>
            </div>
          </div>
          <LevelPath />
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Yo'nalishlar</span>
              <h2>Har bir daraja uchun aniq yo'l</h2>
              <p>Darajangizdan qat'i nazar, sizga mos dastur va aniq maqsad bilan boshlaymiz.</p>
            </div>
          </Reveal>
          <div className="course-grid">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={i * 120}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY / ATMOSPHERE */}
      <section className="section section-dark">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Muhit</span>
              <h2>O'yin bilan o'qish — bizning uslubimiz</h2>
              <p>Darslarimiz, o'yinlarimiz va o'quvchilarimiz hayotidan lavhalar.</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Gallery />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight">
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ color: 'var(--navy-900)', marginBottom: 18 }}>Qaysi darajadasiz?</h2>
            <p style={{ maxWidth: 480, margin: '0 auto 28px' }}>
              3 daqiqalik qisqa test orqali darajangizni aniqlang va bizdan
              shaxsiy o'quv rejasi oling.
            </p>
            <Link to="/test" className="btn btn-primary">Testni boshlash</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
