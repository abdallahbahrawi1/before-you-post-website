import { RequestFormData } from "@/types/types";
import { FC } from "react";
import { FiCheckCircle } from "react-icons/fi";

interface SuccessCardProps {
  data: RequestFormData;          // full form
  pointsUsed: number;             // whatever logic you use
  onViewRequest: () => void;      // CTA 1
  onCreateAnother: () => void;    // CTA 2
  onHelpOthers: () => void;    // CTA 3
}

const SuccessCard: FC<SuccessCardProps> = ({
  data,
  pointsUsed,
  onViewRequest,
  onCreateAnother,
  onHelpOthers,
}) => (
  <main className="w-full px-4">
    <section
      role="status"
      className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-xl
                 opacity-0 translate-y-5 animate-fade-in"
    >
      {/* Icon */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <FiCheckCircle size={40} />
      </div>

      {/* Heading */}
      <h1 className="mb-6 text-2xl font-bold">Request posted successfully!</h1>

      {/* Summary */}
      <div className="mb-6 grid gap-4 rounded-xl bg-gray-50 p-5 text-left">
        <div className="grid grid-cols-[120px_1fr] gap-4">
          <span className="font-medium text-gray-600">Post Title</span>
          <span>{data.title}</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-4">
          <span className="font-medium text-gray-600">Points Used</span>
          <span>{pointsUsed} Points</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-4">
          <span className="font-medium text-gray-600">Tags</span>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 px-3 py-1
                           text-xs font-medium text-white shadow"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <button
        onClick={onViewRequest}
        className="mb-3 w-full rounded-lg bg-purple-500 px-4 py-3 text-base font-medium text-white
                   transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline
                   focus-visible:outline-2 focus-visible:outline-purple-500"
      >
        View my request
      </button>
      <button
        onClick={onCreateAnother}
        className="mb-3 w-full rounded-lg border border-gray-200 bg-white px-4 py-3
                   text-base font-medium text-purple-600 transition hover:-translate-y-0.5
                   hover:shadow-lg focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-purple-500"
      >
        Create another request
      </button>

      <button
        onClick={onHelpOthers}
        className="inline-block pt-1 text-sm font-medium text-purple-600 transition hover:text-pink-500"
      >
        Review someone else&rsquo;s post to earn points &rarr;
      </button>
    </section>
  </main>
);

export default SuccessCard;