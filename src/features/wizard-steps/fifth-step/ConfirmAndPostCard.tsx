import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import iconSrc from "../../../../public/assets/coin_icon.png";
import { RequestFormData } from "@/types/types";
import { useAuth } from "@/features/auth/AuthContext";
import { createRequest } from "@/Services/RequestsService";


type ConfirmAndPostCardProps = {
  formData: RequestFormData;      // full form data for preview
  pointsUsed: number;         // total points required for this post
  onBack: () => void;         // CTA: go back to edit
  onEarn: () => void;         // CTA: go earn more points
  onNext: () => void;      // CTA: confirm & post
};

const BASE_FEE = 15; // MVP constants
const IMAGE_BOOST = 0;
const EXPEDITED = 0;

export default function ConfirmAndPostCard({
  formData,
  pointsUsed,
  onBack,
  onEarn,
  onNext,
}: ConfirmAndPostCardProps) {
  const { user, setUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fees = useMemo(
    () => [
      { label: "Base posting fee", points: BASE_FEE },
      { label: "Image Boost", points: IMAGE_BOOST },
      { label: "Expedited Feedback", points: EXPEDITED },
    ],
    []
  );

  useEffect(() => {
    if (!errorMsg) return;
    const id = setTimeout(() => setErrorMsg(null), 6000);
    return () => clearTimeout(id);
  }, [errorMsg]);

  const lineItems = fees;
  const totalRequired = pointsUsed;
  const remaining = (user?.karma ?? 0) - totalRequired;
  const isInsufficient = remaining < 0;


  const submitRequest = async () => {
    if (isInsufficient || submitting) return;

    setErrorMsg(null);
    setSubmitting(true);
    try {
      const result = await createRequest(formData);

      // Update local user points from server
      if (setUser && user) {
        setUser({ ...user, karma: result.balanceAfter });
      }

      onNext(); // to SuccessCard
    } catch (err: unknown) {
      // Surface simple, helpful error
      let msg = "Failed to post your request. Please try again.";
      type ErrorWithResponse = {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };

      if (typeof err === "object" && err !== null) {
        const typedErr = err as ErrorWithResponse;
        if ("response" in typedErr && typeof typedErr.response === "object" && typedErr.response !== null) {
          msg = typedErr.response?.data?.message ?? msg;
        } else if ("message" in typedErr && typeof typedErr.message === "string") {
          msg = typedErr.message;
        }
      }
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center gap-6 p-4">
      <div
        className={[
          "bg-white rounded-2xl shadow",
          "p-5 w-full max-w-sm flex flex-col gap-6",
          "transition-shadow duration-200",
        ].join(" ")}
      >
        {/* Header */}
        <header className="flex items-center gap-3">
          <Image src={iconSrc} alt="Coin icon" width={24} height={24} className="shrink-0" />
          <h1 className="text-lg font-semibold text-gray-800">Step 4: Confirm & Post</h1>
        </header>

        {/* Request error (network/server) */}
        {errorMsg && (
          <div
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">Couldn’t post your request.</p>
              <button
                type="button"
                onClick={() => setErrorMsg(null)}
                className="text-red-700/80 hover:text-red-900"
              >
                Dismiss
              </button>
            </div>
            <p className="mt-1">{errorMsg}</p>
          </div>
        )}

        {/* Alert (Insufficient Points) */}
        {isInsufficient && (
          <div
            className="bg-red-100 text-red-600 px-4 py-3 rounded-md text-sm font-medium"
            role="alert"
            aria-live="polite"
          >
            You don&apos;t have enough points for this post.
          </div>
        )}

        {/* Points list */}
        <ul className="list-none flex flex-col gap-4">
          {lineItems.map((li) => (
            <li key={li.label} className="flex justify-between text-[0.95rem]">
              <span className="text-gray-600">{li.label}</span>
              <span className="font-medium text-gray-800">{li.points} pts</span>
            </li>
          ))}
        </ul>

        {/* Total */}
        <div
          className={[
            "flex justify-between mt-2 font-bold text-base",
            isInsufficient ? "text-red-600" : "text-gray-800",
          ].join(" ")}
        >
          <strong>Total required</strong>
          <strong>{totalRequired} pts</strong>
        </div>

        <hr className="border-t border-gray-200" />

        {/* Balance summary */}
        <div className={["text-sm", isInsufficient ? "text-red-600" : "text-gray-600"].join(" ")}>
          <p className="flex justify-between">
            <span>Your balance</span>
            <span className="font-medium text-gray-800">{(user?.karma)} pts</span>
          </p>
          <p className="flex justify-between mt-1">
            <span>Remaining after submit</span>
            <span className="font-medium text-gray-800">
              {remaining >= 0 ? remaining : 0} pts
            </span>
          </p>
        </div>

        {/* Actions */}
        <footer
          className={[
            "flex gap-3 w-full",
            // Mobile sticky action bar (matches your responsive spec)
            "sm:static sm:p-0 sm:m-0",
            "sticky bottom-0 left-0 right-0 bg-white -mx-5 -mb-5 p-4 border-t border-gray-200",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={onBack}
            className="font-semibold px-4 py-3 rounded-lg border border-transparent cursor-pointer transition w-auto text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-700"
          >
            Back
          </button>

          {!isInsufficient && (
            <button
              type="button"
              onClick={submitRequest}
              disabled={submitting}
              className="w-full font-semibold px-4 py-3 rounded-lg border border-transparent cursor-pointer transition bg-purple-700 text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
              id="confirm-btn"
            >
              {submitting ? "Posting..." : "Confirm & Post"}
            </button>
          )}

          {isInsufficient && (
            <button
              type="button"
              onClick={onEarn}
              className="w-full font-semibold px-4 py-3 rounded-lg border border-gray-200 cursor-pointer transition bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-700"
              id="earn-btn"
            >
              Earn points
            </button>
          )}
        </footer>
      </div>
    </main>
  );
}
