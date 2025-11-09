import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Stopwatch, Leaf } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 opacity-90" aria-hidden>
        <Spline scene="https://prod.spline.design/4p1zX3N7v8a1L6oM/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            <Sparkles size={14} /> AI-Powered Pest Protection
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight text-emerald-900 leading-tight">
            Instantly identify agricultural pests and protect your crops.
          </h1>
          <p className="mt-4 text-emerald-800/80 text-lg">
            Upload a photo or search by name. Get treatments, prevention tips, and expert insights in under 3 seconds with industry-leading accuracy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <ShieldCheck size={18} /> Get Started
            </button>
            <a href="#how" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-800 border border-emerald-200 font-semibold hover:bg-emerald-50 transition-all">
              <Stopwatch size={18} /> See how it works
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{label:'<3s Response',icon:Stopwatch},{label:'95% Accuracy',icon:ShieldCheck},{label:'Eco-first',icon:Leaf},{label:'Expert-backed',icon:Sparkles}].map((item,idx)=> (
              <div key={idx} className="p-3 rounded-xl bg-white/70 border border-emerald-100 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  {React.createElement(item.icon, {size:16})}
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
