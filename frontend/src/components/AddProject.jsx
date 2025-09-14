// src/components/AddProject.jsx
import { useState } from "react";
import api from "../services/api";

export default function AddProject({ onAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveDemo: "",
    techStack: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // ✅ admin token
      const { data } = await api.post(
        "/api/projects",
        {
          ...form,
          techStack: form.techStack.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ add token
        }
      );
      if (onAdded) onAdded(data); // refresh projects list
      setForm({ title: "", description: "", githubLink: "", liveDemo: "", techStack: "", thumbnail: "" });
    } catch (err) {
      alert("❌ Failed to add project: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-6"
    >
      <h3 className="text-lg font-semibold mb-3">Add Project</h3>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full mb-2 p-2 border rounded text-black"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded text-black"
      />
      <input
        type="text"
        name="githubLink"
        value={form.githubLink}
        onChange={handleChange}
        placeholder="GitHub Link"
        className="w-full mb-2 p-2 border rounded text-black"
      />
      <input
        type="text"
        name="liveDemo"
        value={form.liveDemo}
        onChange={handleChange}
        placeholder="Live Demo URL"
        className="w-full mb-2 p-2 border rounded text-black"
      />
      <input
        type="text"
        name="techStack"
        value={form.techStack}
        onChange={handleChange}
        placeholder="Tech stack (comma separated, e.g., React, Node.js)"
        className="w-full mb-2 p-2 border rounded text-black"
      />
      <input
        type="text"
        name="thumbnail"
        value={form.thumbnail}
        onChange={handleChange}
        placeholder="Thumbnail Image URL"
        className="w-full mb-2 p-2 border rounded text-black"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-80"
      >
        Add
      </button>
    </form>
  );
}
