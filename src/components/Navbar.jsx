import React from 'react';
import { Bug, Home, ScanSearch, BookOpenText, Info } from 'lucide-react';

export default function Navbar({ current, onNavigate }) {
  const LinkBtn = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => onNavigate(id)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        current === id
          ? 'bg-emerald-600 text-white shadow'
          : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50'
      }`}
    >
      <Icon size={16} /> {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center shadow-md">
              <Bug className="text-white" size={20} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-emerald-900">
              PestHub
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <LinkBtn id="home" icon={Home} label="Home" />
            <LinkBtn id="classify" icon={ScanSearch} label="Classify" />
            <LinkBtn id="directory" icon={BookOpenText} label="Directory" />
            <a href="#about" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50 transition-all">
              <Info size={16} /> About
            </a>
          </nav>
          <div className="md:hidden">
            {/* Simple mobile nav toggle could go here if needed */}
          </div>
        </div>
      </div>
    </header>
  );
}
