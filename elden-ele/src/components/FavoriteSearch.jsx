import React, { useState } from "react";

const FavoriteSearch = ({ text }) => {
  const [close, setClose] = useState(true);
  const closeHandler = () => {
    setClose(false);
  };


  return (
    <div className="container">
      <div className="d-flex">
        {close && (
          <button
            style={{ borderColor: "black", borderRadius: "25px" }}
            type="button"
            className="btn btn-light"
          >
            son arama
            <span
              style={{ marginLeft: "5px" }}
              className="btn-close"
              onClick={closeHandler}
            ></span>
          </button>
        )}
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
