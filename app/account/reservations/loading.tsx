export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="mb-7 h-9 w-56 animate-pulse rounded-lg bg-primary-900" />

      <ul className="space-y-6">
        {Array.from({ length: 3 }, (_, i) => (
          <li
            key={i}
            className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-primary-800 sm:flex-row"
          >
            <div className="h-44 bg-primary-900 sm:h-40 sm:w-48 md:w-56" />
            <div className="flex-1 space-y-3 p-5">
              <div className="h-6 w-2/3 rounded bg-primary-900" />
              <div className="h-4 w-1/2 rounded bg-primary-900" />
              <div className="h-4 w-1/3 rounded bg-primary-900" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
