import { useEffect, useState } from "react";
import api from "../services/api";
import { isAdmin } from "../services/auth";
import EditExperienceForm from "./EditExperienceForm";

export default function Experience({ showCTA = true }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/experience");
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    try {
      await api.delete(`/api/experience/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExperiences((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = (updated) => {
    setExperiences((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
  };

  const headerGridClass = showCTA
    ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8"
    : "grid grid-cols-1 items-start mb-8";

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-16">
      {/* Header with featured experience and CTA */}
      <div className={headerGridClass}>
        {/* Left: CTA */}
        {showCTA ? (
          <div className="md:text-left order-2 md:order-1 mt-6 md:mt-12">
            <a
              href="/experience"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:opacity-95 transition"
            >
              Know more about this
            </a>
          </div>
        ) : null}
        {/* Right: Heading + details */}
        <div className={showCTA ? "order-1 md:order-2 md:pl-16 xl:pl-24 md:justify-self-end" : ""}>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-1">
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="mb-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold leading-tight m-0">
              <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">Tata Consultancy Services (TCS)</span>
            </h3>
            <img
              src="/tcs.png"
              alt="TCS logo"
              className="h-8 w-8 rounded-full ring-2 ring-white/20 bg-white object-contain p-1 shadow"
            />
          </div>
          <p className="mt-1 text-indigo-300 dark:text-indigo-300">
            Summer Intern - Data Science / Machine Learning
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-400">
            <span className="text-gray-300 dark:text-gray-300">May 2025 - July 2025</span>
            {" "}|{" "}
            <span className="text-teal-300">Hybrid</span>
          </p>
        </div>
      </div>

      {/* Experiences list (hidden message when empty) */}
      <div className="max-w-3xl">
        {loading ? (
          <p>Loading experiences…</p>
        ) : experiences.length ? (
          experiences.map((exp) => (
            <div
              key={exp._id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="italic">{exp.company}</p>
              <p>{exp.description}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate?.substring(0, 10)} - {exp.endDate ? exp.endDate.substring(0, 10) : "Present"}
              </p>

              {isAdmin() && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => setEditingExp(exp)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : null}
      </div>

      {editingExp && (
        <EditExperienceForm
          exp={editingExp}
          onClose={() => setEditingExp(null)}
          onUpdated={handleUpdate}
        />
      )}
    </section>
  );
}
