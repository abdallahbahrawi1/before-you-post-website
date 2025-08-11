"use client";
import avatar from "../../../../public/assets/avatar.png"
import featuredImage from "../../../../public/assets/featured-image.png"
// import avatar from "../../../public/assets/avatar.png";
// import featuredImage from "../../../public/assets/featured-image.png";
import ProgressBar from "@/ui/data-display/ProgressBar";
import clsx from "clsx";
import { useState } from "react";

import PostPreview from "./PostPreview";
import MetricRow from "./MetricRow";
import { DEFAULT_TAGS, DEFAULT_TIPS, METRICS } from "../constants/constants";
import type { MetricKey, Ratings } from "../types/types";

export interface VoteFeedCardProps {
  username?: string;
  karma?: number;
  avatarUrl?: string;
  featuredImageUrl?: string;
  postTitle?: string;
  postSnippet?: string;
  onSubmit?: (payload: {
    ratings: Ratings;
    tags: string[];
    comment: string;
  }) => void;
}

export default function VoteFeed({
  username = "Alexandre P.",
  karma = 4200,
  avatarUrl = avatar.src,
  featuredImageUrl = featuredImage.src,
  postTitle = "How I scaled my side-project to $10k MRR in 6 months",
  postSnippet = "It all started with a simple idea and a lot of coffee...",
  onSubmit,
}: VoteFeedCardProps) {
  const [ratings, setRatings] = useState<Ratings>({});
  const [hover, setHover] = useState<Partial<Record<MetricKey, number>>>({});
  const ratedCount = Object.keys(ratings).length;
  const progress = (ratedCount / METRICS.length) * 100;
  const allRated = ratedCount === METRICS.length;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTextarea, setShowTextarea] = useState(false);
  const [comment, setComment] = useState("");


  const bonus = (comment.trim().length > 0 && showTextarea)
    ? 2
    : selectedTags.length > 0
      ? 1
      : 0;

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSubmit() {
    if (!allRated) return;
    const payload = { ratings, selectedTags, comment };
    console.log("submitted", payload);
    onSubmit?.({ ratings, tags: selectedTags, comment });
  }

  function handleSkip() {
    setRatings({});
    setHover({});
    setSelectedTags([]);
    setComment("");
    setShowTextarea(false);
    console.log("skipped");
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 antialiased flex items-center justify-center p-6">
      <div className="w-full max-w-[720px] [perspective:1000px]">
        <div className="flex w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition">
          {/* Post Preview (Left) */}
          <PostPreview
            avatarUrl={avatarUrl}
            username={username}
            karma={karma}
            featuredImageUrl={featuredImageUrl}
            postTitle={postTitle}
            postSnippet={postSnippet}
          />

          {/* Feedback Panel (Right) */}
          <aside className="basis-[40%] p-8 max-md:basis-full max-md:p-6">
            {/* progress */}
            <ProgressBar value={progress} className="h-1 mb-6" />

            {/* metrics */}
            {METRICS.map(([metric, hint]) => (
              <MetricRow
                key={metric}
                metric={metric}
                hint={hint}
                tips={DEFAULT_TIPS[metric]}
                value={ratings[metric] ?? 0}
                hover={hover[metric] ?? 0}
                onHover={(v) => setHover((s) => ({ ...s, [metric]: v }))}
                onRate={(v) => setRatings((s) => ({ ...s, [metric]: v }))}
              />
            ))}

            {/* Quick tags */}
            {allRated && (
              <div className="mt-6 flex flex-wrap gap-2">
                {Object.entries(DEFAULT_TAGS)
                  .flatMap(([, chips]) => chips)
                  .map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        className={`rounded-full px-3 py-1 text-xs transition
                          ${active ? "bg-indigo-500 text-white" : "bg-indigo-50 text-indigo-600"}
                        `}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    );
                  })}

                {/* Add comment chip */}
                <button
                  type="button"
                  onClick={() => setShowTextarea((prev) => !prev)}
                  className={clsx(
                    "inline-flex h-8 items-center rounded-md px-3 text-xs font-medium transition",
                    {
                      "bg-slate-900 text-white": showTextarea,
                      "bg-slate-100 text-slate-700 hover:bg-slate-200": !showTextarea
                    }
                  )}
                >
                  # Add my own…
                </button>
              </div>
            )}

            {showTextarea && (
              <div className="w-full mt-4">
                <textarea
                  maxLength={200}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="h-20 w-full resize-none rounded-md border border-slate-200 p-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Your feedback (max 200 chars)…"
                />
                <div className="text-right text-xs text-gray-500">{comment.length}/200</div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-2">
              <button
                type="button"
                disabled={!allRated}
                onClick={handleSubmit}
                className={clsx(
                  "relative w-full rounded-md px-4 py-3 text-sm font-medium transition", // made parent relative for badge
                  allRated
                    ? "bg-indigo-600 text-white hover:-translate-y-0.5 hover:bg-indigo-500 shadow-[0_4px_12px_rgba(95,99,242,0.30)]"
                    : "bg-indigo-300 text-white/90 cursor-not-allowed"
                )}
              >
                Submit & Earn Karma
                {(allRated && (selectedTags.length > 0 || (comment.length > 0 && showTextarea))) && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-yellow-400 px-1 text-xs">
                    +{bonus}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="w-full rounded-md border border-indigo-600 px-4 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
