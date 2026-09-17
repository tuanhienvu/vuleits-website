export default function TeamMemberCvLoading() {
  return (
    <div
      className="container mx-auto max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:py-16"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading CV"
    >
      <div className="glass p-6 sm:p-10 lg:p-14">
        <div className="mb-10 flex gap-5">
          <div className="h-24 w-24 shrink-0 rounded-2xl bg-white/10" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="h-3 w-32 rounded bg-white/10" />
            <div className="h-10 w-2/3 rounded bg-white/15" />
            <div className="h-5 w-48 rounded bg-white/10" />
          </div>
        </div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="grid gap-5 border-t border-white/10 py-8 md:grid-cols-[11rem_1fr]">
            <div className="h-6 w-28 rounded bg-white/15" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-[92%] rounded bg-white/10" />
              <div className="h-4 w-[75%] rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
