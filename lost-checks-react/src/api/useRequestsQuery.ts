import { useQuery } from '@tanstack/react-query';
import type { Request } from './types';
import { USE_MOCK_API } from './types';

const MOCK_SUBMITTED: Request[] = [
  { id: 201, participant_name: "Maria Lopez", case_number: "88888", updated_at: "2024-11-19", status: "Submitted" }
];

const MOCK_COMPLETED: Request[] = [
  { id: 301, participant_name: "Jake Kim", case_number: "77777", updated_at: "2024-10-01", status: "Completed" }
];

async function fetchSubmitted(): Promise<Request[]> {
  if (USE_MOCK_API) {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_SUBMITTED;
  }
  throw new Error('Real API not implemented');
}

async function fetchCompleted(): Promise<Request[]> {
  if (USE_MOCK_API) {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_COMPLETED;
  }
  throw new Error('Real API not implemented');
}

export function useSubmittedQuery() {
  return useQuery({
    queryKey: ['submitted'],
    queryFn: fetchSubmitted,
  });
}

export function useCompletedQuery() {
  return useQuery({
    queryKey: ['completed'],
    queryFn: fetchCompleted,
  });
}

