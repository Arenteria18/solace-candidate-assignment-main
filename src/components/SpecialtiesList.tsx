import React from "react";

interface Props {
  items: string[];
  label?: string;
}

// Renders specialties as accessible chips with consistent theme styles
function SpecialtiesListInner({ items, label = "Specialties" }: Props) {
  if (!items?.length) return null;
  return (
    <div aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s} className="list-none">
            <span className="inline-block rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-2.5 py-1 text-xs">
              {s}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const SpecialtiesList = React.memo(SpecialtiesListInner);
