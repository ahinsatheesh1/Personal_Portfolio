import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Contact form card */}
        <div className="order-2 md:order-1 p-6 rounded-xl border border-white/10 bg-white/5">
          <ContactForm />
        </div>
        {/* Right: Heading + copy */}
        <div className="order-1 md:order-2 md:text-right">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Let's Talk</span>
          </h2>
          <div className="mt-2 ml-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <p className="mt-3 text-gray-600 dark:text-gray-400 md:ml-auto max-w-xl">
            Have an idea, a role, or a project in mind? I'd love to hear from
            you. Drop a message and I'll get back soon.
          </p>
        </div>
      </div>
    </section>
  );
}

