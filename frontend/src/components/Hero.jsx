import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import api from "../services/api";

export default function Hero() {
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get("/api/uploads/profile");
        if (!mounted) return;
        if (data?.url) setProfileUrl(data.url.startsWith("http") ? data.url : `${api.defaults.baseURL}${data.url}`);
      } catch (_) {}
    })();
    return () => { mounted = false; };
  }, []);

  const handleImgError = (e) => {
    if (e?.target && e.target.src.indexOf("/profile.jpg") === -1) {
      e.target.src = "/profile.jpg";
    }
  };
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="mb-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
            Hi, I'm
            {" "}
            <span className="font-semibold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Ahin Satheesh</span>,
            {" "}
            a Computer Science student @ CUSAT, passionate about creating reliable and impactful digital solutions. My focus lies in
            {" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">full‑stack web development</span>
            {" "}and{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">machine learning</span>, where I enjoy building applications that combine solid engineering with clear, purposeful design. I'm driven by curiosity, clean code, and the challenge of turning complex ideas into smooth user experiences.
          </p>
        </div>

        <div className="order-1 md:order-2 flex flex-col items-center text-center">
          <div className="p-[3px] rounded-2xl bg-gradient-to-br from-blue-500/50 to-purple-500/40">
            <img
              src={profileUrl || "/profile.jpg"}
              onError={handleImgError}
              alt="Ahin Satheesh"
              loading="eager"
              decoding="async"
              className="w-56 h-56 md:w-72 md:h-72 rounded-2xl object-cover shadow-xl bg-gray-800/40"
            />
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              Ahin Satheesh
            </span>
          </h1>
          <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <h2 className="mt-3 text-base md:text-xl text-gray-600 dark:text-gray-300">
            <Typewriter
              words={[
                "B.Tech CSE @ CUSAT",
                "Full-Stack Developer",
                "AI/ML Enthusiast",
                "Problem Solver",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
        </div>
      </div>
    </section>
  );
}
