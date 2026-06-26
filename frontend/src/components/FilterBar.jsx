// filter bar — search input and filter toggle tabs in a clean horizontal row

import { Search } from "lucide-react";

export function FilterBar({ search, onSearch, filter, onFilter }) {
  const filters = [
    { id: "all", label: "All" },
    { id: "published", label: "Published" },
    { id: "unpublished", label: "Hidden" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl
                     placeholder:text-gray-400 text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-300
                     transition-all"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilter(f.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === f.id
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
