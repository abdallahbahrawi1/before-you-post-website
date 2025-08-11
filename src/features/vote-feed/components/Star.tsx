"use client";

import { FaStar } from "react-icons/fa";
import clsx from "clsx";

export default function Star({
  filled,
  hovered,
}: {
  filled: boolean;
  hovered: boolean;
}) {
  return (
    <FaStar
      className={clsx(
        "h-7 w-7 transition-transform",
        hovered && "scale-105",
        filled ? "text-indigo-600" : "text-gray-300"
      )}
    />
  );
}
