import React, { useEffect, useState } from 'react';
import api from '../api/client';
import CourseCard from '../components/CourseCard';
import Reveal from '../components/Reveal';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Kurslar</span>
            <h2>Barcha yo'nalishlar</h2>
            <p>Har bir kurs aniq daraja oralig'i, format va davomiylik bilan tuzilgan.</p>
          </div>
        </Reveal>

        {loading && <p>Yuklanmoqda...</p>}
        {!loading && courses.length === 0 && <p>Hozircha kurslar qo'shilmagan.</p>}

        <div className="course-grid">
          {courses.map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <CourseCard course={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
