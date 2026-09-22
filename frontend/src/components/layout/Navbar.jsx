import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Bot, Shield, Terminal, Zap, LogIn } from 'lucide-react';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function Navbar() {
  const hasClerkKey = Boolean(CLERK_KEY && !CLERK_KEY.includes('your_clerk_key'));

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="h-full w-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
              <Bot className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">upwork-bid-agent</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full">
                RFP COPILOT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Autonomous Proposal & RFP Intelligence</p>
          </div>
        </div>

        {/* Status & Auth Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs font-mono text-slate-300">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>Engine: http://localhost:5679</span>
          </div>

          {hasClerkKey ? (
            <>
              <SignedIn>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">Account</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-indigo-500/20">
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-400">
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              <span>Dev Auth Mode</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
