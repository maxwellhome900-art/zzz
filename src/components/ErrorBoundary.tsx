import { Component, type ErrorInfo, type ReactNode } from "react";
import { btnPrimary } from "../lib/styles";

type State = { hasError: boolean };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-ink px-6 text-center text-paper">
        <div>
          <p className="font-grotesk text-[11px] tracking-[0.32em] text-neon">THE PAGE PAUSED</p>
          <h1 className="mt-4 font-display text-4xl uppercase">Please refresh and try again.</h1>
          <button type="button" className={`${btnPrimary} mt-8`} onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    );
  }
}
