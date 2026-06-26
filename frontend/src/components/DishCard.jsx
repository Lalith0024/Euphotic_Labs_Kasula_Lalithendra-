// dish card — clean card showing the dish image, name, status, and a subtle CTA.
// clicking the card opens the detail modal for a proper publish/unpublish interaction.

import { Eye, EyeOff } from "lucide-react";

export function DishCard({ dish, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer
                 shadow-card hover:shadow-card-hover hover:-translate-y-1
                 transition-all duration-300 ease-out opacity-0 animate-fade-in-up"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.dishName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/f1f5f9/94a3b8?text=${encodeURIComponent(dish.dishName)}`;
          }}
        />

        {/* Status pill overlay */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm ${
            dish.isPublished
              ? "bg-emerald-50/90 text-emerald-700 backdrop-blur-sm ring-1 ring-emerald-200/50"
              : "bg-white/90 text-gray-500 backdrop-blur-sm ring-1 ring-gray-200/50"
          }`}>
            {dish.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
            {dish.isPublished ? "Live" : "Hidden"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase mb-1.5">{dish.dishId}</p>
        <h3 className="text-[15px] font-semibold text-gray-900 truncate group-hover:text-accent-500 transition-colors">
          {dish.dishName}
        </h3>

        {/* CTA hint */}
        <div className="mt-4 flex items-center justify-between">
          <span className={`text-xs font-medium ${dish.isPublished ? "text-emerald-600" : "text-gray-400"}`}>
            {dish.isPublished ? "Published" : "Unpublished"}
          </span>
          <span className="text-xs font-medium text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to manage →
          </span>
        </div>
      </div>
    </div>
  );
}
