import { useEffect, useState } from "react";
import api from "../services/api";

export default function ResumeLink({ className = "", children = "Resume", showPlaceholder = false, ...props }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchUrl = async () => {
      try {
        const { data } = await api.get("/api/resume");
        const link = data?.url ?? data?.["url"] ?? null;
        if (mounted) setUrl(link);
      } catch (_e) {
        if (mounted) setUrl(null);
      }
    };
    fetchUrl();
    const onUpdated = () => fetchUrl();
    const onFocus = () => fetchUrl();
    window.addEventListener("resume:updated", onUpdated);
    window.addEventListener("focus", onFocus);
    return () => {
      mounted = false;
      window.removeEventListener("resume:updated", onUpdated);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (!url) {
    if (showPlaceholder) {
      return (
        <span className={`${className} opacity-60 cursor-not-allowed select-none`}>
          {children}
        </span>
      );
    }
    return null;
  }
  const absolute = url.startsWith("http")
    ? url
    : `${api.defaults.baseURL}${url}`;

  return (
    <a href={absolute} target="_blank" rel="noreferrer" className={className} download {...props}>
      {children}
    </a>
  );
}
