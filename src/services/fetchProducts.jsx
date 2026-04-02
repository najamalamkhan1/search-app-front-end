export const fetchProducts = async () => {
  const res = await fetch("https://tbp-search-app-backend-production.up.railway.app/api/search");
  return res.json();
};