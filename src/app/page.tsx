"use client";

import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Filters } from "@/components/Filters";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types/product";

export default function HomePage() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  // CHANGED:
  // We keep the current time in state instead of calling
  // new Date() directly inside JSX.
  //
  // Why:
  // Next.js renders the component on the server first and then
  // hydrates it on the client. If new Date() runs during render,
  // the server and client can generate different times, causing:
  // "Text content did not match" hydration error.
  const [lastUpdated, setLastUpdated] = useState("");

  // CHANGED:
  // Run the date calculation only after the component has mounted
  // in the browser.
  //
  // Why:
  // useEffect runs only on the client after hydration, so the
  // server does not generate a different timestamp.
  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(
      products.map((product) => product.category)
    );

    return ["all", ...Array.from(unique)];
  }, [products]);

  // CHANGED:
  // Wrapped filtering inside useMemo.
  //
  // Why:
  // Filtering is derived data. useMemo prevents recalculating
  // the filtered product list unless products, search, or category
  // actually changes.
  const visibleProducts = useMemo(() => {
    // CHANGED:
    // Normalize the search text.
    //
    // Why:
    // trim() removes unnecessary spaces and toLowerCase()
    // makes the search case-insensitive.
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      // CHANGED:
      // Category and search filters are evaluated separately.
      //
      // Why:
      // Both conditions need to be satisfied when a category
      // is selected.
      const matchesCategory =
        category === "all" || product.category === category;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Product Explorer
        </h1>

        {/* CHANGED:
            Only render the timestamp after useEffect has populated it.

            Why:
            On the server, lastUpdated is an empty string.
            We don't render the <p> initially, avoiding any
            server/client mismatch during hydration.
        */}
        {lastUpdated && (
          <p className="text-sm text-slate-500">
            Last updated at {lastUpdated}
          </p>
        )}
      </header>

      <Filters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {loading && (
        <p className="mt-8 text-slate-500">
          Loading products…
        </p>
      )}

      {/* CHANGED:
          Added an error state.

          Why:
          useProducts already provides `error`, but the previous
          code ignored it. If the API request fails, the user should
          see a clear message instead of an empty product area.
      */}
      {error && !loading && (
        <div
          role="alert"
          className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          <h2 className="font-semibold">
            Unable to load products
          </h2>

          <p className="mt-1 text-sm">
            We couldn't fetch the products right now. Please try again
            later.
          </p>
        </div>
      )}

      {/* CHANGED:
          ProductGrid is rendered only when loading is finished
          and there is no error.

          Why:
          This prevents showing an empty/incorrect product grid
          while the API is loading or when the API request fails.
      */}
      {!loading && !error && (
        <ProductGrid
          products={visibleProducts}
          onSelect={setSelected}
        />
      )}

      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}