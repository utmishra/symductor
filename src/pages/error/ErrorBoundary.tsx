import React from 'react';
import ErrorModal from './ErrorModal';

interface ErrorData {
  errorMessageSummary: string;
  reason: string;
  possibleSolution: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode | React.ReactNode[]; // Add this line to define the 'children' prop
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorData: ErrorData | null;
  loading: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorData: null, loading: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, errorData: null, loading: false };
  }

  async componentDidCatch(error: Error, errorInfo: React.ErrorInfo): Promise<void> {
    console.log({ error, errorInfo });

    this.setState({ loading: true });

    try {
      const response = await fetch('/api/debug-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, errorInfo }),
      });

      const data: ErrorData = await response.json();
      this.setState({ errorData: data, loading: false });
    } catch (apiError) {
      console.error('Error calling /api/debug-error:', apiError);
      this.setState({ loading: false });
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.state.loading) {
        return <p>Error occurred: {this.state.errorData?.errorMessageSummary}. Loading details...</p>;
      }

      if (this.state.errorData) {
        return (
          <>
            <ErrorModal
              isOpen={this.state.hasError}
              onRequestClose={() => this.setState({ hasError: false, errorData: null })}
              response={this.state.errorData}
            />
            {this.props.children}
          </>
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
