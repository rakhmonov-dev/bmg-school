import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

const LEVEL_LABELS = {
  A1: "Boshlang'ich — asoslardan boshlaymiz",
  A2: "Kundalik — muloqot ko'nikmalarini mustahkamlaymiz",
  B1: "Mustaqil — erkin gaplashishga tayyorlanamiz",
  B2: "Ilg'or — IELTS/CEFR bosqichiga tayyor",
};

export default function TestPage() {
  const [stage, setStage] = useState('intake'); // intake | quiz | result
  const [intake, setIntake] = useState({ full_name: '', phone: '' });
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/test/questions').then((res) => setQuestions(res.data)).catch(() => {});
  }, []);

  function startQuiz(e) {
    e.preventDefault();
    if (!intake.full_name.trim() || !intake.phone.trim()) return;
    setStage('quiz');
  }

  function selectAnswer(qid, letter) {
    setAnswers((prev) => ({ ...prev, [qid]: letter }));
  }

  async function submitTest() {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/test/submit', {
        full_name: intake.full_name,
        phone: intake.phone,
        answers,
      });
      setResult(res.data);
      setStage('result');
    } catch (err) {
      setError(err.response?.data?.error || 'Xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  }

  const q = questions[current];
  const progress = questions.length ? ((current + 1) / questions.length) * 100 : 0;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        {stage === 'intake' && (
          <>
            <div className="section-head">
              <span className="eyebrow">Darajani aniqlash</span>
              <h2>Boshlashdan oldin</h2>
              <p>Natijalaringizni yuborishimiz uchun ism va telefon raqamingizni qoldiring.</p>
            </div>
            <form className="form-card" onSubmit={startQuiz}>
              <div className="form-row">
                <label htmlFor="full_name">Ism familiya *</label>
                <input
                  id="full_name"
                  required
                  value={intake.full_name}
                  onChange={(e) => setIntake({ ...intake, full_name: e.target.value })}
                  placeholder="Ismingiz"
                />
              </div>
              <div className="form-row">
                <label htmlFor="phone">Telefon raqam *</label>
                <input
                  id="phone"
                  required
                  value={intake.phone}
                  onChange={(e) => setIntake({ ...intake, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={questions.length === 0}>
                {questions.length === 0 ? 'Savollar yuklanmoqda...' : `Testni boshlash (${questions.length} savol)`}
              </button>
            </form>
          </>
        )}

        {stage === 'quiz' && q && (
          <>
            <div className="test-progress">
              {questions.map((_, i) => (
                <div className="test-progress-bar" key={i}>
                  <div className="test-progress-fill" style={{ width: i <= current ? '100%' : '0%' }} />
                </div>
              ))}
            </div>
            <div className="test-question-card">
              <div className="test-q-number">Savol {current + 1} / {questions.length}</div>
              <div className="test-q-text">{q.question_text}</div>
              <div className="test-options">
                {['a', 'b', 'c', 'd'].map((letter) => (
                  <button
                    type="button"
                    key={letter}
                    className={`test-option ${answers[q.id] === letter ? 'selected' : ''}`}
                    onClick={() => selectAnswer(q.id, letter)}
                  >
                    <span className="test-option-letter">{letter.toUpperCase()}</span>
                    <span>{q[`option_${letter}`]}</span>
                  </button>
                ))}
              </div>
              <div className="test-nav">
                <button
                  className="btn btn-outline-dark btn-sm"
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => c - 1)}
                >
                  Oldingi
                </button>
                {current < questions.length - 1 ? (
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={!answers[q.id]}
                    onClick={() => setCurrent((c) => c + 1)}
                  >
                    Keyingi
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={!answers[q.id] || loading}
                    onClick={submitTest}
                  >
                    {loading ? 'Yuborilmoqda...' : 'Testni yakunlash'}
                  </button>
                )}
              </div>
              {error && <div className="form-error" style={{ marginTop: 18 }}>{error}</div>}
            </div>
          </>
        )}

        {stage === 'result' && result && (
          <div className="test-question-card test-result">
            <span className="eyebrow">Natija</span>
            <div className="test-result-level">{result.determined_level}</div>
            <p style={{ marginBottom: 8 }}>{LEVEL_LABELS[result.determined_level]}</p>
            <p style={{ marginBottom: 28, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
              {result.score} / {result.total} to'g'ri javob ({result.percentage}%)
            </p>
            <Link
              to="/ariza"
              state={{ testResultId: result.id }}
              className="btn btn-primary"
            >
              Shu natija bilan ariza qoldirish
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
