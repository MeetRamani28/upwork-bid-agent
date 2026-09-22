import React from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthPage } from './components/auth/AuthPage';
import { IntakeForm } from './components/rfp/IntakeForm';
import { JobFeed } from './components/rfp/JobFeed';
import { PayloadInspector } from './components/common/PayloadInspector';
import { Activity } from 'lucide-react';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkActive = Boolean(CLERK_KEY && CLERK_KEY.startsWith('pk_'));

/**
 * Main Application Dashboard (Shown ONLY when user is SignedIn)
 */
function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3 w-3" />
                <span>Engine Active</span>
              </span>
              <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono rounded-full font-semibold">
                n8n Port: 5679
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              RFP Intelligence & Proposal Copilot
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Configure your intake target profile on the left to trigger live Upwork RSS parsing, semantic fit scoring, and automated proposal drafting.
            </p>
          </div>
        </div>

        {/* Layout Grid: Left Intake Form + Payload Inspector | Right Job Results Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Intake Form & Webhook Inspector */}
          <div className="lg:col-span-5 space-y-6">
            <IntakeForm />
            <PayloadInspector />
          </div>

          {/* Right Column: Scored RFP Job Feed & Proposals */}
          <div className="lg:col-span-7 space-y-6">
            <JobFeed />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  if (isClerkActive) {
    return (
      <>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <AuthPage />
        </SignedOut>
      </>
    );
  }

  // Fallback Auth Gate screen if Clerk key is not initialized in .env
  return <AuthPage />;
}

export default App;
