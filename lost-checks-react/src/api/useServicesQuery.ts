import { useQuery } from '@tanstack/react-query';
import type { Service } from './types';
import { USE_MOCK_API } from './types';

const MOCK_SERVICES: Service[] = [
  { id: 1, name: "Lost Check Affidavit", description: "Request affidavit for lost or stolen checks" },
  { id: 2, name: "Fraud Review", description: "Review fraud or suspicious activity" },
  { id: 3, name: "Packet Generation", description: "Generate all forms for CSE upload" }
];

async function fetchServices(): Promise<Service[]> {
  if (USE_MOCK_API) {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_SERVICES;
  }
  throw new Error('Real API not implemented');
}

export function useServicesQuery() {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });
}

