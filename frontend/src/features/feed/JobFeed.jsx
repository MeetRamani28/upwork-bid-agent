import React, { useState } from 'react';
import { useSearchFilter } from '../../context/SearchFilterContext';
import { JobCard } from '../../components/rfp/JobCard';
import { ProposalModal } from '../../components/rfp/ProposalModal';
import { FeedMetricsBar } from './FeedMetricsBar';
import { Sparkles, Inbox } from 'lucide-react';

export function JobFeed() {
  const { scanResults, isScanning } = useSearchFilter();
  const [selectedJob, setSelectedJob] = useState(null);

  // Safely extract and unwrap jobs array from n8n response
  const rawJobs = Array.isArray(scanResults)
    ? scanResults
    : (scanResults && Array.isArray(scanResults.items))
    ? scanResults.items
    : [];

  const jobs = rawJobs.map((item) => (item && item.json ? item.json : item));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">Scouted RFP Matches & Proposals</h2>
        </div>
        {jobs.length > 0 && (
          <span className="text-xs font-mono px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-bold">
            {jobs.length} Top RFP Matches Ready
          </span>
        )}
      </div>

      {/* Feed Metrics Summary Bar */}
      <FeedMetricsBar jobs={jobs} />

      {/* Loading Skeleton Feed */}
      {isScanning ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-1/3"></div>
              <div className="h-6 bg-slate-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-700/60 rounded w-full"></div>
                <div className="h-3 bg-slate-700/60 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        /* Render Scouted RFP Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <JobCard
              key={job.guid || job.job_link || index}
              job={job}
              onOpenProposal={(selected) => setSelectedJob(selected)}
            />
          ))}
        </div>
      ) : (
        /* Empty Feed Placeholder */
        <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="inline-block p-4 bg-slate-800 rounded-full text-slate-500">
            <Inbox className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-slate-300">No RFP Feed Items Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Configure your target skills and budget in the intake form above and click "Launch RFP Scan" to fetch top matching jobs and generate auto-proposals.
          </p>
        </div>
      )}

      {/* Proposal Detail Modal */}
      {selectedJob && (
        <ProposalModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
