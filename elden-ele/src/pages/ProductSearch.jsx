import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const products = [
    { id: 1, name: "Ürün 1", category: "Emlak" },
    { id: 2, name: "Ürün 2", category: "Vasıta", color: "Kırmızı" },
    { id: 3, name: "Ürün 3", category: "Ev", color: "Beyaz" },
    { id: 4, name: "Ürün 4", category: "Bahçe" },
    { id: 5, name: "Ürün 5", category: "Elektronik" },
    { id: 6, name: "Ürün 6", category: "Moda" },
    { id: 7, name: "Ürün 7", category: "Yedek Parça" },
    { id: 8, name: "Ürün 8", category: "İkinci El" },
    // ... Diğer ürünler
  ];

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const colors = Array.from(new Set(products.map((product) => product.color)));

  const searchProducts = () => {
    const filteredProducts = products.filter((product) => {
      return (
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory === "" || product.category === selectedCategory)
      );
    });

    setSearchResults(filteredProducts);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="d-flex justify-content-center mt-5">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
              paddingRight: "5%",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Detaylı arama yapın"
              style={{ marginBottom: "5px", padding: "10px" }}
            />
            <button
              onClick={searchProducts}
              style={{
                padding: "5px px",
                backgroundColor: "#4CAF50",
                color: "black",
                border: "none",
                cursor: "pointer",
                height: "90%",
                marginLeft: "5%",
              }}
            >
              Ara
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                marginBottom: "10px",
                marginTop: "43%",
                padding: "5px",
                height: "39%",
              }}
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {searchResults.map((product) => (
          <li
            key={product.id}
            style={{
              marginBottom: "20px",
              backgroundColor: "#f2f2f2",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <a
              href={`https://localhost:3000/search/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            {product.name}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default ProductSearch;
