import { useState, useCallback } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const throwError = useCallback((error: Error) => {
    setError(error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    throwError,
    clearError,
    hasError: error !== null,
  };
}

export default useErrorBoundary;