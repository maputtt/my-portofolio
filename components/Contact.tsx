export default function Contact() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 py-24 text-center border-t border-slate-900">
      <p className="text-teal-400 font-mono text-sm mb-2">// WHAT'S NEXT?</p>
      <h2 className="text-4xl font-bold text-white mb-4">Let's Work Together!</h2>
      <p className="text-slate-400 max-w-lg mx-auto mb-8">
        I'm always open to discussing web development projects, internal system automation, or new career opportunities.
      </p>
      <a 
        href="mailto:email_lu@gmail.com" 
        className="inline-block px-8 py-4 bg-transparent border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-slate-950 font-bold rounded-lg transition-all duration-300"
      >
        Send Email
      </a>
    </section>
  );
}