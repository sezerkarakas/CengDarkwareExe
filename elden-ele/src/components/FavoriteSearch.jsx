import React, { useState, useEffect } from "react";

const FavoriteSearch = () => {
  const [searches, setSearches] = useState([]);

  const handleSearch = (word) => {
    // Arama ile ilgili işlemleri burada gerçekleştirin
    console.log("Arama:", word);
  };
  useEffect(() => {
    const storedSearches = localStorage.getItem("searchHistory");
    if (storedSearches) {
      setSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleRemoveClick = (searchTerm) => {
    const updatedSearches = searches.filter((term) => term !== searchTerm);
    setSearches(updatedSearches);
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearches));
  };

  return (
    <div className="container">
      <div className="d-flex">
        {searches.map((searchTerm, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button
              style={{ borderColor: "black", borderRadius: "25px" }}
              type="button"
              className="btn btn-light"
              onClick={() => handleSearch(searchTerm)}
            >
              {searchTerm}
              <span
                style={{ marginLeft: "5px" }}
                className="btn-close"
                onClick={() => handleRemoveClick(searchTerm)}
              ></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5px",
  },
  circular: {
    width: "80px",
    height: "30px",
    borderRadius: "20px",
    background: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: "20px",
  },
};

export default FavoriteSearch;
