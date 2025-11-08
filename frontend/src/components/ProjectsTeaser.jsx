import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import api from "../services/api";

export default function ProjectsTeaser() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/projects");
        setProjects((data || []).slice(0, 3));
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl h-24 bg-white/5 border border-white/10" />
              ))
            ) : projects.length ? (
              projects.map((p) => (
                <a
                  key={p._id}
                  href={p.liveDemo || p.githubLink || "#"}
                  target={p.liveDemo || p.githubLink ? "_blank" : undefined}
                  rel={p.liveDemo || p.githubLink ? "noreferrer" : undefined}
                  className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(30,64,175,.18)] transition"
                >
                  {p.thumbnail && (
                    <img
                      src={p.thumbnail.startsWith("http") ? p.thumbnail : `${api.defaults.baseURL}${p.thumbnail}`}
                      alt={p.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{p.title}</p>
                      {p.techStack?.length ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{p.techStack.slice(0,4).join(", ")}</p>
                      ) : null}
                    </div>
                    <FaArrowRight className="mt-1 text-blue-400 dark:text-orange-400" />
                  </div>
                </a>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No projects yet.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end text-left md:text-right">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Explore My Projects</h1>
          <p className="mt-3 max-w-md text-gray-600 dark:text-gray-400">
            A selection of full‑stack builds, experiments, and production work.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold shadow transition"
            >
              View Projects
            </Link>
            <a
              href="https://github.com/ahinsatheesh1"
              target="_blank"
              rel="noreferrer"
            className="px-6 py-3 rounded-lg border border-white/20 text-blue-300 hover:bg-white/5 transition inline-flex items-center gap-2"
          >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
