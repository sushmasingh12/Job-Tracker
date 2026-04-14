import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-900">
          <div className="max-w-md w-full bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-3xl">
                warning
              </span>
            </div>
            
            <h1 className="font-playfair text-2xl font-bold text-neutral-900 dark:text-white mb-3">
              Something went wrong
            </h1>
            
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-8">
              We've encountered an unexpected error. Don't worry, your data is safe. 
              Please try refreshing the page or head back to the dashboard.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
              >
                Reload Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all active:scale-[0.98]"
              >
                Back to Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-700 text-left">
                <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">
                  Error Details (Dev Only)
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 overflow-auto max-h-32">
                   <code className="text-xs text-red-500 font-mono break-all line-clamp-4">
                     {this.state.error?.toString()}
                   </code>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
