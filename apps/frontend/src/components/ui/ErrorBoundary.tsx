import React, { Component, ErrorInfo, ReactNode } from "react";

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
    console.error("SmartBank Error Boundary Caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080A0F] text-white flex items-center justify-center p-6">
          <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-red-500/30 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-3xl flex items-center justify-center mx-auto">
              ⚠️
            </div>
            <h3 className="text-xl font-bold text-white">Application Exception Shield</h3>
            <p className="text-xs text-slate-400">
              SmartBank Shield caught a component render error. Your account data remains 100% secure.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl font-bold text-xs text-white shadow-lg"
            >
              Reload Application Workspace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
