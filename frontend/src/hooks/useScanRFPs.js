import { useMutation } from '@tanstack/react-query';
import { sendRFPScanPayload } from '../services/n8nWebhookService';
import { useSearchFilter } from '../context/SearchFilterContext';

/**
 * Custom React Query hook for triggering n8n RFP scans and updating context state.
 */
export function useScanRFPs() {
  const { setScanResults, setIsScanning, setLastScanError } = useSearchFilter();

  return useMutation({
    mutationFn: (payload) => sendRFPScanPayload(payload),
    onMutate: () => {
      setIsScanning(true);
      setLastScanError(null);
    },
    onSuccess: (data) => {
      setScanResults(data);
      setIsScanning(false);
    },
    onError: (error) => {
      console.error('React Query Scan Error:', error);
      setLastScanError(error.message || 'Failed to connect to n8n backend engine.');
      setIsScanning(false);
    },
  });
}
