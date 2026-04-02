export default function SuggestionItem({ item, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px",
        background: isActive ? "#eee" : "#fff",
        cursor: "pointer",
        display: "flex",
        gap: "10px"
      }}
    >
      <img src={item.image} alt="" style={{ width: "40px", height: "40px" }} />
      <div>
        <p style={{ margin: 0 }}>{item.title}</p>
        <small>${item.price}</small>
      </div>
    </div>
  );
}