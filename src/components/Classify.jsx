import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, CheckCircle2, Loader2 } from 'lucide-react';

export default function Classify() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState('upload'); // upload | preview | processing | result
  const [result, setResult] = useState(null);

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) {
      setFile(f);
      setStage('preview');
    }
  };

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setStage('preview');
    }
  };

  const classify = async () => {
    setStage('processing');
    // Simulated processing. In real app, call backend Gemini endpoint.
    await new Promise((r) => setTimeout(r, 1500));
    setResult({ name: 'Fall Armyworm', confidence: 0.95, threat: 'High', description: 'A migratory pest that damages maize and other crops.' });
    setStage('result');
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setStage('upload');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section id="classify" className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl sm:text-4xl font-black text-emerald-900">Classify a Pest</h2>
      <p className="text-emerald-800/80 mt-2">Upload an image or drag and drop. Our AI identifies pests and suggests treatments.</p>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {stage === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border-2 border-dashed border-emerald-200 rounded-2xl p-10 bg-white/70 backdrop-blur text-center cursor-pointer hover:bg-emerald-50 transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="mx-auto text-emerald-500" size={40} />
              <p className="mt-3 text-emerald-900 font-semibold">Drag & drop an image here</p>
              <p className="text-emerald-800/70 text-sm">or click to browse</p>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onSelect} />
            </motion.div>
          )}

          {stage === 'preview' && file && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white border border-emerald-100"
            >
              <div className="aspect-video bg-emerald-50 relative">
                <img src={URL.createObjectURL(file)} alt="preview" className="absolute inset-0 w-full h-full object-contain" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800">
                  <ImageIcon size={18} /> {file.name}
                </div>
                <div className="flex gap-2">
                  <button onClick={reset} className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold">Reset</button>
                  <button onClick={classify} className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 font-semibold shadow">
                    Classify
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-2xl p-10 text-center bg-white border border-emerald-100 shadow-sm"
            >
              <Loader2 className="mx-auto animate-spin text-emerald-600" size={36} />
              <p className="mt-3 text-emerald-900 font-semibold">Analyzing image…</p>
              <p className="text-emerald-800/70 text-sm">Using Gemini to detect pests and generate treatments</p>
            </motion.div>
          )}

          {stage === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-2xl p-6 bg-white border border-emerald-100 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" /> {result.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                      Confidence: {(result.confidence * 100).toFixed(0)}%
                    </span>
                    <span className={`px-2 py-1 rounded-full font-semibold ${
                      result.threat === 'High' ? 'bg-red-50 text-red-700' : result.threat === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      Threat: {result.threat}
                    </span>
                  </div>
                  <p className="mt-3 text-emerald-800/80">{result.description}</p>
                </div>
                <div className="hidden sm:block w-48 aspect-square rounded-xl bg-emerald-50 overflow-hidden">
                  {file && <img src={URL.createObjectURL(file)} alt="classified" className="w-full h-full object-cover" />}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={reset} className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold">Classify another</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
