import { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import api from "../services/api";

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/projects");
        setProjects(data || []);
      } catch (e) {
        console.error("Failed to load projects", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Hide the section entirely when there are no projects
  if (!loading && (!projects || projects.length === 0)) {
    return null;
  }

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Projects</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : projects.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:-translate-y-0.5 hover:border-blue-500/40 transition">
              {p.thumbnail && (
                <img
                  src={p.thumbnail.startsWith("http") ? p.thumbnail : `${api.defaults.baseURL}${p.thumbnail}`}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{p.title}</h3>
              {p.techStack?.length ? (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{p.techStack.join(", ")}</p>
              ) : null}
              <div className="mt-3 flex gap-3">
                {p.githubLink && (
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-white/20 hover:bg-white/5"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {p.liveDemo && (
                  <a
                    href={p.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:opacity-95"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
