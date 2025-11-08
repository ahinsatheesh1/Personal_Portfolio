import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-8 bg-[#f4f0ec] dark:bg-[#1f1f1f] border-t border-[#e3dbd2]/70 dark:border-gray-800/70">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 dark:text-gray-300">
        {/* left */}
        <p>© {new Date().getFullYear()} Ahin Satheesh. All rights reserved.</p>

        {/* right */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a
            href="https://github.com/ahinsatheesh1"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-2 transition hover:text-orange-500"
          >
            <FaGithub />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ahin-satheesh/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-2 transition hover:text-orange-500"
          >
            <FaLinkedin />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

