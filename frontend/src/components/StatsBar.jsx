// stats bar — shows key metrics in a clean horizontal row
// uses proper icons and consistent color coding

import { LayoutGrid, Eye, EyeOff } from "lucide-react";

export function StatsBar({ dishes }) {
  const total = dishes.length;
  const published = dishes.filter((d) => d.isPublished).length;
  const unpublished = total - published;

  const stats = [
    { label: "Total Dishes", value: total, icon: LayoutGrid, iconColor: "text-accent-500", bgColor: "bg-accent-50" },
    { label: "Published", value: published, icon: Eye, iconColor: "text-emerald-600", bgColor: "bg-emerald-50" },
    { label: "Hidden", value: unpublished, icon: EyeOff, iconColor: "text-amber-600", bgColor: "bg-amber-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className={stat.iconColor} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">{stat.value}</p>
              <p className="text-xs font-medium text-gray-400 mt-1">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
