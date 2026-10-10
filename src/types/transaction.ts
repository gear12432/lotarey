export type TransactionType = 
  | 'deposit' 
  | 'withdrawal' 
  | 'ticket_purchase' 
  | 'checkin_reward' 
  | 'spin_reward' 
  | 'lottery_win';

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  reference: string;
  paymentMethod?: string;
  description: string;
  createdAt: string;
}
