// navbar component — sticky top bar with logo, nav, live indicator, and contact button.
// stays visible on scroll and provides consistent top-level navigation.

import { Mail, Wifi } from "lucide-react";

export function Navbar({ onShowOnboarding }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-overlay border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left — Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-lg font-bold leading-none">D</span>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">DishBoard</span>
          </div>

          {/* Center — Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#dashboard" className="px-3 py-2 text-sm font-medium text-accent-500 bg-accent-50 rounded-lg">
              Dashboard
            </a>
            <button
              onClick={onShowOnboarding}
              className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
            >
              How It Works
            </button>
          </div>

          {/* Right — Status + Contact */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Live Sync
            </div>
            <a
              href="mailto:kasula.lalithendra2024@nst.rishihood.edu.in"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-accent-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              <Mail size={15} />
              <span className="hidden sm:inline">Contact Candidate</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
