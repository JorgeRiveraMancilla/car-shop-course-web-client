import { useCallback, useState } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export const useErrorBoundary = () => {
  const [state, setState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
  });

  const resetErrorBoundary = useCallback(() => {
    setState({ hasError: false, error: null });
  }, []);

  const captureError = useCallback((error: Error) => {
    setState({ hasError: true, error });
  }, []);

  return {
    ...state,
    resetErrorBoundary,
    captureError,
  };
};
