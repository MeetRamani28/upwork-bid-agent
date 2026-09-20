/**
 * Groq Cloud API Connection Verification Script
 * Supports active models: groq/compound, groq/compound-mini, qwen/qwen3.8-27b
 */

import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
let groqApiKey = process.env.GROQ_API_KEY;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) {
      const val = vals.join('=').trim().replace(/^["']|["']$/g, '');
      if (key.trim() === 'GROQ_API_KEY') groqApiKey = val;
    }
  });
}

console.log('====================================================');
console.log('GROQ CLOUD API INFERENCE VERIFICATION');
console.log('====================================================');

if (!groqApiKey || groqApiKey.includes('your_groq')) {
  console.log('\n[Action Required]: Obtain your Groq API key at https://console.groq.com and set GROQ_API_KEY in .env');
  process.exit(0);
}

const candidateModels = ['groq/compound', 'groq/compound-mini', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];
let success = false;

for (const modelId of candidateModels) {
  console.log(`\nTesting model '${modelId}'...`);
  const startTime = Date.now();

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: 'system', content: 'You are a senior AI engineer. Respond in 1 brief sentence.' },
          { role: 'user', content: 'Diagnose the bottleneck of manual RFP scanning.' }
        ],
        max_tokens: 50,
        temperature: 0.2
      })
    });

    const latency = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      console.log(`\n[Success]: Groq Model '${modelId}' responded in ${latency}ms!`);
      console.log(`[Response]: "${content}"`);
      success = true;
      break;
    } else {
      const errData = await response.json().catch(() => ({}));
      console.log(`Model '${modelId}' failed (${response.status}): ${errData.error?.message || response.statusText}`);
    }
  } catch (err) {
    console.log(`Model '${modelId}' connection error: ${err.message}`);
  }
}

if (!success) {
  console.log('\n[Note]: Check that your GROQ_API_KEY is valid and active at https://console.groq.com/keys');
}
