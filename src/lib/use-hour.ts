"use client";

import { useCallback, useSyncExternalStore } from "react";

function resolveHour(hourOverride?: number): number {
  if (hourOverride !== undefined) return hourOverride;
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

export function useHour(hourOverride: number | undefined): number {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (hourOverride !== undefined) return () => {};
      const id = setInterval(onStoreChange, 60_000);
      return () => clearInterval(id);
    },
    [hourOverride],
  );

  const getSnapshot = useCallback(() => {
    if (hourOverride !== undefined) return hourOverride;
    return resolveHour();
  }, [hourOverride]);

  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
}
