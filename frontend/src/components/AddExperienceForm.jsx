import { useState } from "react";
import api from "../services/api";
import Input from "./common/Input";
import Textarea from "./common/Textarea";

export default function AddExperienceForm({ onAdded }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/experience", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      onAdded(data);
      setForm({
        company: "",
        role: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      alert("❌ Failed to add experience: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-6"
    >
      <h2 className="text-lg font-bold mb-3">Add Experience</h2>

      <Input
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Company"
      />

      <Input
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Role"
      />

      <Textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <label className="block text-sm">Start Date</label>
      <Input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
      />

      <label className="block text-sm">End Date</label>
      <Input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90"
      >
        {loading ? "Saving..." : "Add Experience"}
      </button>
    </form>
  );
}
