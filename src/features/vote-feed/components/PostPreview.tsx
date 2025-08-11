import Image from "next/image";

export default function PostPreview({
  avatarUrl,
  username,
  karma,
  featuredImageUrl,
  postTitle,
  postSnippet,
}: {
  avatarUrl: string;
  username: string;
  karma: number;
  featuredImageUrl: string;
  postTitle: string;
  postSnippet: string;
}) {
  return (
    <section className="basis-[60%] border-r border-slate-200 p-8 max-md:basis-full max-md:border-r-0">
      <header className="mb-6 flex items-center">
        <Image
          src={avatarUrl}
          width={40}
          height={40}
          alt="User Avatar"
          className="mr-4 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-[16px] font-medium">{username}</span>
          <span className="text-xs text-slate-500">{karma.toLocaleString()} karma</span>
        </div>
      </header>

      <Image
        src={featuredImageUrl}
        alt="Featured"
        width={960}
        height={540}
        className="mb-6 aspect-[16/6] w-full rounded-xl object-cover"
      />

      <h3 className="mb-2 text-[20px] font-medium leading-snug">{postTitle}</h3>

      <div className="relative max-h-[calc(1.5em*3)] overflow-hidden">
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {postSnippet}
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
      </div>
    </section>
  );
}
