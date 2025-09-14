import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // simple validations
  if (formData.name.trim().length < 3) {
    toast.error("❌ Name must be at least 3 characters.");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    toast.error("❌ Please enter a valid email address.");
    return;
  }
  if (formData.message.trim().length < 10) {
    toast.error("❌ Message must be at least 10 characters.");
    return;
  }

  setLoading(true);

  try {
    const { data } = await api.post("/api/contact", formData);
    toast.success(data.message);
    setFormData({ name: "", email: "", message: "" });
  } catch (err) {
    toast.error("❌ Failed to send message. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        rows="5"
        required
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-70"
      >
        {loading ? <Spinner /> : "Send Message"}
      </button>
    </form>
  );
}
