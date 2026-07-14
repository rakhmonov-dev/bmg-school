import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollProgress from './components/ScrollProgress';
import { ADMIN_BASE } from './config';

import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import TestPage from './pages/TestPage';
import ApplyPage from './pages/ApplyPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApplications from './pages/admin/AdminApplications';
import AdminCourses from './pages/admin/AdminCourses';
import AdminQuestions from './pages/admin/AdminQuestions';
import AdminResults from './pages/admin/AdminResults';

function PublicLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith(ADMIN_BASE);

  if (isAdmin) {
    return (
      <Routes>
        <Route path={`${ADMIN_BASE}/login`} element={<AdminLogin />} />
        <Route
          path={ADMIN_BASE}
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="arizalar" element={<AdminApplications />} />
          <Route path="kurslar" element={<AdminCourses />} />
          <Route path="savollar" element={<AdminQuestions />} />
          <Route path="natijalar" element={<AdminResults />} />
        </Route>
      </Routes>
    );
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kurslar" element={<Courses />} />
        <Route path="/biz-haqimizda" element={<About />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/ariza" element={<ApplyPage />} />
      </Routes>
    </PublicLayout>
  );
}
