export interface Service {
  id: number;
  name: string;
  description: string;
}

export interface Check {
  checkNumber: string;
  checkAmount: string;
  checkDate: string;
  bankName: string;
  notes: string;
}

export interface AffidavitFormData {
  participantName: string;
  caseNumber: string;
  affidavitReason: 'Lost' | 'Stolen' | 'Damaged' | 'Fraud';
  dateReported: string;
  checks: Check[];
  docusignRequested: boolean;
}

export interface Request {
  id: number;
  participant_name: string;
  case_number: string;
  updated_at: string;
  status?: string;
}

const USE_MOCK_API = true;

export { USE_MOCK_API };

