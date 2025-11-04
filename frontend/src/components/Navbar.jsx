import { useState, useContext } from "react";
import ResumeLink from "./ResumeLink";
// in-page anchors; no router links needed here
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/#about", label: "About Me" },
    { href: "/#experience", label: "Experience" },
    { href: "/#skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* logo / name */}
        <a href="/" className="text-xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Ahin</span>
          <span className="text-gray-900 dark:text-gray-100"> Satheesh</span>
        </a>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 transition">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* actions */}
        <div className="flex items-center space-x-4">
          <ResumeLink
            showPlaceholder
            className="hidden md:inline-flex px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:opacity-95 transition"
          >
            Resume
          </ResumeLink>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>

          {/* hamburger (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="text-gray-800 dark:text-gray-200" />
            ) : (
              <FaBars className="text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-md border-b border-white/10">
          <ul className="flex flex-col space-y-4 p-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-blue-500 text-gray-700 dark:text-gray-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <ResumeLink
                showPlaceholder
                className="block mt-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </ResumeLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
