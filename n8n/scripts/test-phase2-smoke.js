// Script to test Step 15 Phase 2 Local-to-Cloud Integration without hardcoded secret credentials
import fs from 'fs';
import path from 'path';

// Load .env if present
if (fs.existsSync('.env')) {
  const envConfig = fs.readFileSync('.env', 'utf-8');
  envConfig.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length > 0 && !process.env[key.trim()]) {
      process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

const supabaseUrl = process.env.SUPABASE_URL || 'https://fpjupaevhszbbaowtvvq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY in environment or .env!');
  process.exit(1);
}

async function fetchWithRetry(url, options, retries = 3, backoff = 1000) {
  const defaultHeaders = {
    'User-Agent': 'upwork-bid-agent-backend/1.0',
    'Accept': 'application/json'
  };

  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(url, finalOptions);
    } catch (err) {
      console.warn(`⚠️ Network attempt ${attempt}/${retries} failed (${err.message}). Retrying in ${backoff}ms...`);
      if (attempt === retries) throw err;
      await new Promise(res => setTimeout(res, backoff));
    }
  }
}

async function testPhase2CloudIntegration() {
  console.log('--- Step 15: Phase 2 Local-to-Cloud Integration Test ---');
  
  const testJobLink = `https://www.upwork.com/jobs/~phase2smoke_${Date.now()}`;

  // 1. Generate test payload mimicking React IntakeForm submission
  const testPayload = [
    {
      user_id: 'user_clerk_dev_01',
      job_title: 'Full-Stack AI Engineer Needed for RAG Pipeline',
      job_link: testJobLink,
      budget_type: 'Fixed',
      budget_value: 2500,
      fit_score: 98,
      pain_points: ['Manual triage of high-volume RFPs'],
      proof_of_work_used: { title: 'Nexus RAG', url: 'https://github.com/example/nexus' },
      proposal: 'Phase 2 Cloud Integration Test Proposal generated successfully with live Supabase cloud persistence.'
    }
  ];

  console.log(`1. Sending test RFP item to Supabase table scouted_rfps (${testJobLink})...`);

  const response = await fetchWithRetry(`${supabaseUrl}/rest/v1/scouted_rfps?on_conflict=job_link`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation'
    },
    body: JSON.stringify(testPayload)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('❌ Supabase Upsert Failed:', errText);
    process.exit(1);
  }

  const insertedRows = await response.json();
  console.log('✅ Supabase PostgREST returned inserted row:');
  console.log(JSON.stringify(insertedRows, null, 2));

  console.log('\n2. Verifying row query from Supabase database...');
  const queryResponse = await fetchWithRetry(`${supabaseUrl}/rest/v1/scouted_rfps?job_link=eq.${encodeURIComponent(testJobLink)}`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  const queriedRows = await queryResponse.json();
  if (queriedRows && queriedRows.length > 0) {
    console.log(`✅ Success! Row found in cloud database. ID: ${queriedRows[0].id}`);
    console.log(`Job Title: "${queriedRows[0].job_title}"`);
    console.log(`Fit Score: ${queriedRows[0].fit_score}%`);
  } else {
    console.error('❌ Row was not found on query verification!');
    process.exit(1);
  }

  console.log('\n🎉 Phase 2 Local-to-Cloud Integration Smoke Test PASSED!');
}

testPhase2CloudIntegration().catch(err => {
  console.error('❌ Test execution error:', err);
  process.exit(1);
});
