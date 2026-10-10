# Kerala Lottery Live — User Application

A complete, mobile-first **Kerala Lottery Live** web application built with React 19, TypeScript, Vite, Tailwind CSS, and Firebase Authentication & Firestore Database.

## Features

- **Top Header Bar**: Orange gradient header with app title, refresh, notifications badge, support helpline, and wallet quick balance.
- **Hero Promotional Carousel**: Auto-rotating banners for Mega Bumper draws, live draw countdowns, and daily bonus offers.
- **Live Winner Ticker**: Scrolling announcement ticker displaying recent draw winners.
- **Four Quick Actions**:
  - 📅 **Check In**: 7-Day streak daily cash bonus calendar.
  - 🎡 **Lucky Spin**: Interactive spinning wheel with 3 free daily cash spins.
  - 🏆 **Result**: Search draw results and ticket number lookup tool.
  - ➕ **Deposit**: Instant wallet deposit via UPI QR code.
- **VIP Promotional Banner**: VIP pass tiers with cashback privileges & priority bumper ticket allocations.
- **Kerala Lotteries Section**: Horizontal card carousel for Akshaya, Fifty Fifty, Karunya Plus, Nirmal, Sthree Sakthi, and Bumper Draws with live countdown timers.
- **Most Popular Games**: Interactive prediction mini-games (Digit Predictor, Gold Scratch Card).
- **Floating Deposit Shortcut**: Quick action deposit button.
- **Full Authentication & Realtime Firestore Database**:
  - Firebase Email & Password Signup & Login.
  - Firebase Google Sign-In via popup.
  - Password Reset flow via Firebase Auth.
  - Realtime user profile and wallet balance tracking.
  - Secure ABAC Security Rules (`firestore.rules`).

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM (`HashRouter` for 100% GitHub Pages compatibility)
- **Database & Auth**: Firebase Auth + Cloud Firestore
- **Deployment**: GitHub Pages via GitHub Actions

---

## Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/gear12432/Gklottery.git
cd Gklottery
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local` and add your Firebase credentials if running standalone:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## GitHub Pages Deployment

This project includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

### How to deploy to GitHub Pages:
1. Push your code to the `main` or `master` branch on GitHub:
   ```bash
   git add .
   git commit -m "Deploy Kerala Lottery Live"
   git push origin main
   ```
2. On GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow will automatically trigger, build the Vite app with base path `/Gklottery/`, and publish the compiled `dist/` directory to GitHub Pages.

---

## Disclaimer

Kerala Lottery Live is an independent user application for live draw information, ticket results, and wallet simulation. It is not affiliated with any official government authority. Play responsibly (18+).
