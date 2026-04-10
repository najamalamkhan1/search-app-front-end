import React, { useState, useEffect } from 'react'

const Stores = () => {
  const [showForm, setShowForm] = useState(false);
  const [stores, setStores] = useState([]);
  const [editStore, setEditStore] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [editToken, setEditToken] = useState("");
  const [error, setError] = useState("")
  const [domain, setDomain] = useState("");
  const [accessToken, setAccessToken] = useState("");



  const fetchStores = async () => {
    const res = await fetch("https://tbp-search-app-backend-production.up.railway.app/api/store");
    const data = await res.json();
    setStores(data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleAddStore = async () => {
    await fetch("https://tbp-search-app-backend-production.up.railway.app/api/store/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain,
        accessToken,
      }),
    });


    fetchStores(); // refresh list
  };


  const handleUpdate = async () => {
    const id = editStore?._id;

    if (!id) return;

    // 🔥 VALIDATION
    if (!editUrl.trim() || !editToken.trim()) {
      setError("All fields are required");
      return;
    }
    setError("");


    await fetch(
      `https://tbp-search-app-backend-production.up.railway.app/api/store/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeUrl: editUrl,
          token: editToken,
        }),
      }
    );

    setEditStore(null);
    fetchStores();
  };

  const deleteStore = async (id) => {
    console.log("DELETE ID:", id); // 👈 debug

    if (!id) {
      console.error("ID missing!");
      return;
    }

    try {
      await fetch(
        `https://tbp-search-app-backend-production.up.railway.app/api/store/${id}`,
        {
          method: "DELETE",
        }
      );

      setStores((prev) => prev.filter((s) => s._id !== id));

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <h1>Stores</h1>
        <button onClick={() => setShowForm(!showForm)}>
          + Add Store
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form">
          <input
            type="text"
            placeholder="Store domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <input
            type="text"
            placeholder="Access token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
          <button onClick={handleAddStore}>Save</button>
        </div>
      )}

      {/* STORE GRID */}
      <div className="store-grid">
        {stores.map((store) => (
          <div className="store-card" key={store._id}>
            <h3>{store.domain}</h3>
            <p>{store.accessToken.slice(0, 8)}...</p>
            <button
              onClick={() => {
                setEditStore(store);
                setEditUrl(store.domain);
                setEditToken(store.accessToken);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteStore(store._id)}>
              Delete
            </button>
          </div>

        ))}

        {editStore && (
          <div className="modal" onClick={() => setEditStore(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Store</h3>

              {error && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {error}
                </p>
              )}

              <input
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                required
              />

              <input
                value={editToken}
                onChange={(e) => setEditToken(e.target.value)}
                required
              />

              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditStore(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

    </div>

  )
}

export default Stores