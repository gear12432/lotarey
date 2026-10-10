import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedPage } from './components/ProtectedPage';
import { ErrorBoundary } from './components/ErrorBoundary';

import { SplashScreen } from './pages/SplashScreen';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { CheckInPage } from './pages/CheckInPage';
import { LuckySpinPage } from './pages/LuckySpinPage';
import { LotteryResultsPage } from './pages/LotteryResultsPage';
import { LotteryListPage } from './pages/LotteryListPage';
import { LotteryDetailsPage } from './pages/LotteryDetailsPage';
import { DepositPage } from './pages/DepositPage';
import { WalletPage } from './pages/WalletPage';
import { VipTicketsPage } from './pages/VipTicketsPage';
import { GameDetailsPage } from './pages/GameDetailsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { SupportPage } from './pages/SupportPage';
import { ResponsiblePlayPage } from './pages/ResponsiblePlayPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/responsible-play" element={<ResponsiblePlayPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            {/* Protected Core App Routes */}
            <Route
              path="/"
              element={
                <ProtectedPage>
                  <HomePage />
                </ProtectedPage>
              }
            />
            <Route
              path="/check-in"
              element={
                <ProtectedPage>
                  <CheckInPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/lucky-spin"
              element={
                <ProtectedPage>
                  <LuckySpinPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedPage>
                  <LotteryResultsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/lotteries"
              element={
                <ProtectedPage>
                  <LotteryListPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/lottery/:drawId"
              element={
                <ProtectedPage>
                  <LotteryDetailsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/deposit"
              element={
                <ProtectedPage>
                  <DepositPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/wallet"
              element={
                <ProtectedPage>
                  <WalletPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/vip-tickets"
              element={
                <ProtectedPage>
                  <VipTicketsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/game/:gameId"
              element={
                <ProtectedPage>
                  <GameDetailsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedPage>
                  <NotificationsPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedPage>
                  <ProfilePage />
                </ProtectedPage>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedPage>
                  <EditProfilePage />
                </ProtectedPage>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedPage>
                  <TransactionHistoryPage />
                </ProtectedPage>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedPage>
                  <SupportPage />
                </ProtectedPage>
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
