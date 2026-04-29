import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import Building from './pages/Building';
import Development from './pages/Development';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import News from './pages/News';
import AdminLogin     from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ContentEditor  from './pages/admin/ContentEditor';
import ProjectsAdmin  from './pages/admin/ProjectsAdmin';
import NewsAdmin      from './pages/admin/NewsAdmin';
import JobsAdmin      from './pages/admin/JobsAdmin';
import ContactsAdmin  from './pages/admin/ContactsAdmin';
import SeoAdmin       from './pages/admin/SeoAdmin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return <>
    <Navbar />
    {children}
    <Footer />
    <FloatingContact />
  </>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/"             element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/building"     element={<PublicLayout><Building /></PublicLayout>} />
        <Route path="/development"  element={<PublicLayout><Development /></PublicLayout>} />
        <Route path="/projects"     element={<PublicLayout><Projects /></PublicLayout>} />
        <Route path="/projects/:id" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/about"        element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/careers"      element={<PublicLayout><Careers /></PublicLayout>} />
        <Route path="/contact"      element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/news"         element={<PublicLayout><News /></PublicLayout>} />
        {/* Admin — no Navbar/Footer */}
        <Route path="/admin/login"    element={<AdminLogin />} />
        <Route path="/admin"          element={<AdminDashboard />} />
        <Route path="/admin/content"  element={<ContentEditor />} />
        <Route path="/admin/projects" element={<ProjectsAdmin />} />
        <Route path="/admin/news"     element={<NewsAdmin />} />
        <Route path="/admin/jobs"     element={<JobsAdmin />} />
        <Route path="/admin/contacts" element={<ContactsAdmin />} />
        <Route path="/admin/seo"      element={<SeoAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
