import Experience from "../components/Experience";
import {
  FiAward,
  FiUser,
  FiMapPin,
  FiBookOpen,
  FiGrid,
  FiTool,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

export default function ExperiencePage() {
  return (
    <>
      <Experience showCTA={false} />

      {/* Details */}
      <section className="max-w-6xl mx-auto px-6 pb-16 -mt-8">
        {/* Quick facts + certificate */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-white/10 to-white/5 mb-10">
          <div className="rounded-2xl bg-white border border-gray-300 shadow-sm dark:bg-gray-900/70 dark:border-white/10 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Meta grid */}
              <div className="md:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <FiAward className="text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">Role</div>
                      <div className="text-gray-900 dark:text-gray-100">Data Science & Machine Learning Intern</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-teal-400 mt-0.5" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">Mode</div>
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">Hybrid</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiUser className="text-purple-400 mt-0.5" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">Mentor</div>
                      <div className="text-gray-900 dark:text-gray-100">Rajeev Azhuvath</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiBookOpen className="text-pink-400 mt-0.5" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">Institution</div>
                      <div className="text-gray-900 dark:text-gray-100">School of Engineering, CUSAT</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Divider */}
              <div className="hidden md:block md:col-span-1 h-full w-px bg-white/10" />
              {/* Certificate button */}
              <div className="md:col-span-3 md:flex md:justify-end">
                <a
                  href="/tcs_certificate.pdf"
                  target="_blank"
                  rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold shadow transition"
                >
                  View Certificate (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Structured sections */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Overview */}
          <section className="rounded-xl border border-gray-300 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900/70 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-2">
              <FiGrid className="text-orange-500 dark:text-orange-400" />
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">Overview</span>
              </h3>
            </div>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 mb-3" />
            <p className="text-gray-700 dark:text-gray-300">
              During my two-month internship at Tata Consultancy Services (TCS), I worked on building and optimizing AI models under the project titled "AI Models". The internship focused on applying machine learning techniques to solve real-world business challenges, with an emphasis on telecom customer analytics and predictive modeling.
            </p>
          </section>

          {/* Responsibilities */}
          <section className="rounded-xl border border-gray-300 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900/70 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-2">
              <FiCheckCircle className="text-orange-500 dark:text-orange-400" />
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">Key Responsibilities</span>
              </h3>
            </div>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 mb-3" />
            <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex gap-2"><FiCheckCircle className="mt-1 text-emerald-400" /> Designed and implemented customer churn prediction models using Artificial Neural Networks (TensorFlow/Keras).</li>
              <li className="flex gap-2"><FiCheckCircle className="mt-1 text-emerald-400" /> Applied data preprocessing and feature engineering to improve input quality and overall performance.</li>
              <li className="flex gap-2"><FiCheckCircle className="mt-1 text-emerald-400" /> Addressed class imbalance using SMOTE to enhance model fairness and recall.</li>
              <li className="flex gap-2"><FiCheckCircle className="mt-1 text-emerald-400" /> Benchmarked Logistic Regression, Random Forest, XGBoost, and ANN; finalized the optimal model with the highest recall.</li>
              <li className="flex gap-2"><FiCheckCircle className="mt-1 text-emerald-400" /> Tuned hyperparameters to achieve 85% accuracy, 83% precision, and 81% recall (≈18% improvement vs. baseline).</li>
              <li className="flex gap-2"><FiCheckCircle className="mt-1 text-emerald-400" /> Documented results and presented insights that supported customer retention strategies.</li>
            </ul>
          </section>

          {/* Tools */}
          <section className="rounded-xl border border-gray-300 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900/70 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-2">
              <FiTool className="text-amber-400" />
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">Tools & Technologies</span>
              </h3>
            </div>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm">
              <div className="space-y-1">
                <div className="text-gray-500 dark:text-gray-400">Languages</div>
                <div>Python</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 dark:text-gray-400">Frameworks/Libraries</div>
                <div>TensorFlow, scikit-learn, pandas, NumPy</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 dark:text-gray-400">Environment</div>
                <div>Google Colab, Jupyter Notebook</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500 dark:text-gray-400">Version Control</div>
                <div>Git & GitHub</div>
              </div>
            </div>
          </section>

          {/* Outcome */}
          <section className="rounded-xl border border-gray-300 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900/70 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-2">
              <FiTrendingUp className="text-orange-500 dark:text-orange-400" />
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">Outcome</span>
              </h3>
            </div>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-300 dark:from-orange-400 dark:to-amber-300 mb-3" />
            <p className="text-gray-700 dark:text-gray-300">
              The project demonstrated how AI‑based churn prediction can help telecom companies identify at‑risk customers and improve retention. The internship strengthened my practical understanding of ML workflows, model evaluation, and business‑focused insights — bridging the gap between academic learning and real‑world applications.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
