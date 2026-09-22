import React from 'react';
import { Code2 } from 'lucide-react';
import { useSearchFilter } from '../../context/SearchFilterContext';

export function PayloadInspector() {
  const { filterState } = useSearchFilter();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Live n8n Webhook Payload Schema
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-md font-bold">
          JSON Ready
        </span>
      </div>
      <p className="text-xs text-slate-400">
        Dispatched live to local n8n engine on port 5679 (<code className="text-cyan-300">/webhook/rfp-scan</code>).
      </p>
      <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 overflow-x-auto max-h-60 resize-y">
        {JSON.stringify(filterState, null, 2)}
      </pre>
    </div>
  );
}
