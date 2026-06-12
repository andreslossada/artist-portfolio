"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function formatHour(hour: number): string {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function TimeSliderInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramHour = searchParams.get("hour");
  const initialAuto = paramHour === null;
  const initialValue = paramHour ? parseFloat(paramHour) : 0;

  const [hour, setHour] = useState(initialValue);
  const [auto, setAuto] = useState(initialAuto);

  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setHour(getCurrentRealHour()), 0);
    const interval = setInterval(() => {
      setHour(getCurrentRealHour());
    }, 30000);
    return () => {
      clearTimeout(id);
      clearInterval(interval);
    };
  }, [auto]);

  const updateUrl = useCallback(
    (h: number | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (h === null) {
        params.delete("hour");
      } else {
        params.set("hour", h.toFixed(1));
      }
      const qs = params.toString();
      const href = qs ? `?${qs}` : window.location.pathname;
      router.replace(href, { scroll: false });
    },
    [searchParams, router],
  );

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setHour(value);
      if (!auto) {
        updateUrl(value);
      }
    },
    [auto, updateUrl],
  );

  const handleSliderCommit = useCallback(() => {
    if (!auto) {
      updateUrl(hour);
    }
  }, [auto, hour, updateUrl]);

  const toggleAuto = useCallback(() => {
    const nextAuto = !auto;
    setAuto(nextAuto);
    if (nextAuto) {
      setHour(getCurrentRealHour());
      updateUrl(null);
    } else {
      updateUrl(hour);
    }
  }, [auto, hour, updateUrl]);

  const isDev =
    process.env.NODE_ENV === "development" || paramHour !== null;

  if (!isDev) return null;

  return (
    <div className="pointer-events-auto fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 select-none">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md transition-opacity duration-300 hover:opacity-100 opacity-30">
        <span className="font-mono text-xs text-white/80 tabular-nums min-w-[3.25rem]">
          {formatHour(hour)}
        </span>
        <input
          type="range"
          min={0}
          max={23.5}
          step={0.5}
          value={hour}
          onChange={handleSliderChange}
          onMouseUp={handleSliderCommit}
          onTouchEnd={handleSliderCommit}
          disabled={auto}
          className={[
            "h-1.5 w-36 cursor-pointer appearance-none rounded-full",
            "accent-white/80",
            "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
            auto ? "opacity-40 cursor-not-allowed" : "bg-white/20",
          ].join(" ")}
          aria-label="Time of day"
        />
        <button
          type="button"
          onClick={toggleAuto}
          title={auto ? "Click to set hour manually" : "Click to follow real time"}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-all ${
            auto
              ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30"
              : "bg-white/10 text-white/60 hover:text-white/90 hover:bg-white/15"
          }`}
        >
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
              auto ? "bg-emerald-400 animate-pulse" : "bg-white/30"
            }`}
          />
          {auto ? "Live" : "Manual"}
        </button>
      </div>
    </div>
  );
}

function getCurrentRealHour(): number {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

export function TimeSlider() {
  return (
    <Suspense fallback={null}>
      <TimeSliderInner />
    </Suspense>
  );
}
