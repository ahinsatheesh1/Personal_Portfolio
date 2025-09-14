// src/components/EditExperienceForm.jsx
import { useState } from "react";
import api from "../services/api";
import Input from "./common/Input";
import Textarea from "./common/Textarea";

export default function EditExperienceForm({ exp, onClose, onUpdated }) {
  const [form, setForm] = useState({
    company: exp.company,
    role: exp.role,
    description: exp.description,
    startDate: exp.startDate?.split("T")[0],
    endDate: exp.endDate ? exp.endDate.split("T")[0] : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/api/experience/${exp._id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onUpdated(data);
      onClose();
    } catch (err) {
      alert("❌ Update failed: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96"
      >
        <h2 className="text-lg font-bold mb-3">Edit Experience</h2>

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

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
