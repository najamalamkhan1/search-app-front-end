import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (!products.length) return <p>No results found 😢</p>;
  

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px"
    }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}