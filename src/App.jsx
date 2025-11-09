import React, { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Classify from './components/Classify';
import Directory from './components/Directory';
import { BenefitsGrid, HowItWorks, Footer } from './components/HomeSections';

function App() {
  const [page, setPage] = useState('home');
  const classifyRef = useRef(null);

  const goClassify = () => {
    setPage('classify');
    requestAnimationFrame(() => {
      classifyRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white text-emerald-900">
      <Navbar current={page} onNavigate={setPage} />

      {page === 'home' && (
        <>
          <Hero onGetStarted={goClassify} />
          <BenefitsGrid />
          <HowItWorks onGetStarted={goClassify} />
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h3 className="text-2xl sm:text-3xl font-black">Pest Gallery Preview</h3>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden aspect-square border border-emerald-100 bg-white shadow-sm">
                  <img
                    src={`https://source.unsplash.com/random/400x400?insect,${i}`}
                    alt="pest"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button onClick={()=>setPage('directory')} className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold shadow-lg hover:shadow-xl">Open Directory</button>
            </div>
          </section>
          <Footer />
        </>
      )}

      {page === 'classify' && (
        <div ref={classifyRef}>
          <Classify />
          <Footer />
        </div>
      )}

      {page === 'directory' && (
        <>
          <Directory />
          <Footer />
        </>
      )}

      {/* About section at bottom for single-page flow */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-black">About PestHub</h2>
        <p className="mt-3 text-emerald-800/80 max-w-3xl">
          PestHub combines image understanding and domain knowledge to identify pests with high accuracy and deliver clear action plans. Our multi-modal pipeline blends Gemini vision with agronomic rules and a curated knowledge base to produce reliable, fast, and sustainable recommendations.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm">
            <h4 className="font-bold text-emerald-900">AI Workflow</h4>
            <p className="text-emerald-800/80 mt-1">Image embeddings, candidate matching, confidence calibration, and treatment synthesis with safety filters.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm">
            <h4 className="font-bold text-emerald-900">Capabilities</h4>
            <p className="text-emerald-800/80 mt-1">Handles blurry images, multiple pests, and text-only queries. Supports region-specific advice.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm">
            <h4 className="font-bold text-emerald-900">Why it’s better</h4>
            <p className="text-emerald-800/80 mt-1">Faster than manual lookup, more comprehensive than leaflets, and constantly improving with feedback loops.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
