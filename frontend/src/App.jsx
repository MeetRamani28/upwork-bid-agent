import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { Navbar } from './components/layout/Navbar';
import { IntakeForm } from './features/intake-form/IntakeForm';
import { JobFeed } from './features/feed/JobFeed';
import { useSearchFilter } from './context/SearchFilterContext';
import {
  Bot,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Code2,
  ArrowRight,
  Search,
  CheckCircle2,
  Sliders,
  Activity,
  ChevronRight
} from 'lucide-react';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkActive = Boolean(CLERK_KEY && !CLERK_KEY.includes('your_clerk_key'));

/**
 * Senior UI Engineer Auth Landing Page (Shown when user is SignedOut)
 */
function AuthLanding() {
  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0B0F17]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                <Bot className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                upwork-bid-agent
              </span>
              <span className="ml-2.5 px-2 py-0.5 text-[10px] font-mono font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full">
                AI COPILOT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isClerkActive ? (
              <SignInButton mode="modal">
                <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-2">
                  <span>Sign In</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </SignInButton>
            ) : (
              <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                Dev Mode
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 flex flex-col justify-center space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Autonomous Freelance RFP Triage & AI Proposal Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Win More Freelance Bids with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Precision AI Automation
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Automate live Upwork feed ingestion, normalize budgets with regex precision, vector match against your tech stack, and draft high-converting proposals with injected proof-of-work.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isClerkActive ? (
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 hover:opacity-95 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4 fill-slate-950" />
                  <span>Authenticate & Launch Copilot</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </SignInButton>
            ) : (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 font-mono">
                Set VITE_CLERK_PUBLISHABLE_KEY in .env to enable Clerk Authentication.
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-[#0B0F17]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3 hover:border-indigo-500/40 transition-all shadow-xl">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Semantic Fit Matcher</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates 0-100 fit scores matching RFP criteria against your personal profile vectors.
            </p>
          </div>

          <div className="bg-[#0B0F17]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3 hover:border-cyan-500/40 transition-all shadow-xl">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sliders className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Regex Budget Normalizer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardizes raw fixed-price budgets and hourly rate ranges into filtered numeric thresholds.
            </p>
          </div>

          <div className="bg-[#0B0F17]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all shadow-xl">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Proof-of-Work Citation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically embeds relevant project links and technical context into generated proposals.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070A10] py-6 text-center text-xs text-slate-500 font-mono">
        upwork-bid-agent • Senior UI Engineer Specification • Secured by Clerk Auth
      </footer>
    </div>
  );
}

/**
 * Main Application Dashboard (Shown when user is SignedIn or dev mode bypass)
 */
function MainDashboard() {
  const { filterState } = useSearchFilter();

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#0B0F17] via-[#0F1420] to-[#0B0F17] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3 w-3" />
                <span>Engine Active</span>
              </span>
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono rounded-full">
                n8n Port: 5679
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              RFP Intelligence & Proposal Copilot
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Configure your intake target profile on the left to trigger live Upwork RSS parsing, semantic fit scoring, and automated proposal drafting.
            </p>
          </div>
        </div>

        {/* Layout Grid: Left Intake Form + Payload Inspector | Right Job Results Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Intake Form & Webhook Inspector */}
          <div className="lg:col-span-5 space-y-6">
            <IntakeForm />

            {/* Live Webhook Schema Inspector */}
            <div className="bg-[#0B0F17]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
                    Live n8n Webhook Payload Schema
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-md">
                  JSON Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Dispatched live to local n8n engine on port 5679 (<code className="text-cyan-300">/webhook/rfp-scan</code>).
              </p>
              <pre className="bg-[#070A10] border border-white/10 rounded-xl p-4 text-xs font-mono text-cyan-300 overflow-x-auto max-h-60 resize-y">
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

      <footer className="border-t border-white/10 bg-[#070A10] py-6 text-center text-xs text-slate-500 font-mono">
        upwork-bid-agent • Freelance RFP Intelligence Copilot
      </footer>
    </div>
  );
}

function App() {
  if (isClerkActive) {
    return (
      <>
        <SignedIn>
          <MainDashboard />
        </SignedIn>
        <SignedOut>
          <AuthLanding />
        </SignedOut>
      </>
    );
  }

  // Local Dev Bypass mode if Clerk key is not provided
  return <MainDashboard />;
}

export default App;
