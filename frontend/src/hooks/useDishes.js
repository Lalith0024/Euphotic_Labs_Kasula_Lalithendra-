// custom hook that owns all dish state and socket logic
// components just call this and get data + actions back — no raw api calls in components
// socket.io listener here handles the real-time bonus requirement

import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { fetchAllDishes, toggleDishPublished } from "../api/dishes";
import toast from "react-hot-toast";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function useDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // track which dish ids are currently mid-toggle so we can disable their buttons
  const [togglingIds, setTogglingIds] = useState(new Set());

  // load dishes on mount
  const loadDishes = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchAllDishes();
      setDishes(data);
    } catch (err) {
      setError("Could not load dishes. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  // socket.io connection — handles real-time updates from the backend
  // if someone toggles a dish directly in the db or via api, all clients update
  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // dish:updated fires whenever any toggle happens anywhere (api or direct db change via a script)
    socket.on("dish:updated", (updatedDish) => {
      setDishes((prev) =>
        prev.map((d) => (d.dishId === updatedDish.dishId ? updatedDish : d))
      );
      // small toast so the user knows something changed live
      toast.success(
        `${updatedDish.dishName} is now ${updatedDish.isPublished ? "published" : "unpublished"}`,
        { id: updatedDish.dishId, duration: 2500 }
      );
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // handleToggle — called from the UI button on each dish card
  // optimistically updates the ui, then confirms via api
  // if the api fails, it rolls back and shows an error toast
  const handleToggle = useCallback(async (dishId) => {
    // prevent double-clicks
    if (togglingIds.has(dishId)) return;

    setTogglingIds((prev) => new Set(prev).add(dishId));

    // optimistic update — flip immediately in ui so it feels instant
    setDishes((prev) =>
      prev.map((d) =>
        d.dishId === dishId ? { ...d, isPublished: !d.isPublished } : d
      )
    );

    try {
      await toggleDishPublished(dishId);
      // socket event will handle syncing, no need to set state again here
    } catch (err) {
      // roll back the optimistic update if the request failed
      setDishes((prev) =>
        prev.map((d) =>
          d.dishId === dishId ? { ...d, isPublished: !d.isPublished } : d
        )
      );
      toast.error("Failed to update dish. Try again.");
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(dishId);
        return next;
      });
    }
  }, [togglingIds]);

  return { dishes, loading, error, togglingIds, handleToggle, reload: loadDishes };
}
