import React, { useState } from 'react';
import { X, Copy, Check, FileText, ExternalLink, Sparkles } from 'lucide-react';

export function ProposalModal({ job, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!job) return null;

  const handleCopy = () => {
    if (job.proposal) {
      navigator.clipboard.writeText(job.proposal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A10]/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0B0F17] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#070A10]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">AI Generated Auto-Proposal</h3>
              <p className="text-[11px] text-slate-400 line-clamp-1">{job.job_title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#070A10] border border-white/10 rounded-xl text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-slate-400">Budget:</span>
              <span className="font-bold text-indigo-400">
                {job.budget_type === 'Hourly' ? `$${job.budget_value}/hr` : `$${job.budget_value?.toLocaleString()}`}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-slate-400">Fit Score:</span>
              <span className="font-bold text-cyan-400">{job.fit_score}%</span>
            </div>
            {job.job_link && (
              <a
                href={job.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors font-mono"
              >
                <span>View Job</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Proposal Text Container */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Drafted Proposal Content
            </label>
            <div className="bg-[#070A10] border border-white/10 rounded-xl p-4 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-indigo-500 selection:text-white">
              {job.proposal}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#070A10]/50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/15 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Proposal</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
