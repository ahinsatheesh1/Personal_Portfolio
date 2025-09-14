// src/components/EditCertificateForm.jsx
import { useState } from "react";
import api from "../services/api";

export default function EditCertificateForm({ cert, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: cert.title,
    issuer: cert.issuer,
    issueDate: cert.issueDate?.split("T")[0],
    link: cert.link,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/api/certificates/${cert._id}`, form, {
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
        <h2 className="text-lg font-bold mb-3">Edit Certificate</h2>

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
