import "../styles/SortOrder.scss";

type SortOrderProps = {
  sortOrder: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
};

export const SortOrder = ({ sortOrder, onChange }: SortOrderProps) => {
  return (
    <label htmlFor="sortOrder" style={{ fontWeight: "bold", fontSize: "1rem" }}>
      Sortér efter score:{" "}
      <select
        id="sortOrder"
        className="sort-select"
        value={sortOrder}
        onChange={(e) => onChange(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Stigende</option>
        <option value="desc">Faldende</option>
      </select>
    </label>
  );
};
