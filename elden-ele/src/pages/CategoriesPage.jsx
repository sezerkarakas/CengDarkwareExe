import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Image1 from "../assets/ilan1.jpg";
import Image2 from "../assets/ilan2.jpg";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import backgroundImage from "../assets/logo1.jpg";
import Footer from "../components/Footer";
import axios from "axios";

function CategoriesPage({ categoryName }) {
  const [data, setData] = useState([{}]);
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAll");
      if (response.data.categoryName == categoryName) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const links = [
    { name: "Emlak", link: "/category/emlak" },
    { name: "Vasıta", link: "/category/vasita" },
    { name: "Ev & Bahçe", link: "/category/evbahce" },
    { name: "Elektronik", link: "/category/elektronik" },
    { name: "Moda", link: "/category/moda" },
    { name: "Yedek Parça", link: "/category/yedekparca" },
    { name: "İkinci el", link: "/category/ikinciel" },
  ];

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

  const cards = [
    {
      id: "11",
      title: "İlan 1",
      image: Image1,
      price: "100 TL",
    },
    {
      id: "22",
      title: "İlan 2",
      image: Image2,
      price: "200 TL",
    },
    {
      id: "33",
      title: "İlan 3",
      image: Image1,
      price: "200 TL",
    },
    {
      id: "44",
      title: "İlan 4",
      image: Image2,
      price: "200 TL",
    },
    {
      id: "55",
      title: "İlan 5",
      image: Image1,
      price: "200 TL",
    },
    {
      id: "66",
      title: "İlan 6",
      image: Image2,
      price: "200 TL",
    },
    {
      id: "77",
      title: "İlan 6",
      image: Image1,
      price: "200 TL",
    },
    {
      id: "88",
      title: "İlan 6",
      image: Image2,
      price: "200 TL",
    },
  ];
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
            <Title name={`${links[1].name} Kategorisi`} />
            <CardsContainer>
              {data.map((item) => (
                <Card
                  key={item.id}
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
