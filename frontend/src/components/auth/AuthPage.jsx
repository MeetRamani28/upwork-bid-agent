import React, { useState } from 'react';
import { SignIn, SignUp, SignInButton } from '@clerk/clerk-react';
import { Bot, Sparkles, ShieldCheck, Zap, Lock, ArrowRight, CheckCircle2, User, KeyRound } from 'lucide-react';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkActive = Boolean(CLERK_KEY && CLERK_KEY.startsWith('pk_'));

export function AuthPage() {
  const [authMode, setAuthMode] = useState('sign-in'); // 'sign-in' | 'sign-up'
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPassword, setDemoPassword] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Radial Lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-white text-xl tracking-tight">upwork-bid-agent</span>
              <span className="ml-2.5 px-2.5 py-0.5 text-[10px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full">
                AUTHENTICATION GATE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
            <Lock className="h-3.5 w-3.5 text-indigo-400" />
            <span>Access Restricted</span>
          </div>
        </div>
      </header>

      {/* Main Auth Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex items-center justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-5xl">
          
          {/* Left Column: Branding & Features */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Freelance RFP Intelligence Copilot</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Secure Authentication Required
              </h1>

              <p className="text-slate-300 text-base leading-relaxed">
                Sign in to your account to access live Upwork feed triage, automated budget normalization, vector matching, and AI proposal generation.
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Automated RFP Match Engine</h4>
                  <p className="text-xs text-slate-400">Scans and filters RSS job streams based on your skills & minimum budget.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Proof-of-Work Citation Injection</h4>
                  <p className="text-xs text-slate-400">Embeds verified project links into customized high-converting bids.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clerk Auth Card or Fallback Sign-In Form */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Account Sign In</h3>
                  <p className="text-xs text-slate-400">Authenticate to unlock workspace</p>
                </div>
                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <Lock className="h-5 w-5" />
                </div>
              </div>

              {isClerkActive ? (
                /* Clerk Auth Component Render */
                <div className="flex justify-center py-2">
                  {authMode === 'sign-in' ? (
                    <SignIn routing="hash" />
                  ) : (
                    <SignUp routing="hash" />
                  )}
                </div>
              ) : (
                /* Native Auth Form Interface */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Work Email Address
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input
                        type="email"
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        placeholder="freelancer@agency.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Account Password
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input
                        type="password"
                        value={demoPassword}
                        onChange={(e) => setDemoPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  {isClerkActive ? null : (
                    <SignInButton mode="modal">
                      <button className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer">
                        <span>Sign In via Clerk Auth</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </SignInButton>
                  )}

                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[11px] text-indigo-300 font-mono text-center">
                    Click "Sign In via Clerk Auth" to complete authentication.
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono relative z-10">
        upwork-bid-agent • Secured Authentication Gate • Clerk Auth Enabled
      </footer>
    </div>
  );
}
