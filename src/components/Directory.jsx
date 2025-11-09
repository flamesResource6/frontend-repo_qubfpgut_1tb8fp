import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';

const DEFAULT_PESTS = [
  { id: 1, name: 'Fall Armyworm', category: 'Insects', threat: 'High', image: 'https://images.unsplash.com/photo-1735834187366-b8fe93cc771b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGYWxsJTIwQXJteXdvcm18ZW58MHwwfHx8MTc2MjY0ODg0MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Aphids', category: 'Insects', threat: 'Medium', image: 'https://images.unsplash.com/photo-1735834187366-b8fe93cc771b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGYWxsJTIwQXJteXdvcm18ZW58MHwwfHx8MTc2MjY0ODg0MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Colorado Potato Beetle', category: 'Insects', threat: 'High', image: 'https://images.unsplash.com/photo-1735834187366-b8fe93cc771b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGYWxsJTIwQXJteXdvcm18ZW58MHwwfHx8MTc2MjY0ODg0MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Spider Mites', category: 'Arachnids', threat: 'Medium', image: 'https://images.unsplash.com/photo-1735834187366-b8fe93cc771b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGYWxsJTIwQXJteXdvcm18ZW58MHwwfHx8MTc2MjY0ODg0MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Whiteflies', category: 'Insects', threat: 'Medium', image: 'https://images.unsplash.com/photo-1735834187366-b8fe93cc771b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGYWxsJTIwQXJteXdvcm18ZW58MHwwfHx8MTc2MjY0ODg0MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Cutworms', category: 'Insects', threat: 'High', image: 'https://images.unsplash.com/photo-1735834187366-b8fe93cc771b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGYWxsJTIwQXJteXdvcm18ZW58MHwwfHx8MTc2MjY0ODg0MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Stink Bugs', category: 'Insects', threat: 'Low', image: 'https://images.unsplash.com/photo-1522325636832-5dbc1440f793?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxBcGhpZHN8ZW58MHwwfHx8MTc2MjY0ODg0Mnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Leafhoppers', category: 'Insects', threat: 'Medium', image: 'https://images.unsplash.com/photo-1721796693069-166d2674fae8?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDb2xvcmFkbyUyMFBvdGF0byUyMEJlZXRsZXxlbnwwfDB8fHwxNzYyNjQ4ODQzfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 9, name: 'Corn Borer', category: 'Insects', threat: 'High', image: 'https://images.unsplash.com/photo-1749663633642-7754ec3a383c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTcGlkZXIlMjBNaXRlc3xlbnwwfDB8fHwxNzYyNjQ4ODQ0fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 10, name: 'Root-Knot Nematode', category: 'Nematodes', threat: 'High', image: 'https://images.unsplash.com/photo-1715345768936-385023bcafd8?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxXaGl0ZWZsaWVzfGVufDB8MHx8fDE3NjI2NDg4NDR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 11, name: 'Powdery Mildew', category: 'Fungi', threat: 'Medium', image: 'https://images.unsplash.com/photo-1743767587738-ef68817838cf?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDdXR3b3Jtc3xlbnwwfDB8fHwxNzYyNjQ4ODQ1fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 12, name: 'Army Ants', category: 'Insects', threat: 'Low', image: 'https://images.unsplash.com/photo-1728103959779-b10d6e8b76a6?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdGluayUyMEJ1Z3N8ZW58MHwwfHx8MTc2MjY0ODg1Nnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
];

function Badge({ children, tone = 'emerald' }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function Card({ pest, view = 'grid', onOpen }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className={`border border-emerald-100 rounded-xl overflow-hidden bg-white shadow-sm ${view === 'list' ? 'flex' : ''}`}
    >
      <div className={`${view === 'list' ? 'w-40' : 'aspect-video'} bg-emerald-50 overflow-hidden`}>
        <img src={pest.image} alt={pest.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1">
        <h4 className="text-lg font-bold text-emerald-900">{pest.name}</h4>
        <div className="mt-2 flex items-center gap-2">
          <Badge>{pest.category}</Badge>
          <Badge tone={pest.threat === 'High' ? 'red' : pest.threat === 'Medium' ? 'amber' : 'emerald'}>Threat: {pest.threat}</Badge>
        </div>
        <div className="mt-3">
          <button onClick={() => onOpen(pest)} className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">Quick View</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Directory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [threat, setThreat] = useState('All');
  const [view, setView] = useState('grid');
  const [modal, setModal] = useState(null);
  const [customOpen, setCustomOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(DEFAULT_PESTS.map(p => p.category)))];
  const threats = ['All', 'Low', 'Medium', 'High'];

  const filtered = useMemo(() => {
    return DEFAULT_PESTS.filter(p =>
      (category === 'All' || p.category === category) &&
      (threat === 'All' || p.threat === threat) &&
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, category, threat]);

  return (
    <section id="directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-900">Pest Directory</h2>
          <p className="text-emerald-800/80 mt-2">Browse common agricultural pests. Filter, search, and open quick previews.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView('grid')} className={`p-2 rounded-lg border ${view==='grid'?'bg-emerald-600 text-white border-emerald-600':'border-emerald-200 text-emerald-800'}`} aria-label="Grid view">
            <Grid3X3 size={18} />
          </button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg border ${view==='list'?'bg-emerald-600 text-white border-emerald-600':'border-emerald-200 text-emerald-800'}`} aria-label="List view">
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2 flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-200 bg-white">
          <Search size={18} className="text-emerald-600" />
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search pests by name…" className="w-full outline-none text-emerald-900 placeholder-emerald-800/60" />
        </div>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="px-3 py-2 rounded-xl border border-emerald-200 bg-white text-emerald-900">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={threat} onChange={(e)=>setThreat(e.target.value)} className="px-3 py-2 rounded-xl border border-emerald-200 bg-white text-emerald-900">
          {threats.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className={`mt-8 grid ${view==='grid'?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3':'grid-cols-1'} gap-6`}>
        <AnimatePresence>
          {filtered.map(p => (
            <Card key={p.id} pest={p} view={view} onOpen={setModal} />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <button onClick={()=>setCustomOpen(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold shadow-lg hover:shadow-xl">
          <SlidersHorizontal size={18}/> Custom AI Search
        </button>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="absolute inset-0 bg-emerald-900/30 backdrop-blur" onClick={()=>setModal(null)} />
            <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-xl">
              <button onClick={()=>setModal(null)} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow"><X size={16}/></button>
              <div className="aspect-video bg-emerald-50 overflow-hidden">
                <img src={modal.image} alt={modal.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-900">{modal.name}</h3>
                <p className="text-emerald-800/80 mt-2">Quick overview and traits. Open the full detail page for treatments and prevention strategies.</p>
                <div className="mt-4 flex gap-2">
                  <a href="#detail" className="px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold">Open Detail</a>
                  <button onClick={()=>setModal(null)} className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 font-semibold">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Search Modal (mocked) */}
      <AnimatePresence>
        {customOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="absolute inset-0 bg-emerald-900/30 backdrop-blur" onClick={()=>setCustomOpen(false)} />
            <motion.div initial={{y:24, opacity:0}} animate={{y:0, opacity:1}} exit={{y:24, opacity:0}} className="relative max-w-xl w-full bg-white rounded-2xl overflow-hidden shadow-xl">
              <button onClick={()=>setCustomOpen(false)} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow"><X size={16}/></button>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-emerald-900">AI Custom Search</h3>
                <p className="text-emerald-800/80 mt-1">Describe a pest that isn’t in the default list. We’ll validate and generate structured information.</p>
                <textarea className="mt-4 w-full h-28 rounded-xl border border-emerald-200 p-3 outline-none focus:ring-2 focus:ring-emerald-400" placeholder="e.g., small green insect on tomato leaves, sticky honeydew present…" />
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={()=>setCustomOpen(false)} className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 font-semibold">Cancel</button>
                  <button className="px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold">Generate</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
