export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px" }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ height: "100px", objectFit: "contain" }}
      />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
    </div>
  );
}