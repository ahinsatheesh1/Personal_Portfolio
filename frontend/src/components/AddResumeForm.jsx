import { useEffect, useState } from "react";
import api from "../services/api";

export default function AddResumeForm() {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/resume");
        if (data?.url) setUrl(data.url);
      } catch (_) {}
    })();
  }, []);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage("");
    setFileName(file.name);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/api/resume/upload", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data?.url) setUrl(data.url);
      setMessage("Resume uploaded");
      try { window.dispatchEvent(new Event("resume:updated")); } catch (_) {}
    } catch (err) {
      setMessage("Upload failed: " + (err?.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const absolute = url ? (url.startsWith("http") ? url : `${api.defaults.baseURL}${url}`) : "";

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Resume</h3>
      <div className="mb-3">
        <label className="block text-sm mb-1">Upload PDF</label>
        <input type="file" accept="application/pdf" onChange={handleFile} />
        {fileName ? <p className="text-xs text-gray-500 mt-1">Selected: {fileName}</p> : null}
      </div>
      {uploading && <p className="text-sm">Uploading...</p>}
      {url && (
        <p className="text-sm mt-2">
          Current: <a className="text-blue-500 underline" href={absolute} target="_blank" rel="noreferrer">View</a>
        </p>
      )}
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
