import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowUpRight } from 'lucide-react';
import { getCourseIcon } from './courseIcons';

export default function CourseCard({ course }) {
  const Icon = getCourseIcon(course.icon_key);
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--spot-x', `${x}%`);
    el.style.setProperty('--spot-y', `${y}%`);
  }

  return (
    <div className="course-card" ref={cardRef} onMouseMove={handleMouseMove}>
      <div className="course-card-spotlight" aria-hidden="true" />
      <div className="course-icon-badge">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <span className="course-level-tag">{course.level_range}</span>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="course-meta">
        {course.duration && (
          <span><Clock size={14} strokeWidth={1.8} /> {course.duration}</span>
        )}
        {course.format && (
          <span><Users size={14} strokeWidth={1.8} /> {course.format}</span>
        )}
      </div>
      <Link to="/ariza" className="btn btn-outline-dark btn-sm course-card-cta" state={{ courseId: course.id }}>
        Ariza qoldirish <ArrowUpRight size={15} strokeWidth={2} />
      </Link>
    </div>
  );
}
