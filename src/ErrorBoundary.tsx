import React, { Component } from 'react';

type State = {
  hasError: boolean;
  errorMessage?: string;
};

class ErrorBoundary extends Component<{}, State> {
  state: State = { hasError: false };
  errorTimeout?: NodeJS.Timeout;

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught an error:", error, errorInfo);

    // Hide the error message after 30 seconds
    this.errorTimeout = setTimeout(() => {
      this.setState({ hasError: false, errorMessage: undefined });
    }, 30000);
  }

  componentWillUnmount() {
    // Clear the timeout when the component is unmounted to avoid memory leaks
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-container">{this.state.errorMessage}</div>;
    }
  }
}

export default ErrorBoundary;
