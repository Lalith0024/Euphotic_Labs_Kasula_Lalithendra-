// error banner — shown when API fails, with clear retry action

import { AlertTriangle, RefreshCw } from "lucide-react";

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="col-span-full bg-red-50 border border-red-200/50 rounded-2xl p-8 flex flex-col items-center gap-5 text-center">
      <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
        <AlertTriangle size={26} className="text-red-500" />
      </div>
      <div>
        <p className="text-red-800 font-semibold text-base">{message}</p>
        <p className="text-red-500 text-sm mt-1">Make sure the backend server is running on port 5000.</p>
      </div>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors"
      >
        <RefreshCw size={15} />
        Try Again
      </button>
    </div>
  );
}
