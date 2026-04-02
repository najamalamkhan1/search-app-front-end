import { useState } from "react";
import SuggestionItem from "./SuggestionItem";

export default function SearchBar({ query, setQuery, products }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // max 5 suggestions

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex(prev => (prev + 1) % filtered.length);
    }
    if (e.key === "ArrowUp") {
      setActiveIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      setQuery(filtered[activeIndex].title);
      setShowDropdown(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={query}
        placeholder="Search products..."
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        style={{ width: "100%", padding: "10px" }}
      />

      {showDropdown && query && (
        <div style={{
          position: "absolute",
          width: "100%",
          background: "#fff",
          border: "1px solid #ddd",
          marginTop: "5px",
          zIndex: 10
        }}>
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <SuggestionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onClick={() => {
                  setQuery(item.title);
                  setShowDropdown(false);
                }}
              />
            ))
          ) : (
            <p style={{ padding: "10px" }}>No results 😢</p>
          )}
        </div>
      )}
    </div>
  );
}