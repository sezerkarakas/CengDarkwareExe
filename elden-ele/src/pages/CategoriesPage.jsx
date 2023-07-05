import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import backgroundImage from "../assets/logo1.jpg";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

function CategoriesPage() {
  const [ilanlar, setIlanlar] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${categoryName}`);
        const data = await response.json();
        setIlanlar(data);
      } catch (error) {
        console.error("İlanlar alınamadı:", error);
      }
    };

    fetchIlanlar();
  }, [categoryName]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  function Title(links) {
    return (
      <>
        <h2>
          <span
            style={{
              border: "1px grey",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            {links.name}
          </span>
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <Container>
        <div className="hero">
          <img
            src={backgroundImage}
            alt="background"
            className="background-image"
          />

          <div className="container">
            <div className="logo"></div>
            <div className="buttons flex"></div>
          </div>
        </div>
        <MainContent>
          <Sidebar />

          <div className="container">
            <Title name={`${categoryName} Kategorisi`} />
            <CardsContainer>
              {ilanlar.map((item) => (
                <Card
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                />
              ))}
            </CardsContainer>
          </div>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 1rem;

  .hero {
    position: relative;
    height: 90px;
    background-color: #005cbf;
    overflow: hidden;
    border-radius: 4px;

    .container {
      position: absolute;
      bottom: 1rem;
      left: 1rem;

      .logo {
        img {
          width: 200px;
        }
      }

      .buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;

        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background-color: #f5f5f5;
          color: #005cbf;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #ddd;
          }
        }
      }
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;

export default CategoriesPage;
