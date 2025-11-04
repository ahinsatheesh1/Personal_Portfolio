// src/components/Projects.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import { isAdmin } from "../services/auth";
import EditProjectForm from "./EditProjectForm";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/projects");
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = (updated) => {
    setProjects(projects.map((p) => (p._id === updated._id ? updated : p)));
  };

  if (loading) return <p>Loading projects…</p>;
  if (!projects.length) return <p>No projects yet.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "10px" }}>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {projects.map((p) => (
        <div
          key={p._id}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm bg-white dark:bg-gray-800"
        >
          {/* ✅ Show thumbnail if present */}
          {p.thumbnail && (
            <img
              src={p.thumbnail.startsWith("http") ? p.thumbnail : `${api.defaults.baseURL}${p.thumbnail}`}
              alt={p.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
          )}

          <h3 className="text-xl font-semibold">{p.title}</h3>
          <p>{p.description}</p>
          <p>
            <strong>Tech:</strong> {p.techStack?.join(", ")}
          </p>
          <p className="mt-2">
            {p.githubLink && (
              <a
                href={p.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub
              </a>
            )}
            {" | "}
            {p.liveDemo && (
              <a
                href={p.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Live Demo
              </a>
            )}
          </p>

          {isAdmin() && (
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-80"
              >
                Delete
              </button>
              <button
                onClick={() => setEditingProject(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:opacity-80"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdated={handleUpdate}
        />
      )}
    </div>
  );
}
