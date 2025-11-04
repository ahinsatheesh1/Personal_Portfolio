import { 
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNode,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaDocker,
} from "react-icons/fa";

const categories = [
  {
    title: "Frontend",
    items: [
      { label: "React", Icon: FaReact, level: 85 },
      { label: "HTML5", Icon: FaHtml5, level: 90 },
      { label: "CSS3", Icon: FaCss3Alt, level: 85 },
      { label: "JavaScript", Icon: FaJs, level: 85 },
      { label: "Tailwind CSS", level: 80 },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Node.js", Icon: FaNode, level: 80 },
      { label: "Express", level: 75 },
      { label: "MongoDB", Icon: FaDatabase, level: 75 },
      { label: "REST APIs", level: 80 },
    ],
  },
  {
    title: "DevOps / Cloud",
    items: [
      { label: "Docker", Icon: FaDocker, level: 70 },
      { label: "Git / GitHub", Icon: FaGitAlt, level: 85 },
      { label: "CI/CD", level: 70 },
    ],
  },
  {
    title: "AI / Data",
    items: [
      { label: "Python", Icon: FaPython, level: 80 },
      { label: "NumPy / Pandas", level: 70 },
      { label: "Basic ML", level: 60 },
    ],
  },
];

export default function SkillsSection() {
  const accents = [
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-purple-500 to-pink-400",
    "from-amber-500 to-orange-400",
  ];

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Skills</span>
        </h2>
        <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        <p className="mt-3 text-gray-600 dark:text-gray-400">A focused toolkit I use to build, ship, and iterate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((cat, i) => {
          const accent = accents[i % accents.length];
          return (
            <div
              key={cat.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:-translate-y-0.5 hover:border-blue-500/30 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${accent}`} />
              </div>

              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.Icon ? <item.Icon className="text-blue-400" /> : null}
                        <span className="text-sm md:text-base">{item.label}</span>
                      </div>
                      {typeof item.level === "number" ? (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.level}%</span>
                      ) : null}
                    </div>
                    {typeof item.level === "number" ? (
                      <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                        <div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${accent}`}
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
