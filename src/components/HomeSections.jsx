import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Leaf, Cpu, Sparkles } from 'lucide-react';

export function BenefitsGrid() {
  const items = [
    { title: 'AI Detection', icon: Cpu, text: 'Gemini-powered visual and text identification.' },
    { title: 'Crop Protection', icon: ShieldCheck, text: 'Actionable treatments to save yields fast.' },
    { title: 'Sustainability', icon: Leaf, text: 'Organic-first, environment-conscious guidance.' },
    { title: 'Speed', icon: Zap, text: 'Under 3 seconds from upload to answer.' },
    { title: 'Expertise', icon: Sparkles, text: 'Backed by agronomists and research.' },
    { title: 'Ease of use', icon: Sparkles, text: 'Simple upload and clean results.' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h3 className="text-2xl sm:text-3xl font-black text-emerald-900">Why PestHub</h3>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-white flex items-center justify-center">
              {React.createElement(it.icon, { size: 20 })}
            </div>
            <h4 className="mt-4 text-lg font-bold text-emerald-900">{it.title}</h4>
            <p className="text-emerald-800/80 mt-1">{it.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks({ onGetStarted }) {
  const steps = [
    { title: 'Upload', text: 'Drag-and-drop a photo or paste a link.' },
    { title: 'Analyze', text: 'We run multi-modal checks with Gemini.' },
    { title: 'Treat', text: 'Get organic/chemical options and prevention.' },
  ];

  return (
    <section id="how" className="bg-gradient-to-b from-white to-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl sm:text-3xl font-black text-emerald-900">How it works</h3>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm">
              <div className="text-emerald-600 font-black text-3xl">{i+1}</div>
              <h4 className="mt-2 text-lg font-bold text-emerald-900">{s.title}</h4>
              <p className="text-emerald-800/80 mt-1">{s.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <button onClick={onGetStarted} className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold shadow hover:shadow-lg">Start Classifying</button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-100 bg-white/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-emerald-800/80">© {new Date().getFullYear()} PestHub. Protecting yields with AI.</p>
        <div className="flex items-center gap-3 text-sm">
          <a href="#about" className="text-emerald-800 hover:text-emerald-700">About</a>
          <span className="text-emerald-200">•</span>
          <a href="#" className="text-emerald-800 hover:text-emerald-700">Privacy</a>
          <span className="text-emerald-200">•</span>
          <a href="#" className="text-emerald-800 hover:text-emerald-700">Terms</a>
        </div>
      </div>
    </footer>
  );
}
