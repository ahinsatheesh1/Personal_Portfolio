import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function ViewProjectsCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">View My Projects</span>
          </h2>
          <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl">
            A curated collection of builds across frontend, backend, and full‑stack.
            Clean code, thoughtful UX, and reliable backends.
          </p>
        </div>
        <div className="md:text-right">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:opacity-95 transition"
          >
            Explore Projects <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

