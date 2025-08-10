import MovieCard from "./MovieCard";

type Props = {
  title: string;
  fetchUrl: string;
};

export default async function MovieRow({ title, fetchUrl }: Props) {
  let items: any[] = [];
  console.log(fetchUrl,'fetchUrl');
  try {
    const res = await fetch(fetchUrl, { next: { revalidate: 60 } });
    console.log(res,'res');
    const data = res.ok ? await res.json() : { results: [] };
    items = Array.isArray(data.results) ? data.results : [];
  } catch {
    items = [];
  }

  return (
    <section className="px-6 space-y-3">
      <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {items.map((item) => (
          <MovieCard
            key={`${item.media_type || item.title || item.name}-${item.id}`}
            item={item}
            href={`/${item.media_type === "tv" ? "tv" : "movie"}/${item.id}`}
          />)
        )}
      </div>
      {items.length === 0 && (
        <div className="text-sm text-neutral-400">Unable to load this section.</div>
      )}
    </section>
  );
}


