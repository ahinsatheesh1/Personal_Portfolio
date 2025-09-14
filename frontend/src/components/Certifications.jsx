// src/components/Certificates.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import { isAdmin } from "../services/auth";
import AddCertificateForm from "./AddCertificateForm";
import EditCertificateForm from "./EditCertificateForm";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCert, setEditingCert] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/certificates");
        setCertificates(data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdded = (newCert) => {
    setCertificates([newCert, ...certificates]);
  };

  const handleUpdated = (updatedCert) => {
    setCertificates(
      certificates.map((c) => (c._id === updatedCert._id ? updatedCert : c))
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?"))
      return;
    try {
      await api.delete(`/api/certificates/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCertificates(certificates.filter((c) => c._id !== id));
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    }
  };

  if (loading) return <p>Loading certificates…</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>

      {/* ✅ Admin can add */}
      {isAdmin() && <AddCertificateForm onAdded={handleAdded} />}

      {certificates.length === 0 ? (
        <p>No certificates yet.</p>
      ) : (
        <div className="space-y-4">
          {certificates.map((c) => (
            <div
              key={c._id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p>
                <strong>Issuer:</strong> {c.issuer}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(c.issueDate).toLocaleDateString()}
              </p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Certificate
                </a>
              )}

              {/* ✅ Admin buttons */}
              {isAdmin() && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => setEditingCert(c)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Edit Modal */}
      {editingCert && (
        <EditCertificateForm
          cert={editingCert}
          onClose={() => setEditingCert(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
