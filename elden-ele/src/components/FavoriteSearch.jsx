import React from "react";

const FavoriteSearch = ({ text }) => {
  return (
    <div style={styles.container}>
      <div style={styles.circular}>
        <span style={styles.text}>{text}</span>
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
