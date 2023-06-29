
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Image1 from "../assets/ilan1.jpg";
import Image2 from "../assets/ilan2.jpg";
import Image3 from "../assets/ilan3.jpg";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { DB_URL } from "../store/URL";
import 'react-toastify/dist/ReactToastify.css';

export default function UserLiked() {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [likedList, setLikedList] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate()
  // eslint-disable-next-line
  const cards = [
    {
      id: "1",
      title: "İlan 1",
      image: Image1,
      price: "100 TL",
    },
    {
      id: "2",
      title: "İlan 2",
      image: Image2,
      price: "200 TL",
    },
    {
      id: "3",
      title: "İlan 3",
      image: Image3,
      price: "300 TL",
    },
    {
      id: "4",
      title: "İlan 4",
      image: Image2,
      price: "400 TL",
    },
    {
      id: "5",
      title: "İlan 5",
      image: Image3,
      price: "500 TL",
    },
    {
      id: "6",
      title: "İlan 6",
      image: Image1,
      price: "600 TL",
    },
    {
      id: "7",
      title: "İlan 7",
      image: Image3,
      price: "700 TL",
    },
    {
      id: "8",
      title: "İlan 8",
      image: Image2,
      price: "800 TL",
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          navigate("/login")
          return;
        }
        const response = await axios.get(
          `${DB_URL}/liked/${email}`
          );
          
        const likedAds = response.data?.ads || {};
        const formattedData = Object.keys(likedAds).reduce((acc, listingId) => {
          if (likedAds[listingId] !== null) {
            acc.push({ id: likedAds[listingId] });
          }
          return acc;
        }, []);
        
        setLikedList(formattedData);
        if (formattedData.length === 0 && !toastShown) {
          
          toast.warning("Favori ilanınız yoktur...");
          setToastShown(true);
        } 
      } catch (error) {
        console.log("Hata oluştu:", error);
      }
    };
  
    fetchData();
  }, [toastShown, cards, navigate]);
  
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const getLikedCards = () => {
    const likedCards = cards.filter((card) =>
      likedList.some((listing) => listing.id === card.id)
    );
    return likedCards;
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>Favori ilanlarım</h1>
        <ToastContainer />
        <div className="grid flex">
        <CardContent>
        <CardsContainer>
        {getLikedCards().map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  image={card.image}
                  price={card.price}
                  isLiked={true}
                />
              ))}
        </CardsContainer>
        </CardContent>
        </div>
      </div>
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
`;

const CardContent = styled.div`
  padding: 1rem;
  .card-content{
        display: flex;
        gap: 1rem;
        justify-content: space-between;
      svg {
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
  }
`;