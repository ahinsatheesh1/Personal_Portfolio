// use anchors for smooth in-page navigation
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProjectsSection() {
  return (
    <section id="projects-cta" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Explore My Projects
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl">
            A curated selection of fullâ€‘stack builds, UI experiments, and
            production work. Clean code, thoughtful UX, and reliable backends.
          </p>
        </div>

        {/* Right: CTA buttons */}
        <div className="flex md:justify-end gap-3">
          <Link
            to="/projects"
          className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold shadow transition inline-flex items-center gap-2"
          >
            View Projects <FaArrowRight />
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
    </section>
  );
}


