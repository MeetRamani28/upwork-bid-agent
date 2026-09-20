import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl text-center space-y-4">
        <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold rounded-full uppercase tracking-wider">
          Upwork Bid Agent Copilot
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Freelance RFP Intelligence System
        </h1>
        <p className="text-slate-400 text-sm">
          Scaffolded with Vite, React, Tailwind CSS, TanStack Query, and Clerk Auth.
        </p>
      </div>
    </div>
  );
}

export default App;
