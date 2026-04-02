import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

function mountApp() {
  const el = document.getElementById("search-app") || document.getElementById("root");

  if (el) {
    ReactDOM.createRoot(el).render(<App />);
  } else {
    console.log("search-app not found, retrying...");
    setTimeout(mountApp, 500); // 🔥 retry until found
  }
}

mountApp();