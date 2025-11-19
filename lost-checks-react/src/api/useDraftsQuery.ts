import { useQuery } from '@tanstack/react-query';
import type { Request } from './types';
import { USE_MOCK_API } from './types';

const MOCK_DRAFTS: Request[] = [
  { id: 101, participant_name: "John Smith", case_number: "12345", updated_at: "2024-11-20", status: "Draft" }
];

async function fetchDrafts(): Promise<Request[]> {
  if (USE_MOCK_API) {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_DRAFTS;
  }
  throw new Error('Real API not implemented');
}

export function useDraftsQuery() {
  return useQuery({
    queryKey: ['drafts'],
    queryFn: fetchDrafts,
  });
}

