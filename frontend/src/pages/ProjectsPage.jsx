import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import api from "../services/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

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

  const filtered = useMemo(() => {
    if (!query.trim()) return projects;
    const q = query.toLowerCase();
    return projects.filter((p) =>
      [p.title, p.description, ...(p.techStack || [])]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [projects, query]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Projects</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
          A curated collection of builds across frontend, backend, and full‑stack. Clean code, thoughtful UX, and reliable backends.
        </p>
        <div className="mt-4 relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tech, or description"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-56 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : filtered.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p._id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:-translate-y-0.5 hover:border-blue-500/40 transition shadow-sm"
            >
              {p.thumbnail && (
                <img
                  src={p.thumbnail.startsWith("http") ? p.thumbnail : `${api.defaults.baseURL}${p.thumbnail}`}
                  alt={p.title}
                  className="w-full h-44 object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="text-lg font-semibold">{p.title}</h2>
              {p.techStack?.length ? (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {p.techStack.join(", ")}
                </p>
              ) : null}
              {p.description ? (
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {p.description}
                </p>
              ) : null}
              <div className="mt-4 flex gap-3">
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
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
      )}
    </section>
  );
}
