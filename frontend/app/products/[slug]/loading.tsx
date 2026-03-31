export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 pb-16 animate-pulse" aria-busy="true" aria-live="polite">
      <div className="mb-6 h-5 w-40 rounded bg-white/10" />
      <div className="mb-4 h-12 w-3/4 rounded bg-white/15" />
      <div className="mb-10 h-6 w-2/3 rounded bg-white/10" />
      <div className="mb-10 aspect-16/8 w-full rounded-3xl bg-white/10" />
      <div className="mb-4 h-8 w-48 rounded bg-white/15" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-[92%] rounded bg-white/10" />
        <div className="h-4 w-[85%] rounded bg-white/10" />
      </div>
    </div>
  );
}
