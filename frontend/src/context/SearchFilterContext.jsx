import React, { createContext, useContext, useState } from 'react';

const SearchFilterContext = createContext(null);

export const DEFAULT_INTAKE_PAYLOAD = {
  user_id: 'user_clerk_dev_01',
  target_role: 'Full-Stack AI Engineer',
  skills: ['LangGraph', 'n8n', 'Pinecone', 'React'],
  min_fixed_budget: 500,
  min_hourly_rate: 40,
  experience_tier: 'Expert',
  proposal_tone: 'Direct Technical',
  proof_of_work: {
    title: 'Nexus RAG',
    url: 'https://nexus-rag.vercel.app',
    context: 'Production RAG using FastAPI, Pinecone vector store, and hybrid search evaluation.',
  },
};

export function SearchFilterProvider({ children }) {
  const [filterState, setFilterState] = useState(DEFAULT_INTAKE_PAYLOAD);
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanError, setLastScanError] = useState(null);

  const updateFilters = (newFilters) => {
    setFilterState((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const updateProofOfWork = (powData) => {
    setFilterState((prev) => ({
      ...prev,
      proof_of_work: {
        ...prev.proof_of_work,
        ...powData,
      },
    }));
  };

  return (
    <SearchFilterContext.Provider
      value={{
        filterState,
        setFilterState,
        updateFilters,
        updateProofOfWork,
        scanResults,
        setScanResults,
        isScanning,
        setIsScanning,
        lastScanError,
        setLastScanError,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  const context = useContext(SearchFilterContext);
  if (!context) {
    throw new Error('useSearchFilter must be used within a SearchFilterProvider');
  }
  return context;
}
