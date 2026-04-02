import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";
import useDebounce from "./Hooks/useDebounce";
import { fetchProducts } from "../services/fetchProducts";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            {/* <h2>🔍 Shopify Style Search</h2> */}

            <SearchBar
                query={query}
                setQuery={setQuery}
                products={products}
            />

            {/* <ProductList products={filtered} /> */}
        </div>
    );
}