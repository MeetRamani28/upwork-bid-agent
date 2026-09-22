import React, { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';

export function SkillSelector({ skills = [], onChange }) {
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
        Target Technical Skills & Tools
      </label>

      {/* Input + Add Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill(e);
              }
            }}
            placeholder="Add skill (e.g. React, n8n, Pinecone) & press Enter"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
          />
        </div>
        <button
          type="button"
          onClick={handleAddSkill}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Skill Tags List */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold rounded-lg"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-emerald-400/60 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <span className="text-xs text-slate-500 font-mono italic">No skill tags added yet.</span>
        )}
      </div>
    </div>
  );
}
