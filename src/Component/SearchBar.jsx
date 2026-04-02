import { useState, useEffect } from "react";
import { searchProducts } from "../services/api";
import { getTrendingProducts } from "../services/api";

export default function SearchBar({ query, setQuery, products }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [trending, setTrending] = useState([]);
  const [recentSearches, setRecent] = useState([]);
  const [isOpen, setIsOpen] = useState(false)


  const handleFocus = async () => {
    setIsOpen(true);
    if (trending.length === 0 && query.trim() === "") {
      const data = await getTrendingProducts();
      setTrending(data);
    }
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recent")) || [];
    setRecent(stored);
  }, []);

  const saveRecentSearch = (value) => {
    if (!value.trim()) return;

    const updated = [
      value,
      ...recentSearches.filter((item) => item !== value),
    ].slice(0, 5);

    setRecent(updated);
    localStorage.setItem("recent", JSON.stringify(updated));
  };

  useEffect(() => {
  const handleClickOutside = (e) => {
    // 🔥 IMPORTANT FIX
    if (!e.target.closest(".search-wrapper")) {
      setIsOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim() !== "") {
        const data = await searchProducts(query);

        setResults(data);

        // 🔥 Dynamic suggestions from products
        const dynamicSuggestions = data
          .map((item) => item.title)
          .filter((title, index, self) => self.indexOf(title) === index) // unique
          .slice(0, 6);

        setSuggestions(dynamicSuggestions);

      } else {
        setResults([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  // 🔥 Highlight text
  const highlightText = (text = "", query = "") => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={i} style={{ fontWeight: "700" }}>
          {part}
        </strong>
      ) : (
        <span key={i} style={{ opacity: 0.6 }}>
          {part}
        </span>
      )
    );
  };

  return (
    <div
      className="search-wrapper" onClick={(e) => e.stopPropagation()}>
      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={handleFocus}
        placeholder="Search Products, Brands, Designers..."
        className="search-input"
      />

      {/* DROPDOWN */}
      {isOpen && (
        <div className="search-dropdown active">

          {/* LEFT */}
          <div className="left">

            {query.trim() === "" ? (
              <>
                <h4>Recent Searches</h4>

                {recentSearches.length > 0 ? (
                  recentSearches.map((item, i) => (
                    <div
                      key={i}
                      className="suggestion-item"
                      onClick={() => setQuery(item)}
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <p>No recent searches</p>
                )}
              </>
            ) : (
              <>
                <h4>Suggestions</h4>

                {suggestions.slice(0, 6).map((item, i) => (
                  <div
                    key={i}
                    className={`suggestion-item ${i === activeIndex ? "active" : ""}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      setQuery(item);
                      saveRecentSearch(item);
                    }}
                  >
                    {highlightText(item, query)}
                  </div>
                ))}
              </>
            )}

          </div>

          {/* RIGHT */}
          <div className="right">

            {query.trim() === "" ? (
              <>
                <h4>Trending Products</h4>

                {trending.length > 0 ? (
                  trending.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="product-item"
                      onClick={() => {
                        saveRecentSearch(item.title);
                        window.location.href = `/products/${item.handle}`;
                      }}
                    >
                      <img src={item.image} />

                      <div className="details">
                        <p>{item.title}</p>
                        <p>Rs {item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Click input to load trending</p>
                )}
              </>
            ) : (
              <>
                <h4>Products</h4>

                {results.slice(0, 4).map((item) => (
                  <div className="product-item">
                    <img src={item.image} />

                    <div className="details">
                      <p>{highlightText(item.title, query)}</p>
                      <p>Rs {item.price}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

          </div>

        </div>
      )}
    </div>
  );
}