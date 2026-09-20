import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Bot, Shield, Terminal } from 'lucide-react';

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function Navbar() {
  const hasClerkKey = Boolean(CLERK_KEY && !CLERK_KEY.includes('your_clerk_key'));

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl text-slate-950 shadow-md">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">upwork-bid-agent</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-800 border border-slate-700 text-emerald-400 rounded-full">
                RFP COPILOT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Autonomous Proposal & RFP Intelligence</p>
          </div>
        </div>

        {/* Status & Auth Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700/80 rounded-lg text-xs font-mono text-slate-300">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span>Local Engine: http://localhost:5679</span>
          </div>

          {hasClerkKey ? (
            <>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-slate-400">
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>Dev Auth (Clerk Ready)</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
