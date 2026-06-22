'use client';

import { useState } from 'react';

export default function Contact() {
  // 1. STATE UNTUK UTILITY FORM BRAY
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    
    // Pastikan Access Key lu udah bener nangkring di sini bray
    formData.append("access_key", "9fecd310-6213-4216-af9d-187fd76b275f");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      // KITA PAKE PENGECEKAN RESPONSE.OK BRAY, BIAR LEBIH AKURAT DAN PASTI!
      if (response.ok) {
        setSubmitStatus('success');
        e.currentTarget.reset(); // Form langsung bersih otomatis pas sukses bray
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 py-24 relative z-10">
      {/* Label atas: Dipertegas warnanya */}
      <p className="text-teal-700 font-mono text-sm font-bold mb-2 text-center">// GET IN TOUCH</p>
      {/* Judul: Diubah jadi slate-900 biar hitam pekat premium */}
      <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight">Contact Me</h2>

      <div className="bg-white/75 border border-teal-200/50 p-8 rounded-2xl backdrop-blur-md max-w-xl mx-auto shadow-md hover:shadow-lg transition-all duration-300">
        {/* 3. PASANG EVENT HANDLER DI SINI */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* INPUT NAME */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full bg-white border border-teal-200/60 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all shadow-sm"
              placeholder="Alex J"
            />
          </div>

          {/* INPUT EMAIL */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full bg-white border border-teal-200/60 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all shadow-sm"
              placeholder="alex@example.com"
            />
          </div>

          {/* INPUT MESSAGE */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Message</label>
            <textarea 
              name="message" 
              rows={4} 
              required
              className="w-full bg-white border border-teal-200/60 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all shadow-sm resize-none"
              placeholder="Hi Mahfudz, let's talk about a project..."
            />
          </div>

          {/* NOTIFIKASI STATUS SUBMIT BRAY */}
          {submitStatus === 'success' && (
            <p className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
              ✅ Message sent successfully!
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-xs font-mono font-bold text-emerald-600 bg-orange-50 border border-emerald-200 px-3 py-2 rounded-lg">
              ✅ Message sent successfully!
            </p>
          )}

          {/* TOMBOL SUBMIT */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-teal-600 text-white font-bold font-mono text-xs py-3.5 rounded-lg hover:bg-teal-500 transition-colors shadow-lg shadow-teal-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE 🚀'}
          </button>
        </form>
      </div>
    </section>
  );
}