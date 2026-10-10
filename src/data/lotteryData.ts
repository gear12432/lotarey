import { LotteryDraw, LotteryResult, PopularGame } from '../types/lottery';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 2);

export const KERALA_LOTTERIES: LotteryDraw[] = [
  {
    id: 'draw-ak-680',
    code: 'AK-680',
    name: 'Akshaya Lottery',
    day: 'Wednesday',
    firstPrize: '₹70 Lakhs',
    firstPrizeAmount: 7000000,
    ticketPrice: 50,
    drawDate: today.toISOString().split('T')[0],
    drawTime: '03:00 PM',
    status: 'live',
    description: '1st Prize: ₹70,00,000 | 2nd Prize: ₹5,00,000 | Consolation: ₹8,000',
  },
  {
    id: 'draw-ff-95',
    code: 'FF-95',
    name: 'Fifty Fifty',
    day: 'Sunday',
    firstPrize: '₹1 Crore',
    firstPrizeAmount: 10000000,
    ticketPrice: 50,
    drawDate: tomorrow.toISOString().split('T')[0],
    drawTime: '03:00 PM',
    status: 'upcoming',
    description: '1st Prize: ₹1,00,00,000 | 2nd Prize: ₹10,00,000 | 3rd Prize: ₹5,000',
  },
  {
    id: 'draw-kn-520',
    code: 'KN-520',
    name: 'Karunya Plus',
    day: 'Thursday',
    firstPrize: '₹80 Lakhs',
    firstPrizeAmount: 8000000,
    ticketPrice: 50,
    drawDate: dayAfter.toISOString().split('T')[0],
    drawTime: '03:00 PM',
    status: 'upcoming',
    description: '1st Prize: ₹80,00,000 | 2nd Prize: ₹10,00,000 | 3rd Prize: ₹1,00,000',
  },
  {
    id: 'draw-br-2026',
    code: 'BR-2026',
    name: 'Bumper Mega Draw',
    day: 'Special Bumper',
    firstPrize: '₹25 Crore',
    firstPrizeAmount: 250000000,
    ticketPrice: 500,
    drawDate: '2026-11-01',
    drawTime: '02:00 PM',
    isBumper: true,
    status: 'upcoming',
    description: 'Mega Bumper Draw! 1st Prize ₹25 Crore + 20 Second Prizes of ₹1 Crore each!',
  },
  {
    id: 'draw-nr-385',
    code: 'NR-385',
    name: 'Nirmal Lottery',
    day: 'Friday',
    firstPrize: '₹70 Lakhs',
    firstPrizeAmount: 7000000,
    ticketPrice: 50,
    drawDate: '2026-10-16',
    drawTime: '03:00 PM',
    status: 'upcoming',
    description: '1st Prize: ₹70,00,000 | 2nd Prize: ₹10,00,000',
  },
  {
    id: 'draw-ss-410',
    code: 'SS-410',
    name: 'Sthree Sakthi',
    day: 'Tuesday',
    firstPrize: '₹75 Lakhs',
    firstPrizeAmount: 7500000,
    ticketPrice: 50,
    drawDate: '2026-10-13',
    drawTime: '03:00 PM',
    status: 'upcoming',
    description: '1st Prize: ₹75,00,000 | 2nd Prize: ₹10,00,000',
  }
];

export const RECENT_RESULTS: LotteryResult[] = [
  {
    id: 'res-ak-679',
    drawCode: 'AK-679',
    lotteryName: 'Akshaya',
    drawDate: '2026-10-07',
    drawTime: '03:00 PM',
    firstPrizeNumber: 'AZ-739201',
    firstPrizeAmount: '₹70 Lakhs',
    secondPrizeNumbers: ['AY-109238', 'AX-883920'],
    secondPrizeAmount: '₹5 Lakhs',
    thirdPrizeNumbers: ['1029', '3849', '9920', '5810', '4819'],
    thirdPrizeAmount: '₹1,00,000',
    consolationNumbers: ['AZ-109283', 'AZ-883921'],
    consolationAmount: '₹8,000',
    verifiedSource: 'Directorate of Kerala State Lotteries (Sample Live Data)'
  },
  {
    id: 'res-ff-94',
    drawCode: 'FF-94',
    lotteryName: 'Fifty Fifty',
    drawDate: '2026-10-04',
    drawTime: '03:00 PM',
    firstPrizeNumber: 'FN-294810',
    firstPrizeAmount: '₹1 Crore',
    secondPrizeNumbers: ['FM-902381'],
    secondPrizeAmount: '₹10 Lakhs',
    thirdPrizeNumbers: ['5920', '1920', '8839', '2019'],
    thirdPrizeAmount: '₹5,000',
    consolationNumbers: ['FN-294811', 'FN-294809'],
    consolationAmount: '₹8,000',
    verifiedSource: 'Directorate of Kerala State Lotteries (Sample Live Data)'
  },
  {
    id: 'res-kn-519',
    drawCode: 'KN-519',
    lotteryName: 'Karunya Plus',
    drawDate: '2026-10-01',
    drawTime: '03:00 PM',
    firstPrizeNumber: 'KS-882031',
    firstPrizeAmount: '₹80 Lakhs',
    secondPrizeNumbers: ['KR-201938'],
    secondPrizeAmount: '₹10 Lakhs',
    thirdPrizeNumbers: ['8812', '9021', '3391', '1092'],
    thirdPrizeAmount: '₹1,00,000',
    consolationNumbers: ['KS-882030', 'KS-882032'],
    consolationAmount: '₹8,000',
    verifiedSource: 'Directorate of Kerala State Lotteries (Sample Live Data)'
  }
];

export const POPULAR_GAMES: PopularGame[] = [
  {
    id: 'game-digit-predict',
    title: 'Digit Predictor 3D',
    category: 'Prediction',
    description: 'Predict the last 3 digits of today\'s live Akshaya draw to win 50x rewards!',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=60',
    minBet: 10,
    maxWinMultiplier: '50x',
    isHot: true
  },
  {
    id: 'game-scratch-card',
    title: 'Gold Scratch Surprise',
    category: 'Instant Win',
    description: 'Scratch 3 matching Kerala Gold coins to instantly win up to ₹10,000 in your wallet!',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60',
    minBet: 20,
    maxWinMultiplier: '100x',
    isHot: true
  },
  {
    id: 'game-color-wheel',
    title: 'Color Wheel Jackpot',
    category: 'Spin Game',
    description: 'Choose Orange, Gold, or Green and spin the Kerala Jackpot Wheel!',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=500&auto=format&fit=crop&q=60',
    minBet: 10,
    maxWinMultiplier: '10x',
    isNew: true
  },
  {
    id: 'game-lucky-7',
    title: 'Lucky 3-Digit Matka',
    category: 'Matka Match',
    description: 'Select your lucky 3 digits and match with live hourly draw results.',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=500&auto=format&fit=crop&q=60',
    minBet: 50,
    maxWinMultiplier: '80x'
  }
];

export const SAMPLE_TICKER_WINNERS = [
  "🎉 Rahul K. from Ernakulam won ₹5,00,000 on Fifty Fifty FF-94!",
  "🎉 Ananya P. from Kozhikode won ₹1,00,000 on Akshaya AK-679!",
  "🎉 Muhammad S. from Malappuram won ₹70,00,000 1st Prize on Nirmal!",
  "🎉 Varghese M. from Thrissur won ₹80 Lakhs on Karunya Plus!",
  "🎉 Lakshmi R. from Thiruvananthapuram won ₹10,000 in Lucky Spin!",
  "🎉 Santhosh T. from Kollam won ₹25,000 in Check-in Streak!"
];
