import { useState, useEffect } from "react";

const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  const ErrorBoundaryWrapper = ({ children }) => {
    useEffect(() => {
      const errorHandler = (errorEvent) => {
        setError(errorEvent.error);
        setHasError(true);
      };

      window.addEventListener("error", errorHandler);

      return () => {
        window.removeEventListener("error", errorHandler);
      };
    }, []);

    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error && error.toString()}
          </details>
          <button onClick={resetError}>Try again</button>
        </div>
      );
    }

    return children;
  };

  return ErrorBoundaryWrapper;
};

export default useErrorBoundary;
