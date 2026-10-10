import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertOctagon } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#EEF2F3] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mb-4 shadow-sm">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-1">Oops! Something went wrong</h2>
          <p className="text-xs text-slate-600 font-medium max-w-xs mb-6">
            We encountered an unexpected error. Please try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#F36B16] hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
