/**
 * Service client for sending intake scan payloads to the n8n backend engine.
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5679/webhook/rfp-scan';

/**
 * Triggers the n8n RFP Intelligence & Proposal pipeline.
 * @param {Object} payload Intake submission payload matching the system data contract.
 * @returns {Promise<Array<Object>>} Processed RFP matches & proposal drafts from n8n.
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

  const rawText = await response.text();
  if (!rawText || !rawText.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawText);
    let itemsArray = [];
    if (Array.isArray(parsed)) {
      itemsArray = parsed;
    } else if (parsed && Array.isArray(parsed.items)) {
      itemsArray = parsed.items;
    } else if (parsed && typeof parsed === 'object') {
      itemsArray = [parsed];
    }

    // Automatically unwrap n8n's default { json: { ... } } item wrappers
    return itemsArray.map((item) => (item && item.json ? item.json : item));
  } catch (err) {
    console.warn('Failed to parse n8n JSON response:', err);
    return [];
  }
}
