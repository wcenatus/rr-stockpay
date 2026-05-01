"use client";

import type { RecipeIngredient } from "./recipe-ingredients-panel";

type MissingIngredientsModalProps = {
  ingredients: RecipeIngredient[];
  isOpen: boolean;
  onClose: () => void;
};

export function MissingIngredientsModal({
  ingredients,
  isOpen,
  onClose,
}: MissingIngredientsModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-[#2d2a25]/45 px-4"
      role="dialog"
    >
      <div className="w-full max-w-lg rounded-3xl border border-[#eadfce] bg-white p-5 shadow-2xl shadow-[#2d2a25]/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#2d2a25]">
              Missing Ingredients
            </h2>
            <p className="mt-1 text-sm text-[#625d52]">
              These are the recipe ingredients not found in your pantry.
            </p>
          </div>
          <button
            aria-label="Close missing ingredients modal"
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-[#eadfce] text-[#625d52] transition hover:bg-[#fff6ee]"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <pre className="mt-5 max-h-80 overflow-auto rounded-2xl bg-[#2d2a25] p-4 text-xs leading-5 text-white">
          {JSON.stringify(ingredients, null, 2)}
        </pre>

        <button
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary/90"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
}
