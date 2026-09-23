"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export function ProductGrid({ products, onSelect }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="mt-8 text-slate-500">No products match your filters.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {products.map((product, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
          >
            <ProductCard product={product} onClick={() => onSelect(product)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
