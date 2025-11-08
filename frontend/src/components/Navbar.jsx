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
    <nav className="sticky top-0 z-50 bg-[#f4f0ec]/95 dark:bg-[#1f1f1f]/90 backdrop-blur border-b border-[#e3dbd2]/70 dark:border-gray-800/70">
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-6 flex items-center h-16">
        {/* logo / name */}
        <a href="/" className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          <span className="bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">Ahin</span>
          <span className="text-gray-900 dark:text-gray-100"> Satheesh</span>
        </a>

        {/* right cluster: links + actions */}
        <div className="ml-auto flex items-center gap-6 lg:gap-8">
          {/* desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-amber-300 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* actions */}
          <div className="flex items-center gap-3">
            <ResumeLink
              showPlaceholder
              className="hidden md:inline-flex px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              Resume
            </ResumeLink>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-300" />
              ) : (
                <FaMoon className="text-gray-700" />
              )}
            </button>

            {/* hamburger (mobile only) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="text-gray-700 dark:text-gray-100" />
              ) : (
                <FaBars className="text-gray-700 dark:text-gray-100" />
              )}
            </button>
          </div>
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
                className="block text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-amber-300 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <ResumeLink
                showPlaceholder
                className="block mt-2 px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold text-center transition"
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
