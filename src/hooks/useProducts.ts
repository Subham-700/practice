"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

// Fetches the product catalogue from the public API.
export function useProducts() {
  // NOTE: the Product type exists in src/types/product.ts.
  const [products, setProducts] = useState<Product[]>([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = (await res.json()) as Product[]; 
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Something went wrong while loading products.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
