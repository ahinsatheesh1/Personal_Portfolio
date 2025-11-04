import { useState } from "react";
import { isAdmin } from "../services/auth";
import AdminLogin from "../components/AdminLogin";
import AddProject from "../components/AddProject";
import AddResumeForm from "../components/AddResumeForm";
import Projects from "../components/Projects";
import ProfileImageManager from "../components/ProfileImageManager";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(isAdmin());
  const [version, setVersion] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <AdminLogin />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Admin • Manage Projects</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ProfileImageManager />
          <AddResumeForm />
          <AddProject onAdded={() => setVersion((v) => v + 1)} />
        </div>
        <div>
          <Projects key={version} />
        </div>
      </div>
    </section>
  );
}
