/**
 * Service client for sending intake scan payloads to the n8n backend engine.
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5679/webhook/rfp-scan';

/**
 * Triggers the n8n RFP Intelligence & Proposal pipeline.
 * @param {Object} payload Intake submission payload matching the system data contract.
 * @returns {Promise<Object>} Processed RFP matches & proposal drafts from n8n.
 */
export async function sendRFPScanPayload(payload) {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`n8n Webhook Error (${response.status}): ${errorText || response.statusText}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return { status: 'success', message: await response.text() };
}
