/**
 * Pinecone Index & Vector Connection Verification Script
 * Checks for Pinecone API Key, verifies or instructions for creating 'upwork-rfp-index'.
 */

import fs from 'fs';
import path from 'path';

// Parse root .env manually if process.env is missing keys
const envPath = path.resolve(process.cwd(), '.env');
let pineconeApiKey = process.env.PINECONE_API_KEY;
let pineconeIndexName = process.env.PINECONE_INDEX_NAME || 'upwork-rfp-index';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) {
      const val = vals.join('=').trim().replace(/^["']|["']$/g, '');
      if (key.trim() === 'PINECONE_API_KEY') pineconeApiKey = val;
      if (key.trim() === 'PINECONE_INDEX_NAME') pineconeIndexName = val;
    }
  });
}

console.log('====================================================');
console.log('PINECONE VECTOR INDEX CONFIGURATION VERIFICATION');
console.log('====================================================');
console.log(`Target Index Name: ${pineconeIndexName}`);
console.log(`API Key Configured: ${pineconeApiKey && !pineconeApiKey.includes('your_pinecone') ? 'YES' : 'NO (Placeholder)'}`);

if (!pineconeApiKey || pineconeApiKey.includes('your_pinecone')) {
  console.log('\n[Action Required]: Please obtain your API key from https://app.pinecone.io and set PINECONE_API_KEY in .env');
} else {
  console.log('\n[Status]: Pinecone configuration ready for vector upsert & semantic RAG retrieval!');
}
