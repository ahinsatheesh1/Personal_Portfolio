import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import AddProject from "./components/AddProject";
import ContactForm from "./components/ContactForm";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Router>
        <Navbar />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center text-center py-20 px-6"
                  >
                    {/* profile image */}
                    <img
                      src="/profile.jpg"
                      alt="Ahin Satheesh"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg mb-6 object-cover border-4 border-blue-600 dark:border-blue-400"
                    />

                    {/* heading */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      Hi, I’m{" "}
                      <span className="text-blue-600 dark:text-blue-400">
                        Ahin Satheesh
                      </span>
                    </h1>

                    {/* subheading */}
                    <h2 className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
                      <Typewriter
                        words={[
                          "B.Tech CSE @ CUSAT",
                          "Full-Stack Developer",
                          "AI/ML Enthusiast",
                          "Problem Solver",
                        ]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1500}
                      />
                    </h2>

                    {/* social icons */}
                    <div className="flex space-x-6 mb-6">
                      <a
                        href="https://github.com/ahinsatheesh1"
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/ahinsatheesh"
                        target="_blank"
                        rel="noreferrer"
                        className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="mailto:ahin100123@gmail.com"
                        className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
                      >
                        <FaEnvelope />
                      </a>
                    </div>

                    {/* intro paragraph */}
                    <p className="max-w-2xl text-gray-700 dark:text-gray-400 mb-8">
                      I love building full-stack applications, solving problems
                      with DSA, and exploring Artificial Intelligence and
                      Machine Learning. Currently, I’m focused on crafting
                      impactful projects using MERN and working on real-world
                      internships.
                    </p>

                    {/* buttons */}
                    <div className="flex space-x-4">
                      <a
                        href="/Ahin_Satheesh_resume.pdf"
                        download
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:opacity-90 transition"
                      >
                        📄 Download Resume
                      </a>
                      <Link
                        to="/contact"
                        className="px-6 py-3 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                      >
                        ✉️ Hire Me
                      </Link>
                    </div>
                  </motion.div>
                }
              />

              <Route
                path="/projects"
                element={
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="p-6"
                  >
                    <AddProject />
                    <Projects />
                  </motion.div>
                }
              />
              <Route path="/login" element={<AdminLogin />} />

              <Route
                path="/contact"
                element={
                  <motion.div
                    id="contact"
                    key="contact"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 max-w-lg mx-auto"
                  >
                    <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
                    <ContactForm />
                  </motion.div>
                }
              />

              <Route
                path="/about"
                element={
                  <motion.div
                    key="about"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6"
                  >
                    <About />
                  </motion.div>
                }
              />

              <Route
                path="/skills"
                element={
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6"
                  >
                    <Skills />
                  </motion.div>
                }
              />

              <Route
                path="/experience"
                element={
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6"
                  >
                    <Experience />
                  </motion.div>
                }
              />

              <Route
                path="/certifications"
                element={
                  <motion.div
                    key="certifications"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6"
                  >
                    <Certifications />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
