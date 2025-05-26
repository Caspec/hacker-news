import React from "react";

interface SortOrderProps {
  sortOrder: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
}

export const SortOrder: React.FC<SortOrderProps> = ({
  sortOrder,
  onChange,
}) => {
  return (
    <label htmlFor="sortOrder">
      Sortér efter score:{" "}
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => onChange(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Stigende</option>
        <option value="desc">Faldende</option>
      </select>
    </label>
  );
};
