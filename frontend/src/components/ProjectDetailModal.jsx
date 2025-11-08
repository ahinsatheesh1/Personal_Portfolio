import { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import api from "../services/api";

export default function ProjectDetailModal({ project, onClose }) {
  const [entered, setEntered] = useState(false);

  // Animate in and lock background scroll while open
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 10);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  const handleClose = () => {
    setEntered(false);
    setTimeout(() => onClose?.(), 250);
  };

  if (!project) return null;

  const about = project.about || project.description || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
          entered ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-5xl h-[92vh] md:h-[88vh] mx-auto rounded-2xl overflow-hidden border border-[#e3dbd2]/70 dark:border-gray-800/70 bg-[#f4f0ec] dark:bg-[#1f1f1f] shadow-2xl transform-gpu transition duration-300 ease-out ${
          entered ? "rotate-0 scale-100 opacity-100" : "-rotate-6 scale-95 opacity-0"
        } flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {project.thumbnail && (
          <div className="relative">
            <img
              src={
                project.thumbnail.startsWith("http")
                  ? project.thumbnail
                  : `${api.defaults.baseURL}${project.thumbnail}`
              }
              alt={project.title}
              className="w-full h-56 md:h-72 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-amber-300">
            {project.title}
          </h3>

          {project.techStack?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((t, i) => (
                <span
                  key={i}
                  className="inline-block px-2.5 py-1 rounded-full text-xs md:text-[13px] border border-orange-400/35 bg-orange-100/60 text-orange-700 dark:border-orange-400/40 dark:bg-orange-500/10 dark:text-amber-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {about && (
            <div className="mt-5 space-y-4 text-[15px] md:text-base leading-relaxed text-gray-800 dark:text-gray-200">
          {about.split(/\n\n+/).map((para, i) => (
            <p key={i} className="whitespace-pre-line">
              {para.trim()}
            </p>
          ))}
        </div>
      )}

          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-orange-500/25 text-orange-600 transition hover:bg-orange-500/10 dark:border-orange-400/30 dark:text-amber-200"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 text-black font-semibold shadow-sm shadow-orange-500/30 transition hover:bg-orange-400"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
