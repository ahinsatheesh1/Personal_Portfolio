const skills = [
  { name: "React", level: "Advanced" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Express", level: "Intermediate" },
  { name: "MongoDB", level: "Intermediate" },
  { name: "Java", level: "Strong" },
  { name: "DSA", level: "Solid" },
  { name: "TailwindCSS", level: "Intermediate" },
];

export default function Skills() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((s, idx) => (
          <div
            key={idx}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center"
          >
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{s.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
