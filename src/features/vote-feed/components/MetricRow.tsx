"use client";

import { CircleHelp } from "lucide-react";
import clsx from "clsx";
import Star from "./Star";
import type { MetricKey } from "../types/types";

export default function MetricRow({
  metric,
  hint,
  tips,
  value,
  hover,
  onHover,
  onRate,
}: {
  metric: MetricKey;
  hint: string;
  tips: string[];
  value: number;
  hover: number;
  onHover: (v: number) => void;
  onRate: (v: number) => void;
}) {
  return (
    <div className="flex min-h-14 flex-col justify-center">
      {/* Header with tooltip */}
      <div className="relative  flex items-center gap-2"> {/* z-10 raises this row above siblings */}
        <label className="m-0 font-medium">{metric}</label>

        {/* Info icon (hover shows tooltip) */}
        <div className="relative group/tt inline-flex items-center">
          <span
            className="inline-flex items-center justify-center text-slate-500 opacity-70 transition group-hover/tt:opacity-100"
            aria-hidden="true"
          >
            <CircleHelp className="h-4 w-4" />
          </span>

          {/* Hover tooltip (md+) */}
          <div
            className={clsx(
              "pointer-events-none absolute left-12 -translate-x-1/2 top-[calc(100%+8px)]",
              "hidden w-56 rounded-md border border-slate-200 bg-white p-4 text-xs text-slate-500 shadow-[0_4px_16px_#0000000D]",
              "opacity-0 transition-opacity duration-100 group-hover/tt:opacity-100 md:block",
              "z-50"
            )}
          >
            <ul className="space-y-1">
              {tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className={clsx("mt-1 flex items-center", "opacity-100")}>
        <div className="flex gap-2" role="radiogroup" aria-label={`${metric} rating`}>
          {Array.from({ length: 5 }, (_, idx) => idx + 1).map((i) => {
            const isFilled = (hover || value) >= i;
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-label={`${i} star${i === 1 ? "" : "s"}`}
                aria-checked={value === i}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(0)}
                onFocus={() => onHover(i)}
                onBlur={() => onHover(0)}
                onClick={() => onRate(i)}
                className="select-none outline-none transition active:scale-95"
              >
                <Star filled={isFilled} hovered={hover === i} />
              </button>
            );
          })}
        </div>
        {/* Rating value */}
        <span
          className={clsx(
            "ml-2 w-[30px] text-xs font-medium text-slate-500 transition-opacity",
            value > 0 ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
          )}
        >
          {value > 0 ? `${value}/5` : ""}
        </span>
      </div>

      <small className="mt-1 block text-xs text-slate-500">{hint}</small>
    </div>
  );
}
