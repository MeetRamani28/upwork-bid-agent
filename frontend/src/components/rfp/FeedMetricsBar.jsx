import React from 'react';
import { Target, Zap, DollarSign, Layers } from 'lucide-react';

export function FeedMetricsBar({ jobs }) {
  if (!jobs || jobs.length === 0) return null;

  const totalScouted = jobs.length;
  const avgFitScore = Math.round(
    jobs.reduce((acc, curr) => acc + (curr.fit_score || 0), 0) / totalScouted
  );

  const highestBudgetJob = jobs.reduce((prev, current) => {
    return (prev.budget_value > current.budget_value) ? prev : current;
  }, jobs[0]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
        <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Scouted RFPs</p>
          <p className="text-lg font-bold text-white">{totalScouted} Matches</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
        <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400">
          <Target className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Avg Fit Score</p>
          <p className="text-lg font-bold text-cyan-400">{avgFitScore}%</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
        <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
          <DollarSign className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Top Value</p>
          <p className="text-lg font-bold text-white">
            {highestBudgetJob.budget_type === 'Hourly'
              ? `$${highestBudgetJob.budget_value}/hr`
              : `$${Number(highestBudgetJob.budget_value).toLocaleString()}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
        <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400">
          <Layers className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Engine Latency</p>
          <p className="text-lg font-bold text-white">~120ms</p>
        </div>
      </div>
    </div>
  );
}
