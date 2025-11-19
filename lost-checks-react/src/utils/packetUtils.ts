import type { PacketData, PacketType, CheckStatus } from '../api/useAffidavitPacketQuery';

/**
 * Calculate business days between two dates
 */
export function getBusinessDaysBetween(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);
  
  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

/**
 * Check if date is 3+ years old
 */
export function isThreeYearsOld(date: Date): boolean {
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  return date < threeYearsAgo;
}

/**
 * Get packet contents based on packet type
 */
export function getPacketContents(packetType: PacketType, checkCount: number): string[] {
  switch (packetType) {
    case 'Affidavit':
      return [
        'LCAF Cover Letter (1 per packet)',
        `DCSS 0317 form (${checkCount} per check number)`,
        'Affidavit Back Page (1 per packet)'
      ];
    case 'Fraud':
      return [
        'Fraud Cover Letter (Wells Fargo Paid Cover Letter) (1 per packet)',
        'Wells Fargo Fraud Instructions for payees (1 per packet)',
        `Wells Fargo Fraud Affidavit form (${checkCount} per check number)`,
        `DCSS 0317 form (${checkCount} per check number)`,
        'Affidavit Back Page (1 per packet)'
      ];
    case 'Rejection':
      return [
        'LCAF Rejection Letter (1 per packet)',
        'Retrieve & reprint Affidavit packet'
      ];
    case 'Fraud Rejection':
      return [
        'Fraud Rejection Letter (1 per packet)',
        'Retrieve & reprint Fraud packet'
      ];
    default:
      return [];
  }
}

/**
 * Check business rules and return messages/errors
 */
export interface BusinessRuleResult {
  hasError: boolean;
  errorMessage?: string;
  autoMessages: string[];
  isPriority: boolean;
  shouldNotifyEmail: boolean;
}

export function checkBusinessRules(data: PacketData): BusinessRuleResult {
  const result: BusinessRuleResult = {
    hasError: false,
    autoMessages: [],
    isPriority: false,
    shouldNotifyEmail: false
  };

  const today = new Date();
  const isStolenOrFraud = data.reason === 'Stolen' || data.reason === 'Fraud';

  // Check each check
  for (const check of data.checks) {
    const issueDate = new Date(check.issue_date);
    
    // Rule 4: 3+ years old check
    if (isThreeYearsOld(issueDate)) {
      result.hasError = true;
      result.errorMessage = 'There is a 3-year limit on fraud claims. Your request cannot be processed.';
      return result;
    }

    // Rule 1: Check if issue date < 10 business days
    const businessDays = getBusinessDaysBetween(issueDate, today);
    if (businessDays < 10 && !isStolenOrFraud) {
      result.autoMessages.push('Please allow 10 business days for postal delivery.');
    }

    // Rule 2: Check if status is Issued
    if (check.status === 'Issued') {
      result.isPriority = true;
      result.shouldNotifyEmail = true;
    }
  }

  return result;
}

