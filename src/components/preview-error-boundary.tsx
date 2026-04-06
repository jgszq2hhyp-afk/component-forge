"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  name: string;
  category: string;
}

interface State {
  hasError: boolean;
  error: string | null;
}

export class PreviewErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="max-w-md rounded-lg border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="text-sm font-medium text-red-400">Render error</p>
            <p className="mt-1 text-xs text-neutral-500">
              {this.props.category}/{this.props.name}
            </p>
            {this.state.error && (
              <pre className="mt-3 overflow-auto rounded bg-neutral-900 p-2 text-left text-xs text-neutral-500">
                {this.state.error}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
