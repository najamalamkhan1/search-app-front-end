import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { fetchProducts } from "../services/fetchProducts";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            {/* <h2>🔍 Shopify Style Search</h2> */}

            <SearchBar
                query={query}
                setQuery={setQuery}
                products={products}
            />
        </div>
    );
}