export default function Loading() {
  return (
    <div className="px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="skeleton aspect-[2/3] rounded" />
      ))}
    </div>
  );
}


