import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AdminPage from "./pages/AdminPage";
import ExperiencePage from "./pages/ExperiencePage";
 

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <ScrollToHash />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace("#", ""));

    const attemptScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    // Try immediately and a few retries in case content hasn't mounted yet
    if (!attemptScroll()) {
      const timeouts = [50, 150, 300];
      timeouts.forEach((t) => setTimeout(attemptScroll, t));
    }
  }, [hash, pathname]);

  return null;
}

export default App;
