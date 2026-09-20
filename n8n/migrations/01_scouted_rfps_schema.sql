-- ================================================================================
-- UPWORK BID AGENT: SUPABASE BUSINESS SCHEMA MIGRATION
-- Table: scouted_rfps
-- ================================================================================

-- 1. Create table scouted_rfps
CREATE TABLE IF NOT EXISTS public.scouted_rfps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    job_title TEXT NOT NULL,
    job_link TEXT UNIQUE NOT NULL,
    budget_type TEXT,
    budget_value NUMERIC,
    fit_score INTEGER,
    pain_points JSONB DEFAULT '[]'::jsonb,
    proof_of_work_used JSONB DEFAULT '{}'::jsonb,
    proposal TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Unique Index on job_link for fast lookup & duplicate prevention
CREATE UNIQUE INDEX IF NOT EXISTS idx_scouted_rfps_job_link ON public.scouted_rfps(job_link);

-- 3. Create Index on user_id for fast user query filtering
CREATE INDEX IF NOT EXISTS idx_scouted_rfps_user_id ON public.scouted_rfps(user_id);

-- 4. Create Index on fit_score for ordering top matching RFPs
CREATE INDEX IF NOT EXISTS idx_scouted_rfps_fit_score ON public.scouted_rfps(fit_score DESC);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.scouted_rfps ENABLE ROW LEVEL SECURITY;

-- 6. Create Policy for Service Role & Backend n8n Access
CREATE POLICY "Allow service role full access to scouted_rfps"
    ON public.scouted_rfps
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 7. Create Policy for Users to Read Their Own Scouted RFPs
CREATE POLICY "Allow users to read their own scouted_rfps"
    ON public.scouted_rfps
    FOR SELECT
    USING (auth.uid()::text = user_id OR user_id LIKE 'user_%');
