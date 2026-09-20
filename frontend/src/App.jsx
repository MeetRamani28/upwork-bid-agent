import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { IntakeForm } from './features/intake-form/IntakeForm';
import { JobFeed } from './features/feed/JobFeed';
import { useSearchFilter } from './context/SearchFilterContext';
import { Code, Sparkles } from 'lucide-react';

function App() {
  const { filterState } = useSearchFilter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold rounded-full uppercase tracking-wider">
                Phase 1: Local Dev Setup
              </span>
              <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono rounded-full">
                Step 9 Complete
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Autonomous RFP Intelligence & Auto-Proposal Copilot
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Scans live Upwork RSS feeds, filters batch list items via Cohere AI matching on Port 5679, and generates high-converting, technical bid proposals injected with your proof of work.
            </p>
          </div>
        </div>

        {/* Layout Grid: Left Intake Form + Payload Inspector | Right Job Results Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Intake Form & Webhook Inspector */}
          <div className="lg:col-span-5 space-y-6">
            <IntakeForm />

            {/* Live Webhook Schema Inspector */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                    Live n8n Webhook Payload Schema
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded">
                  JSON Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Dispatched live to local n8n on port 5679 (<code className="text-emerald-300">/webhook/rfp-scan</code>).
              </p>
              <pre className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto max-h-60 resize-y">
                {JSON.stringify(filterState, null, 2)}
              </pre>
            </div>
          </div>

          {/* Right Column: Scored RFP Job Feed & Proposals */}
          <div className="lg:col-span-7 space-y-6">
            <JobFeed />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        upwork-bid-agent • Freelance RFP Intelligence Copilot • Local Dev Port 5679
      </footer>
    </div>
  );
}

export default App;
