export const searchProducts = async (query) => {
  if (!query || !query.trim()) return [];

  try {
    const res = await fetch(
      `https://tbp-search-app-backend-production.up.railway.app/api/search?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      console.error("API FAILED:", res.status);
      return [];
    }

    const data = await res.json();
    console.log("API DATA:", data);

    return Array.isArray(data.products) ? data.products : [];

  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
};

// Trending Now 
export const getTrendingProducts = async () => {
  const res = await fetch(
    "https://tbp-search-app-backend-production.up.railway.app/api/trending"
  );

  return res.json();
};