import { useQuery } from '@tanstack/react-query';
import type { Request } from './types';
import { USE_MOCK_API } from './types';

export interface PacketData extends Request {
  reason: string;
  date_reported: string;
  checks: {
    check_number: string;
    date: string;
    amount: string;
    bank: string;
  }[];
}

const MOCK_PACKET_DATA: Record<number, PacketData> = {
  201: {
    id: 201,
    participant_name: "Maria Lopez",
    case_number: "88888",
    updated_at: "2024-11-19",
    status: "Submitted",
    reason: "Lost",
    date_reported: "2024-11-19",
    checks: [
      { check_number: "123456", date: "2024-09-01", amount: "250.00", bank: "Wells Fargo" },
      { check_number: "123457", date: "2024-09-15", amount: "500.00", bank: "Wells Fargo" }
    ]
  },
  301: {
    id: 301,
    participant_name: "Jake Kim",
    case_number: "77777",
    updated_at: "2024-10-01",
    status: "Completed",
    reason: "Stolen",
    date_reported: "2024-10-01",
    checks: [
      { check_number: "789012", date: "2024-08-20", amount: "750.00", bank: "Chase Bank" }
    ]
  }
};

async function fetchAffidavitPacket(id: number): Promise<PacketData> {
  if (USE_MOCK_API) {
    await new Promise(r => setTimeout(r, 300));
    const data = MOCK_PACKET_DATA[id];
    if (!data) {
      throw new Error(`Packet with id ${id} not found`);
    }
    return data;
  }
  throw new Error('Real API not implemented');
}

export function useAffidavitPacketQuery(id: number) {
  return useQuery({
    queryKey: ['affidavit-packet', id],
    queryFn: () => fetchAffidavitPacket(id),
    enabled: !!id,
  });
}

