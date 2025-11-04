import { FaCode, FaServer, FaBrain, FaRobot, FaCloud } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

export default function Interests() {
  return (
    <section id="likes" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Coding/Tech animation */}
        <div className="order-2 md:order-1">
          <div className="rounded-2xl bg-gray-900/70 border border-gray-700 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700 bg-gray-800/70">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-gray-300">terminal</span>
            </div>
            <div className="px-5 py-6 font-mono text-sm md:text-base text-blue-100/90">
              <div className="typing-1">$ git clone https://github.com/ahinsatheesh/portfolio</div>
              <div className="typing-2">$ npm run dev</div>
              <div className="typing-3">{'// MERN | AI/ML | DSA | Cloud'}</div>
              <div className="mt-4 text-gray-300">
                <Typewriter
                  words={["const craft = 'impactful apps';", "deploy('prod');", "trainModel('vision');"]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={1400}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: What I Like */}
        <div className="order-1 md:order-2 md:ml-8 lg:ml-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What I Like</h2>
          <ul className="space-y-4">
            <li className="group flex items-start gap-3">
              <span className="mt-1 p-2 rounded-lg bg-blue-600/10 text-blue-400"><FaCode /></span>
              <div>
                <p className="font-semibold">Clean, performant UI</p>
                <p className="text-gray-600 dark:text-gray-400">Design systems, accessible components, smooth UX.</p>
              </div>
            </li>
            <li className="group flex items-start gap-3">
              <span className="mt-1 p-2 rounded-lg bg-purple-600/10 text-purple-400"><FaServer /></span>
              <div>
                <p className="font-semibold">Robust backends</p>
                <p className="text-gray-600 dark:text-gray-400">APIs, auth, databases, and scalability.</p>
              </div>
            </li>
            <li className="group flex items-start gap-3">
              <span className="mt-1 p-2 rounded-lg bg-emerald-600/10 text-emerald-400"><FaBrain /></span>
              <div>
                <p className="font-semibold">AI/ML exploration</p>
                <p className="text-gray-600 dark:text-gray-400">Models that solve real problems.</p>
              </div>
            </li>
            <li className="group flex items-start gap-3">
              <span className="mt-1 p-2 rounded-lg bg-pink-600/10 text-pink-400"><FaRobot /></span>
              <div>
                <p className="font-semibold">Automation</p>
                <p className="text-gray-600 dark:text-gray-400">Scripting, tooling, and productivity.</p>
              </div>
            </li>
            <li className="group flex items-start gap-3">
              <span className="mt-1 p-2 rounded-lg bg-sky-600/10 text-sky-400"><FaCloud /></span>
              <div>
                <p className="font-semibold">Cloud</p>
                <p className="text-gray-600 dark:text-gray-400">Deployments and modern DevOps.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
