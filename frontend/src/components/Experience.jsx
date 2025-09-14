import { useEffect, useState } from "react";
import api from "../services/api";
import { isAdmin } from "../services/auth";
import EditExperienceForm from "./EditExperienceForm"; // ✅ correct form
import AddExperienceForm from "./AddExperienceForm";

export default function Experience() {
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
      setExperiences(experiences.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = (updated) => {
    setExperiences(experiences.map((e) => (e._id === updated._id ? updated : e)));
  };

  if (loading) return <p>Loading experience…</p>;
  if (!experiences.length) return <p>No experience yet.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>

      {/* ✅ Only admin can add */}
      {isAdmin() && (
        <AddExperienceForm
          onAdded={(newExp) => setExperiences([newExp, ...experiences])}
        />
      )}

      {experiences.map((exp) => (
        <div
          key={exp._id}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800"
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="italic">{exp.company}</p>
          <p>{exp.description}</p>
          <p className="text-sm text-gray-500">
            {exp.startDate?.substring(0, 10)} –{" "}
            {exp.endDate ? exp.endDate.substring(0, 10) : "Present"}
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
      ))}

      {/* ✅ Edit modal */}
      {editingExp && (
        <EditExperienceForm
          exp={editingExp} // ✅ pass exp, not project
          onClose={() => setEditingExp(null)}
          onUpdated={handleUpdate}
        />
      )}
    </div>
  );
}
