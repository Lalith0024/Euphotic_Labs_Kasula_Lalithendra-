// dish detail modal — opens when you click a dish card
// shows the enlarged image, full info, and clear publish/unpublish action
// this makes the toggle feel intentional, not accidental

import { X, Eye, EyeOff, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DishDetailModal({ dish, isOpen, onClose, onToggle, isToggling }) {
  if (!isOpen || !dish) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-overlay"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-modal overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors shadow-sm"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div className="relative h-64 sm:h-72 bg-gray-100 overflow-hidden">
            <img
              src={dish.imageUrl}
              alt={dish.dishName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/600x400/f1f5f9/94a3b8?text=${encodeURIComponent(dish.dishName)}`;
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Status badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                dish.isPublished
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
              }`}>
                {dish.isPublished ? <Eye size={13} /> : <EyeOff size={13} />}
                {dish.isPublished ? "Currently Published" : "Currently Hidden"}
              </span>
            </div>

            {/* Title + ID */}
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{dish.dishName}</h2>
            <p className="text-sm text-gray-400 font-mono mb-6">{dish.dishId}</p>

            {/* Info box */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                {dish.isPublished
                  ? "This dish is visible to customers on the platform. Unpublishing will immediately hide it from all menus."
                  : "This dish is hidden from the platform. Publishing will make it visible to all customers immediately."}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-2xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onToggle(dish.dishId);
                  onClose();
                }}
                disabled={isToggling}
                className={`flex-1 py-3 px-4 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  dish.isPublished
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                    : "bg-accent-500 hover:bg-accent-600 text-white shadow-sm"
                } disabled:opacity-50 disabled:cursor-wait`}
              >
                {isToggling ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing…
                  </>
                ) : dish.isPublished ? (
                  <>
                    <EyeOff size={16} />
                    Unpublish Dish
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Publish Dish
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
