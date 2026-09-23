"use client";

interface FiltersProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function Filters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className="mb-2 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products…"
        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-500 sm:max-w-xs"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-slate-500"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "All categories" : c}
          </option>
        ))}
      </select>
    </div>
  );
}
