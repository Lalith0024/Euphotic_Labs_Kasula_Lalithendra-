// empty state — shown when search/filter returns no results

import { SearchX } from "lucide-react";

export function EmptyState({ message }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-400">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-5">
        <SearchX size={28} className="text-gray-300" />
      </div>
      <p className="text-base font-medium text-gray-500">{message || "No dishes found."}</p>
      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter.</p>
    </div>
  );
}
