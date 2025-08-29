"use client";
import avatar from "../../../../public/assets/avatar.png"
import featuredImage from "../../../../public/assets/featured-image.png"
import ProgressBar from "@/ui/data-display/ProgressBar";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useVoteFeed } from "../hooks/useVoteFeed";

import PostPreview from "./PostPreview";
import MetricRow from "./MetricRow";
import { DEFAULT_TAGS, DEFAULT_TIPS, METRICS } from "../constants/constants";
import type { MetricKey, Ratings, ReviewSubmission } from "../types/types";

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

export default function VoteFeed() {
  const {
    currentRequest,
    isLoading,
    isSubmitting,
    error,
    hasMore,
    fetchNextRequest,
    submitReview,
    skipRequest,
    clearError
  } = useVoteFeed();

  // Local state for the form
  const [ratings, setRatings] = useState<Ratings>({});
  const [hover, setHover] = useState<Partial<Record<MetricKey, number>>>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTextarea, setShowTextarea] = useState(false);
  const [comment, setComment] = useState("");

  // Derived state
  const ratedCount = Object.keys(ratings).length;
  const progress = (ratedCount / METRICS.length) * 100;
  const allRated = ratedCount === METRICS.length;

  const bonus = (comment.trim().length > 0 && showTextarea)
    ? 2
    : selectedTags.length > 0
      ? 1
      : 0;

  // Fetch first request on mount
  useEffect(() => {
    fetchNextRequest();
  }, [fetchNextRequest]);

  // Handle review submission
  const handleSubmit = async (payload: {
    ratings: Ratings;
    tags: string[];
    comment: string;
  }) => {
    if (!currentRequest) return;

    const reviewData: ReviewSubmission = {
      requestId: currentRequest.id,
      clarityScore: payload.ratings.Clarity || 0,
      credibilityScore: payload.ratings.Credibility || 0,
      engagementScore: payload.ratings.Engagement || 0,
      feedbackTags: payload.tags,
      overallFeedback: payload.comment || undefined,
    };

    const success = await submitReview(reviewData);
    if (success) {
      // Reset form state after successful submission
      setRatings({});
      setHover({});
      setSelectedTags([]);
      setComment("");
      setShowTextarea(false);
      console.log('Review submitted successfully!');
    } else {
      // Error handling - form state preserved so user can retry
      console.log('Review submission failed - check error message');
    }
  };

  // Handle skip
  const handleSkip = async () => {
    await skipRequest();
    // Reset form state here if needed
  };

  // Loading state
  if (isLoading && !currentRequest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Loading next request...</p>
        </div>
      </div>
    );
  }


  // No more requests
  if (!hasMore && !currentRequest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">All caught up!</h2>
          <p className="text-gray-600">No more requests to review right now.</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              clearError();
              fetchNextRequest();
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main component with current request
  if (!currentRequest) return null;

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleFormSubmit() {
    if (!allRated) return;
    const payload = {
      ratings,
      tags: selectedTags,
      comment
    };
    handleSubmit(payload);

    // Reset form after submission
    setRatings({});
    setHover({});
    setSelectedTags([]);
    setComment("");
    setShowTextarea(false);
  }

  function handleFormSkip() {
    // Reset form state
    setRatings({});
    setHover({});
    setSelectedTags([]);
    setComment("");
    setShowTextarea(false);

    // Call the skip function
    handleSkip();
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 antialiased flex items-center justify-center p-6">
      <div className="w-full max-w-[720px] [perspective:1000px]">
        <div className="flex w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition">
          {/* Post Preview (Left) */}
          <PostPreview
            avatarUrl={currentRequest.user.avatarUrl || avatar.src}
            username={currentRequest.user.username}
            karma={currentRequest.user.karma}
            featuredImageUrl={currentRequest.featuredImageUrl || featuredImage.src}
            postTitle={currentRequest.title}
            postSnippet={currentRequest.description}
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
              {/* Show error message if submission failed */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-2">
                  <p className="text-sm text-red-600">{error}</p>
                  <button
                    onClick={clearError}
                    className="text-xs text-red-500 hover:text-red-700 mt-1 underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <button
                type="button"
                disabled={!allRated || isSubmitting}
                onClick={handleFormSubmit}
                className={clsx(
                  "relative w-full rounded-md px-4 py-3 text-sm font-medium transition",
                  allRated && !isSubmitting
                    ? "bg-indigo-600 text-white hover:-translate-y-0.5 hover:bg-indigo-500 shadow-[0_4px_12px_rgba(95,99,242,0.30)]"
                    : "bg-indigo-300 text-white/90 cursor-not-allowed"
                )}
              >
                {isSubmitting ? 'Submitting...' : 'Submit & Earn Karma'}
                {(allRated && (selectedTags.length > 0 || (comment.length > 0 && showTextarea))) && !isSubmitting && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-yellow-400 px-1 text-xs">
                    +{bonus}
                  </span>
                )}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                className="w-full rounded-md border border-indigo-600 px-4 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 disabled:opacity-50"
                onClick={handleFormSkip}
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
