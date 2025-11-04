import { useState } from "react";
import api from "../services/api";
import Input from "./common/Input";
import Textarea from "./common/Textarea";

export default function EditProjectForm({ project, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    githubLink: project.githubLink,
    liveDemo: project.liveDemo,
    techStack: project.techStack?.join(", ") || "",
    thumbnail: project.thumbnail || "",
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        `/api/projects/${project._id}`,
        {
          ...form,
          techStack: form.techStack.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      onUpdated(data);
      onClose();
    } catch (err) {
      alert("❌ Update failed: " + err.message);
    }
  };

  const handleThumbFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/api/uploads/projects", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data?.url) setForm((f) => ({ ...f, thumbnail: data.url }));
    } catch (err) {
      alert("Upload failed: " + (err?.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96"
      >
        <h2 className="text-lg font-bold mb-3">Edit Project</h2>

        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <Input
          name="githubLink"
          value={form.githubLink}
          onChange={handleChange}
          placeholder="GitHub Link"
        />

        <Input
          name="liveDemo"
          value={form.liveDemo}
          onChange={handleChange}
          placeholder="Live Demo Link"
        />

        <Input
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="Tech stack (comma separated)"
        />

        <div className="mb-3">
          <label className="block text-sm mb-1">Thumbnail</label>
          {form.thumbnail ? (
            <img
              src={form.thumbnail.startsWith("http") ? form.thumbnail : `${api.defaults.baseURL}${form.thumbnail}`}
              alt={form.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
          ) : null}
          <input type="file" accept="image/*" onChange={handleThumbFile} />
        </div>

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
            disabled={uploading}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            {uploading ? "Uploading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
