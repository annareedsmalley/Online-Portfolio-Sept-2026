import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render/commit errors (e.g. transient DOM reconciliation failures
 * like "removeChild ... not a child of this node") so a single recoverable
 * error never blanks the entire app.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface the error for debugging without crashing the UI.
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="font-serif text-2xl text-title">Something went wrong</h1>
          <p className="font-sans text-sm text-title/70">
            Please reload the page to continue.
          </p>
          <button
            type="button"
            onClick={() => {
              this.handleReset();
              window.location.reload();
            }}
            className="rounded-md bg-terracotta px-5 py-3 font-label text-xs uppercase tracking-wider text-background transition-colors hover:bg-terracotta/90"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
