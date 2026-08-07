export default function Loading() {
  return <div className="mx-auto grid min-h-80 w-full max-w-7xl gap-4 p-6"><div className="h-9 w-64 animate-pulse rounded-xl bg-surface" /><div className="grid gap-4 sm:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-32 animate-pulse rounded-2xl bg-surface" />)}</div></div>;
}
