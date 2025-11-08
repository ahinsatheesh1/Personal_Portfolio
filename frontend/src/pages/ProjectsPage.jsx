import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import api from "../services/api";
import ProjectDetailModal from "../components/ProjectDetailModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

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
      [p.title, p.description, p.about, ...(p.techStack || [])]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [projects, query]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-300" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filtered.map((p) => (
            <article
              key={p._id}
              onClick={() => setSelected(p)}
              className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-orange-500/20 bg-[#f4f0ec] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_22px_55px_rgba(249,115,22,0.18)] dark:border-gray-800 dark:bg-[#1f1f1f] dark:shadow-[0_22px_40px_rgba(8,15,32,0.4)]"
            >
              {p.thumbnail && (
                <img
                  src={p.thumbnail.startsWith("http") ? p.thumbnail : `${api.defaults.baseURL}${p.thumbnail}`}
                  alt={p.title}
                  className="w-full h-44 object-cover rounded-xl mb-4 shadow-sm"
                />
              )}
              <h2 className="text-xl font-extrabold tracking-tight text-orange-500 dark:text-amber-300">
                {p.title}
              </h2>
              {p.techStack?.length ? (
                <div className="mt-2">
                  <span className="block text-[11px] uppercase tracking-wide text-orange-500 dark:text-amber-300/90 mb-1">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map((t, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-0.5 rounded-full text-xs border border-orange-400/20 bg-orange-100/50 text-orange-700 dark:border-orange-400/40 dark:bg-orange-500/10 dark:text-amber-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {p.description ? (
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {p.description}
                </p>
              ) : null}
              <div className="mt-auto pt-5 flex gap-3 items-center">
                {p.githubLink && (
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-orange-500/20 text-orange-600 transition group-hover:bg-orange-500/10 dark:border-orange-400/30 dark:text-amber-200"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {p.liveDemo && (
                  <a
                    href={p.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-orange-500 text-black font-semibold shadow-sm shadow-orange-500/30 transition hover:bg-orange-400"
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

      {selected && (
        <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />)
      }
    </section>
  );
}
