import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/logo1.jpg";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import FavoriteSearch from "../components/FavoriteSearch";

function Home() {
  const [data, setData] = useState([{}]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ads, setAds] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/getAll");
      if (response.ok) {
        const adverts = await response.json();
        const advertsWithImages = await fetchImagesForAds(adverts);
        setData(advertsWithImages);
      } else {
        console.error("Veri alınırken bir hata oluştu:", response.statusText);
      }
    } catch (error) {
      console.error("Veri alınırken bir hata oluştu:", error);
    }
  };

  const fetchImagesForAds = async (ads) => {
    const adsWithImages = await Promise.all(
      ads.map(async (ad) => {
        try {
          const response = await fetch(
            `http://localhost:3000/image/${ad.image}`
          );
          if (response.ok) {
            const images = await response.json();
            return { ...ad, images };
          }
        } catch (error) {
          console.error("Resim alınırken bir hata oluştu:", error);
        }
        return ad;
      })
    );

    return adsWithImages;
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setIsLoggedIn(true);
      return isLoggedIn;
    } else setIsLoggedIn(false);
    return isLoggedIn;
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const getAllAds = async () => {
    const res = await fetchData();
    setAds(res);
  };

  const handleSearch = async (word) => {
    if (word === "") {
      getAllAds();
      window.location.reload();
    } else {
      try {
        const res = await fetchData();
        const updatedSearches = [...searches, word];
        setSearches(updatedSearches);
        localStorage.setItem("searchHistory", JSON.stringify(updatedSearches));
        const filteredAds = res.filter((ad) =>
          ad.title.toLowerCase().includes(word.toLowerCase())
        );
        setAds(filteredAds);
        setSearchWord(word);
        if (filteredAds.length === 0) {
          toast.warning("Aradığınız sonuç bulundamadı.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  function ShowMore({ items, visibleItemCount, searchWord, categoryName }) {
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
      setShowMore(!showMore);
    };

    let categorizedItems = [];
    items.forEach((item) => {
      if (item.categoryName == categoryName) {
        categorizedItems.push(item);
      }
    });
    const visibleItems = showMore
      ? categorizedItems
      : categorizedItems.slice(0, visibleItemCount);

    return (
      <div>
        <CardsContainer>
          {searchWord === ""
            ? visibleItems.map((item) => (
                <Card
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  image={item.image.image}
                  price={item.price}
                  isLiked={false}
                />
              ))
            : ads.map((ad) => (
                <Card
                  key={ad._id}
                  _id={ad._id}
                  title={ad.title}
                  image={ad.image}
                  price={ad.price}
                />
              ))}
        </CardsContainer>
        <div className="d-flex justify-content-center">
          <span>
            <button
              style={{ borderRadius: "8px", marginTop: "10px" }}
              onClick={handleShowMore}
            >
              {showMore ? "Daha Az Göster" : "Daha Fazla Göster"}
            </button>
          </span>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <Navbar isScrolled={isScrolled} handleSearch={handleSearch} />
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
      <FavoriteSearch handleSearch={handleSearch} />

      <MainContent>
        <ToastContainer />
        <Sidebar />

        <div className="container">
          <div>
            <div className="row">
              <h2>Vasıta Kategorisinde Öne Çıkan İlanlar</h2>
              <ShowMore
                items={data}
                visibleItemCount={4}
                searchWord={searchWord}
                categoryName={"Vasita"}
              />
            </div>
            <div className="row">
              <h2>Elektronik Kategorisinde Öne Çıkan İlanlar</h2>
              <ShowMore
                items={data}
                visibleItemCount={4}
                searchWord={searchWord}
                categoryName={"Elektronik"}
              />
            </div>
            <div className="row">
              <h2>Emlak Kategorisinde Öne Çıkan İlanlar</h2>
              <ShowMore
                items={data}
                visibleItemCount={4}
                searchWord={searchWord}
                categoryName={"Emlak"}
              />
            </div>
            <div className="row">
              <h2>Ev ve Bahçe Kategorisinde Öne Çıkan İlanlar</h2>
              <ShowMore
                items={data}
                visibleItemCount={4}
                searchWord={searchWord}
                categoryName={"EvBahce"}
              />
            </div>
            <div className="row">
              <h2>Moda Kategorisinde Öne Çıkan İlanlar</h2>
              <ShowMore
                items={data}
                visibleItemCount={4}
                searchWord={searchWord}
                categoryName={"Moda"}
              />
            </div>
            <div className="row">
              <h2>Yedek Parça Kategorisinde Öne Çıkan İlanlar</h2>
              <ShowMore
                items={data}
                visibleItemCount={4}
                searchWord={searchWord}
                categoryName={"YedekParca"}
              />
            </div>
            <div className="row">
              <h2>İkinci El Kategorisinde Öne Çıkan İlanlar</h2>
              <ShowMore
                items={data}
                visibleItemCount={4}
                searchWord={searchWord}
                categoryName={"İkinciEl"}
              />
            </div>
          </div>
        </div>
      </MainContent>
      <Footer />
    </Container>
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
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(1, 2fr);
    gap: 0;
    .row {
      margin-top: 5%;
      font-style: oblique;
      h2 {
        font-size: 21px;
      }
    }
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default Home;
