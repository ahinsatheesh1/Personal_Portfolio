export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
        {/* left */}
        <p>© {new Date().getFullYear()} Ahin Satheesh. All rights reserved.</p>

        {/* right */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a
            href="https://github.com/ahinsatheesh1"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ahinsatheesh"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
