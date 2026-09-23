"use client";

import { Product } from "@/types/product";

// CHANGED:
// Added AnimatePresence and motion from Framer Motion.
// AnimatePresence allows the exit animation to run when
// the modal is removed from the React tree.
import { AnimatePresence, motion } from "framer-motion";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    // CHANGED:
    // AnimatePresence watches for the modal being added/removed.
    // Without it, the modal would disappear immediately when
    // product becomes null, so the exit animation would not run.
    <AnimatePresence>
      {product && (
        // CHANGED:
        // Changed the backdrop div to motion.div.
        // initial = starting state
        // animate = opened state
        // exit = closing state
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          {/* CHANGED:
              Changed the modal container to motion.div so the
              actual product card also gets an enter/exit animation.
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold">
                {product.title}
              </h2>

              <button
                onClick={onClose}
                className="ml-4 rounded-full px-2 text-slate-400 hover:text-slate-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.title}
                className="max-h-48 w-auto object-contain"
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {product.category}
              </span>

              <span className="text-lg font-semibold">
                ${product.price}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}