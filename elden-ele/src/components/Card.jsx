import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DB_URL } from "../store/URL";
import "react-toastify/dist/ReactToastify.css";

export default function Card({
  key,
  title,
  image,
  price,
  _id,
  isLiked = false,
}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [likedList, setLikedList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setEmail(currentUser.email);
      }
    });
  }, [isLoggedIn]);

  const addToList = async () => {
    try {
      if (localStorage.getItem("isLoggedIn") === "true") {
        const email = localStorage.getItem("email");
        const response = await axios.get(` ${DB_URL}/liked/${email}`);
        const likedAds = response.data?.ads || {};
        const updatedLikedList = [...likedList, _id];
        setLikedList(updatedLikedList);
        const adAlreadyLiked = Object.values(likedAds).includes(_id);
        if (adAlreadyLiked) {
          toast.warning("Bu ilanı önceden beğenmişsiniz!");
          return;
        }
        await axios.post(`${DB_URL}/add`, {
          email,
          likedList: updatedLikedList,
        });
        toast.success("İlan favorilere eklendi!");
      } else {
        toast.error(
          "İlanı beğenebilmek için lütfen giriş yapın ya da kayıt olun"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("beklenmeyen bir hata oluştu");
    }
  };

  const removeAdFromLiked = async () => {
    try {
      const email = localStorage.getItem("email");
      const updatedLikedList = [...likedList, _id];
      setLikedList(updatedLikedList);
      await axios.delete(`${DB_URL}/remove`, {
        data: {
          email,
          likedList: updatedLikedList,
        },
      });
      toast.warning("İlan favorilerden çıkarıldı!");
    } catch (error) {
      console.log(error);
      toast.error("Beklenmeyen bir hata oluştu");
    }
  };

  const fetchOneData = () => {
    try {
      const response = axios.get(`http://localhost:5000/get/${_id}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Veri alınırken bir hata oluştu:", error);
    }
  };

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <CardContainer>
      <Link to={`/ilan/${_id}`} activeClassName="active-link">
        <CardImage src={image} alt={title} />
      </Link>
      <CardContent>
        <div className="card-content">
          <Link to={`/ilan/${_id}`} style={linkStyle} onClick={fetchOneData}>
            <CardTitle>{title}</CardTitle>
          </Link>
          <CardPrice>{price}</CardPrice>
          {isLiked ? (
            <BsCheck
              title="Favorilerden çıkar"
              onClick={() => dispatch(removeAdFromLiked({ adId: _id, email }))}
            />
          ) : (
            <AiOutlinePlus title="Favorilere ekle" onClick={addToList} />
          )}
        </div>
      </CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  .card-content {
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

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardPrice = styled.p`
  font-size: 1rem;
`;
