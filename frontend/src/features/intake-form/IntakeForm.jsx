import React from 'react';
import { useSearchFilter } from '../../context/SearchFilterContext';
import { SkillSelector } from './SkillSelector';
import { ProofOfWorkInput } from './ProofOfWorkInput';
import { sendRFPScanPayload } from '../../services/n8nWebhookService';
import { Search, DollarSign, Clock, Zap, Loader2, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export function IntakeForm() {
  const {
    filterState,
    updateFilters,
    updateProofOfWork,
    setScanResults,
    isScanning,
    setIsScanning,
    lastScanError,
    setLastScanError,
  } = useSearchFilter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsScanning(true);
    setLastScanError(null);

    try {
      const results = await sendRFPScanPayload(filterState);
      setScanResults(results);
    } catch (err) {
      console.error('n8n RFP Scan Error:', err);
      setLastScanError(err.message || 'Failed to connect to local n8n engine on port 5679.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0B0F17]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">RFP Intake & Target Profile</h2>
            <p className="text-xs text-slate-400">Configure target criteria to trigger real-time scanning & AI proposals</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-slate-900 border border-white/10 text-slate-400 rounded-lg">
          Port: 5679
        </span>
      </div>

      {/* Target Role Input */}
      <div>
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
          Target Role / Focus Area
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            required
            value={filterState.target_role}
            onChange={(e) => updateFilters({ target_role: e.target.value })}
            placeholder="e.g. Full-Stack AI Engineer, GenAI Developer"
            className="w-full bg-[#070A10] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Skill Selector Component */}
      <SkillSelector
        skills={filterState.skills}
        onChange={(updatedSkills) => updateFilters({ skills: updatedSkills })}
      />

      {/* Budget & Tier Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Min Fixed ($)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="number"
              min="0"
              value={filterState.min_fixed_budget}
              onChange={(e) => updateFilters({ min_fixed_budget: Number(e.target.value) })}
              className="w-full bg-[#070A10] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Min Hourly ($/hr)
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="number"
              min="0"
              value={filterState.min_hourly_rate}
              onChange={(e) => updateFilters({ min_hourly_rate: Number(e.target.value) })}
              className="w-full bg-[#070A10] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Experience Tier
          </label>
          <select
            value={filterState.experience_tier}
            onChange={(e) => updateFilters({ experience_tier: e.target.value })}
            className="w-full bg-[#070A10] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          >
            <option value="Entry">Entry Tier</option>
            <option value="Intermediate">Intermediate Tier</option>
            <option value="Expert">Expert Tier</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Proposal Tone
          </label>
          <select
            value={filterState.proposal_tone}
            onChange={(e) => updateFilters({ proposal_tone: e.target.value })}
            className="w-full bg-[#070A10] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          >
            <option value="Direct Technical">Direct Technical</option>
            <option value="Value-First Conversational">Value-First Conversational</option>
            <option value="Concise Executive">Concise Executive</option>
          </select>
        </div>
      </div>

      {/* Proof of Work Section */}
      <ProofOfWorkInput
        proofOfWork={filterState.proof_of_work}
        onChange={updateProofOfWork}
      />

      {/* Error Banner if Webhook Fails */}
      {lastScanError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-mono">
          <strong>Scan Error:</strong> {lastScanError}
        </div>
      )}

      {/* Submit Trigger Button */}
      <button
        type="submit"
        disabled={isScanning}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 hover:opacity-95 disabled:opacity-50 text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 transition-all cursor-pointer"
      >
        {isScanning ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Parsing Feed & Orchestrating n8n Nodes...</span>
          </>
        ) : (
          <>
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>Launch RFP Scan & Proposal Copilot</span>
          </>
        )}
      </button>
    </form>
  );
}
