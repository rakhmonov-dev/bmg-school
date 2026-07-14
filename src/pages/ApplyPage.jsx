import React from 'react';
import { useLocation } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';

export default function ApplyPage() {
  const location = useLocation();
  const presetCourseId = location.state?.courseId;
  const presetTestResultId = location.state?.testResultId;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="section-head">
          <span className="eyebrow">Ariza</span>
          <h2>Bugun boshlang</h2>
          <p>Formani to'ldiring — 24 soat ichida siz bilan bog'lanamiz.</p>
        </div>
        <ApplicationForm presetCourseId={presetCourseId} presetTestResultId={presetTestResultId} />
      </div>
    </section>
  );
}
