// footer component — sits at the bottom of the page with links, tech stack, and copyright.

import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand + Description */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <span className="text-base font-bold text-gray-900">DishBoard</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              A full-stack dish management dashboard built with real-time sync, optimistic UI, and production-grade architecture.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Vite", "Tailwind CSS", "Node.js", "Express", "SQLite", "Socket.IO", "Axios"].map((tech) => (
                <span key={tech} className="text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Get In Touch</h4>
            <a
              href="mailto:kasula.lalithendra2024@nst.rishihood.edu.in"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent-500 transition-colors mb-3"
            >
              <Mail size={15} />
              kasula.lalithendra2024@nst.rishihood.edu.in
            </a>
            <p className="text-xs text-gray-400 mt-2">
              Built for Euphotic Labs recruitment assignment.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Kasula Lalithendra. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
