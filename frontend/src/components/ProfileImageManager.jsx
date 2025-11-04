// src/components/ProfileImageManager.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProfileImageManager() {
  const [current, setCurrent] = useState("");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/api/uploads/profile");
      const url = data?.url ? (data.url.startsWith("http") ? data.url : `${api.defaults.baseURL}${data.url}`) : "";
      setCurrent(url);
    } catch (_) {}
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setBusy(true);
    setMsg("");
    try {
      const form = new FormData();
      form.append("file", file);
      const { data } = await api.post("/api/uploads/profile", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const url = data?.url ? (data.url.startsWith("http") ? data.url : `${api.defaults.baseURL}${data.url}`) : "";
      setCurrent(url);
      setMsg("Profile image uploaded");
      try { window.dispatchEvent(new Event("profile:updated")); } catch (_) {}
    } catch (err) {
      setMsg("Upload failed: " + (err?.response?.data?.error || err.message));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Remove profile image?")) return;
    setBusy(true);
    setMsg("");
    try {
      await api.delete("/api/uploads/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCurrent("");
      setMsg("Profile image removed");
      try { window.dispatchEvent(new Event("profile:updated")); } catch (_) {}
    } catch (err) {
      setMsg("Delete failed: " + (err?.response?.data?.error || err.message));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-3">About • Profile Image</h3>
      <div className="flex items-start gap-4">
        <div className="w-28 h-28 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {current ? (
            <img src={current} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-500">No image</span>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Upload/Replace image</label>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={busy} />
          {fileName ? <p className="text-xs text-gray-500 mt-1">Selected: {fileName}</p> : null}
          <div className="mt-3 flex gap-2">
            <button onClick={load} className="px-3 py-1 rounded bg-gray-600 text-white" type="button" disabled={busy}>Refresh</button>
            <button onClick={handleDelete} className="px-3 py-1 rounded bg-red-600 text-white" type="button" disabled={busy || !current}>Delete</button>
          </div>
          {msg ? <p className="mt-2 text-sm">{msg}</p> : null}
        </div>
      </div>
    </div>
  );
}

