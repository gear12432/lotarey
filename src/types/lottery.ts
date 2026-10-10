export interface LotteryDraw {
  id: string;
  code: string; // e.g. "AK-680", "FF-89", "NR-380"
  name: string; // e.g. "Akshaya", "Fifty Fifty", "Nirmal", "Karunya Plus", "X'Mas New Year Bumper"
  day: string; // e.g. "Wednesday", "Sunday", "Bumper Draw"
  firstPrize: string; // e.g. "₹80,00,000" or "₹25 Crore"
  firstPrizeAmount: number;
  ticketPrice: number; // e.g. 50
  drawDate: string; // YYYY-MM-DD
  drawTime: string; // "03:00 PM"
  isBumper?: boolean;
  status: 'upcoming' | 'live' | 'completed';
  bannerImage?: string;
  description?: string;
}

export interface LotteryResult {
  id: string;
  drawCode: string;
  lotteryName: string;
  drawDate: string;
  drawTime: string;
  firstPrizeNumber: string;
  firstPrizeAmount: string;
  secondPrizeNumbers: string[];
  secondPrizeAmount: string;
  thirdPrizeNumbers: string[];
  thirdPrizeAmount: string;
  consolationNumbers: string[];
  consolationAmount: string;
  pdfUrl?: string;
  verifiedSource: string;
}

export interface PurchasedTicket {
  id: string;
  userId: string;
  drawId: string;
  lotteryName: string;
  drawCode: string;
  ticketNumber: string; // e.g. "AK-89214"
  price: number;
  purchaseDate: string;
  drawDate: string;
  status: 'active' | 'won' | 'lost';
  prizeWon?: number;
}

export interface PopularGame {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  minBet: number;
  maxWinMultiplier: string;
  isHot?: boolean;
  isNew?: boolean;
}
