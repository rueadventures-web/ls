import { useMutation } from '@tanstack/react-query';
import type { AffidavitFormData } from './types';
import { USE_MOCK_API } from './types';

async function submitAffidavit(data: AffidavitFormData): Promise<{ success: boolean; id: number }> {
  if (USE_MOCK_API) {
    await new Promise(r => setTimeout(r, 500));
    return { success: true, id: Math.floor(Math.random() * 1000) };
  }
  throw new Error('Real API not implemented');
}

export function useSubmitAffidavit() {
  return useMutation({
    mutationFn: submitAffidavit,
  });
}

