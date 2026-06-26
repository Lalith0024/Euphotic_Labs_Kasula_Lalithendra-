// root component — composes navbar, stats, filters, dish grid, detail modal,
// onboarding modal, and footer into a cohesive dashboard layout.

import { useState, useMemo, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDishes } from "./hooks/useDishes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { DishCard } from "./components/DishCard";
import { DishDetailModal } from "./components/DishDetailModal";
import { StatsBar } from "./components/StatsBar";
import { FilterBar } from "./components/FilterBar";
import { SkeletonCard } from "./components/SkeletonCard";
import { EmptyState } from "./components/EmptyState";
import { ErrorBanner } from "./components/ErrorBanner";
import { OnboardingModal } from "./components/OnboardingModal";

export default function App() {
  const { dishes, loading, error, togglingIds, handleToggle, reload } = useDishes();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // show onboarding on first visit
  useEffect(() => {
    const viewed = localStorage.getItem("dishboard_onboarding_viewed");
    if (!viewed) setShowOnboarding(true);
  }, []);

  // keep selectedDish in sync with live data (if it gets toggled via socket while modal is open)
  const liveDish = selectedDish
    ? dishes.find((d) => d.dishId === selectedDish.dishId) || selectedDish
    : null;

  // filter + search
  const visibleDishes = useMemo(() => {
    return dishes.filter((d) => {
      const matchesSearch = d.dishName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "published" && d.isPublished) ||
        (filter === "unpublished" && !d.isPublished);
      return matchesSearch && matchesFilter;
    });
  }, [dishes, search, filter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      {/* Toast config */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      />

      {/* Modals */}
      <OnboardingModal show={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <DishDetailModal
        dish={liveDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        onToggle={handleToggle}
        isToggling={selectedDish ? togglingIds.has(selectedDish.dishId) : false}
      />

      {/* Navbar */}
      <Navbar onShowOnboarding={() => setShowOnboarding(true)} />

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Dish Management
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-lg">
            Manage the visibility of dishes across the platform. Click any dish to view details and toggle its publish status. Changes sync in real time.
          </p>
        </div>

        {/* Stats row */}
        {!loading && !error && (
          <div className="mb-8">
            <StatsBar dishes={dishes} />
          </div>
        )}

        {/* Filters */}
        {!loading && !error && (
          <div className="mb-8">
            <FilterBar
              search={search}
              onSearch={setSearch}
              filter={filter}
              onFilter={setFilter}
            />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <ErrorBanner message={error} onRetry={reload} />
          ) : visibleDishes.length === 0 ? (
            <EmptyState
              message={search ? `No dishes matching "${search}"` : "No dishes in this category."}
            />
          ) : (
            visibleDishes.map((dish, i) => (
              <div key={dish.dishId} className={`stagger-${(i % 12) + 1}`}>
                <DishCard
                  dish={dish}
                  onClick={() => setSelectedDish(dish)}
                />
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
