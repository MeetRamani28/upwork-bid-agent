import React from 'react';
import { DollarSign, Clock, ExternalLink, FileText, Target, AlertTriangle, Layers } from 'lucide-react';

export function JobCard({ job, onOpenProposal }) {
  const isHourly = job.budget_type === 'Hourly';

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 shadow-xl space-y-4 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 group flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header Row: Title + Fit Score Badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  isHourly
                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                    : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400'
                }`}
              >
                {isHourly ? <Clock className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                {isHourly ? `$${job.budget_value}/hr` : `$${Number(job.budget_value).toLocaleString()}`}
              </span>

              <span className="text-[11px] font-mono text-slate-400">
                {job.pubDate ? new Date(job.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
              </span>
            </div>

            <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              {job.job_title}
            </h3>
          </div>

          {/* Fit Score Badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl">
              <Target className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-xs font-mono font-extrabold text-cyan-400">
                {job.fit_score || 85}% Fit
              </span>
            </div>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
          {job.description}
        </p>

        {/* Detected Pain Points & Proof of Work Badges */}
        <div className="space-y-2 pt-3 border-t border-slate-800">
          {job.pain_points && job.pain_points.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span className="text-slate-400 text-[11px] font-mono line-clamp-1">
                <strong className="text-slate-300">Bottleneck:</strong> {job.pain_points[0]}
              </span>
            </div>
          )}

          {job.proof_of_work_used && (
            <div className="flex items-center gap-2 text-xs">
              <Layers className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span className="text-slate-400 text-[11px] font-mono line-clamp-1">
                <strong className="text-slate-300">Proof Matched:</strong> {job.proof_of_work_used.title}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        {job.job_link && (
          <a
            href={job.job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-mono"
          >
            <span>Upwork Link</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

        <button
          onClick={() => onOpenProposal(job)}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>View Proposal</span>
        </button>
      </div>
    </div>
  );
}
