export default function ProductList({ products }) {
  if (!Array.isArray(products)) return null;

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          {p.title} ({p.store})
        </div>
      ))}
    </div>
  );
}