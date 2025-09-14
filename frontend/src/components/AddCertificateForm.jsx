// src/components/AddCertificateForm.jsx
import { useState } from "react";
import api from "../services/api";

export default function AddCertificateForm({ onAdded }) {
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/certificates", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onAdded(data);
      setForm({ title: "", issuer: "", issueDate: "", link: "" });
    } catch (err) {
      alert("❌ Failed to add: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow"
    >
      <h3 className="font-semibold mb-2">Add Certificate</h3>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Certificate Title"
        className="w-full mb-2 p-2 border rounded 
                   text-black placeholder-gray-500 
                   dark:text-white dark:placeholder-gray-400 
                   bg-white dark:bg-gray-700"
      />

      <input
        type="text"
        name="issuer"
        value={form.issuer}
        onChange={handleChange}
        placeholder="Issuer"
        className="w-full mb-2 p-2 border rounded 
                   text-black placeholder-gray-500 
                   dark:text-white dark:placeholder-gray-400 
                   bg-white dark:bg-gray-700"
      />

      <input
        type="date"
        name="issueDate"
        value={form.issueDate}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded 
                   text-black dark:text-white 
                   bg-white dark:bg-gray-700"
      />

      <input
        type="text"
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Certificate Link"
        className="w-full mb-2 p-2 border rounded 
                   text-black placeholder-gray-500 
                   dark:text-white dark:placeholder-gray-400 
                   bg-white dark:bg-gray-700"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-90"
      >
        Add
      </button>
    </form>
  );
}
