export const searchProducts = async (query) => {
  if (!query) return [];

  try {
    const res = await fetch(
      `https://tbp-search-app-backend-production.up.railway.app/api/search?q=${query}`
    );

    const data = await res.json();
    console.log("API DATA:", data);

    return data;
  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
};

// Trending Now 
export const getTrendingProducts = async () => {
  const res = await fetch(
    "https://tbp-search-app-backend-production.up.railway.app/api/search/trending"
  );

  return res.json();
};