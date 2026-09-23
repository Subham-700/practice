"use client";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-40 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 w-auto object-contain"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-medium">{product.title}</h3>
      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {product.category}
        </span>
        <span className="font-semibold">${product.price}</span>
      </div>
    </button>
  );
}
