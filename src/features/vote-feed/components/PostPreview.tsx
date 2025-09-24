import clsx from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function PostPreview({
  avatarUrl,
  username,
  karma,
  featuredImageUrl,
  postTitle,
  postSnippet,
}: {
  avatarUrl: string | undefined;
  username: string;
  karma: number;
  featuredImageUrl: string | undefined;
  postTitle: string;
  postSnippet: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const karmaText = useMemo(() => new Intl.NumberFormat().format(karma), [karma]);
  
  return (
    <article className="basis-[60%] border-r border-slate-200 p-8 max-md:basis-full max-md:border-r-0">
      <header className="mb-6 flex items-center gap-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              width={40}
              height={40}
              alt={`${username} avatar`}
              className="rounded-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-full bg-slate-200 text-slate-600"
            >
              {username?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
        )}
        <div className="flex flex-col">
          <span className="text-[16px] font-medium">{username}</span>
          <span className="text-xs text-slate-500">{karmaText} karma</span>
        </div>
      </header>

      {featuredImageUrl && (
        <div className="relative mb-6 aspect-[16/6] w-full overflow-hidden rounded-xl">
          <Image
            src={featuredImageUrl}
            alt={postTitle}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority={false}
          />
        </div>
      )}

      <h3 className="mb-2 text-[20px] font-medium leading-snug">{postTitle}</h3>

      <div className={expanded ? "" : "relative max-h-[calc(1.5em*3)] overflow-hidden"}>
        <p className={clsx(
          "text-sm leading-relaxed text-slate-600",
          expanded ? "line-clamp-none" : "line-clamp-3"
        )}>
          {postSnippet}
        </p>
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        className="mt-2 text-xs text-blue-600 hover:underline"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Show less" : "Show more"}
      </button>

    </article>
  );
}
