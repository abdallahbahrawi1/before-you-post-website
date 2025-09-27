import Image from "next/image";
import Card from "@/ui/Card";

type Scores = {
  clarity?: number;     // /5 or /10
  credibility?: number; // /5 or /10
  engagement?: number;  // /5 or /10
};

export type RequestItem = {
  id: number;
  title: string;
  description?: string;
  status: string;
  currentPoints: number;
  categories?: string[];
  votes?: number;
  authorName?: string;
  avatarUrl?: string;
  scores?: Scores;
};

const clamp10 = (n: number) => Math.max(0, Math.min(10, n));

function normalizeScoresTo10(s: Scores): Required<Scores> {
  const c = s.clarity ?? 0;
  const cr = s.credibility ?? 0;
  const e = s.engagement ?? 0;
  const values = [c, cr, e];
  const treatAsFive = values.every(v => v <= 5);
  const to10 = (v: number) => clamp10(treatAsFive ? v * 2 : v);
  return { clarity: to10(c), credibility: to10(cr), engagement: to10(e) };
}

function overall10(s: Required<Scores>) {
  const w = { clarity: 0.4, credibility: 0.3, engagement: 0.3 };
  return clamp10(
    s.clarity * w.clarity + s.credibility * w.credibility + s.engagement * w.engagement
  );
}

const Bar = ({ value, className = "" }: { value: number; className?: string }) => {
  const safe = clamp10(value);
  const pct = Math.round((safe / 10) * 100);
  const widthPct = safe === 0 ? 0 : Math.max(4, pct); // keep thin bar visible when > 0
  return (
    <div className={`h-2.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 ${className}`}>
      <div
        className="h-2.5 rounded-full bg-zinc-900 dark:bg-white"
        style={{ width: `${widthPct}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={safe}
      />
    </div>
  );
};

export default function RequestCard({
  req,
  onEdit,
  onDelete,
  onViewResponses,
}: {
  req: RequestItem;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewResponses?: () => void;
}) {
  const category = req.categories?.[0] ?? "General";
  const votes = req.votes ?? 0;
  const s10 = normalizeScoresTo10(req.scores ?? {});
  const overall = overall10(s10);

  return (
    <Card className="p-4 sm:p-5 rounded-2xl shadow transition-shadow hover:shadow-lg text-zinc-900 dark:text-zinc-100">
      {/* Avatar with halo */}
      <div className="relative mx-auto mt-1 mb-3 h-28 w-28">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400" />
        <div className="absolute inset-0 scale-[0.86] overflow-hidden rounded-full ring-2 ring-white dark:ring-zinc-900">
          <Image
            src={req.avatarUrl ?? "/avatar-placeholder.png"}
            alt={req.authorName ?? req.title}
            fill
            sizes="112px"
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Top row: category + votes + overall */}
      <div className="mb-3 flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-zinc-900 text-white px-3 py-1 text-xs font-semibold dark:bg-zinc-100 dark:text-zinc-900">
          {category}
        </span>
        <div className="ml-auto flex items-center gap-3 text-xs">
          <span className="text-zinc-600 dark:text-zinc-400">{votes} Votes</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">
            Overall {overall.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Metrics (flex to avoid arbitrary grid classes being purged) */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <Bar value={s10.clarity} />
            <div className="mt-1 text-[13px] text-zinc-700 dark:text-zinc-300">Clarity</div>
          </div>
          <div className="w-12 text-right text-sm tabular-nums font-medium text-zinc-700 dark:text-zinc-200">
            {s10.clarity.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <Bar value={s10.credibility} />
            <div className="mt-1 text-[13px] text-zinc-700 dark:text-zinc-300">Credibility</div>
          </div>
          <div className="w-12 text-right text-sm tabular-nums font-medium text-zinc-700 dark:text-zinc-200">
            {s10.credibility.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <Bar value={s10.engagement} />
            <div className="mt-1 text-[13px] text-zinc-700 dark:text-zinc-300">Engagement</div>
          </div>
          <div className="w-12 text-right text-sm tabular-nums font-medium text-zinc-700 dark:text-zinc-200">
            {s10.engagement.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Footer actions (only render when handlers provided) */}
      {(onEdit || onDelete || onViewResponses) && (
        <div className="mt-4 flex gap-2">
          {onEdit && (
            <button className="btn-secondary px-3 py-1 text-sm" onClick={onEdit} aria-label="Edit">
              Edit
            </button>
          )}
          {onDelete && (
            <button className="btn-secondary px-3 py-1 text-sm" onClick={onDelete} aria-label="Delete">
              Delete
            </button>
          )}
          {onViewResponses && (
            <button
              className="ml-auto btn-secondary px-3 py-1 text-sm"
              onClick={onViewResponses}
              aria-label="View responses"
            >
              View Responses
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
