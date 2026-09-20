import React from 'react';
import { Link2, FileText, Layers } from 'lucide-react';

export function ProofOfWorkInput({ proofOfWork, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...proofOfWork,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4 border border-slate-700/80 bg-slate-900/50 p-4 rounded-xl">
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 text-emerald-400" />
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
          Proof of Work Context Injection
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Project / Case Study Title</label>
          <div className="relative">
            <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={proofOfWork?.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Nexus RAG Engine"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Live Demo / Repo URL</label>
          <div className="relative">
            <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="url"
              value={proofOfWork?.url || ''}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://nexus-rag.vercel.app"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Architectural Context & Metrics</label>
        <textarea
          rows={2}
          value={proofOfWork?.context || ''}
          onChange={(e) => handleChange('context', e.target.value)}
          placeholder="Brief technical description of architecture & results to inject in proposal drafting..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none"
        />
      </div>
    </div>
  );
}
