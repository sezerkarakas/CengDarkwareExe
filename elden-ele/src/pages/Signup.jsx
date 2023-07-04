//loinin kodunun üzerine userId çekmek için ekleme yaptım satır 77-78 de
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DB_URL } from "../store/URL";
import axios from "axios";
function Signup() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    kullanici_adi: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [isLoggedIn]);

  const handleSignUp = async () => {
    try {
      const { email, password, firstName, lastName, kullanici_adi, phone } =
        formValues;
      if (
        email === "" ||
        password === "" ||
        firstName === "" ||
        lastName === "" ||
        kullanici_adi === "" ||
        phone === ""
      ) {
        toast.error("Lütfen bütün alanları doldurun!");
        return;
      }
      if (email !== "" && password.length < 6) {
        toast.error("Şifre en az 6 karakter olmalıdır!");
        return;
      }
      if (email === "") {
        toast.error("Lütfen email giriniz!");
        return;
      }
      const response = await axios.get(`${DB_URL}/checkEmail/${email}`);
      if (response.data.exists) {
        toast.error("Bu Email önceden kullanılmıştır!");
        return;
      }
      const responseUser = await axios.post(`${DB_URL}/checkName`, {
        kullanici_adi,
      });
      if (responseUser.data.exists) {
        toast.error("Bu kullanıcı adı önceden kullanılmıştır!");
        return;
      }
      const addUserResponse = await axios.post(`${DB_URL}/addUser`, {
        email,
        firstName,
        lastName,
        kullanici_adi,
        phone,
        password,
      });
      const { token } = addUserResponse.data;
      if (token) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("email", addUserResponse.data.email);
        const { _id } = addUserResponse.data;
        localStorage.setItem("userId", _id);
        navigate("/");
      } else {
        toast.error("Kullanıcı oluşturulurken bir hata oluştu!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Beklenmeyen bir hata oluştu!");
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="body flex column a-center j-center">
          <div className="text flex column a-center j-center">
            <h1>EldenEle.</h1>
            <h6>İSTEDİĞİNİ BULMAYA HAZIR MISIN?</h6>
          </div>
          <div className="form">
            <div className="title">
              <h3>Kayıt ol</h3>
            </div>
            <form>
              <input
                type="email"
                placeholder="Email"
                autoComplete="current-email"
                required="true"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="email"
                value={formValues.email}
              />
              <input
                type="firstName"
                placeholder="Ad"
                autoComplete="current-firstName"
                required="true"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="firstName"
                value={formValues.firstName}
              />
              <input
                type="lastName"
                placeholder="Soyad"
                autoComplete="current-lastName"
                required="true"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="lastName"
                value={formValues.lastName}
              />
              <input
                type="kullanici_adi"
                placeholder="Kullanıcı adınız"
                autoComplete="current-kullanici_adi"
                required="true"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="kullanici_adi"
                value={formValues.kullanici_adi}
              />
              <input
                type="phone"
                placeholder="Telefon - 05123456789"
                autoComplete="current-phone"
                required="true"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="phone"
                value={formValues.phone}
              />
              <input
                type="password"
                placeholder="Şifre"
                autoComplete="current-password"
                required="true"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            </form>
            <button onClick={handleSignUp}>Kayıt ol</button>
            <div className="hesap">
              <p>Hesabınız var mı? </p>
              <Link className="link" to={"/login"}>
                {" "}
                Giriş Yap{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text {
      position: absolute;
      left: 0;
      top: 0;
      margin-top: 15%;
      margin-left: 8%;
      color: white;
      gap: 3rem;
      text-align: center;
      padding-bottom: 2rem;
      h1 {
        padding: 0;
        color: #e6cc00;
        font-size: 8rem;
        transition: transform 0.2s ease-out;
        @media (max-width: 768px) {
          margin: auto;
          font-size: 3rem;
          padding-left: 3rem;
          margin: auto;
          &:hover {
            color: #ffe600;
            list-style-position: outside;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0);
            transform: translateY(-5px);
          }
        }
        &:hover {
          color: #ffe600;
          list-style-position: outside;
          box-shadow: 0px 3px 5px rgba(0, 0, 0, 0);
          transform: translateY(-5px);
        }
      }
      h6 {
        font-size: 1.6rem;
        margin: auto;
        padding-bottom: 1%;
        @media (max-width: 768px) {
          font-size: 1rem;
          padding-left: 2rem;
          margin: auto;
        }
      }
    }
    .form {
      position: absolute;
      padding: 4rem;
      background-color: #000000b0;
      border-radius: 2rem;
      width: 100%;
      max-width: 33rem;
      margin: auto;
      gap: 1rem;
      right: 0;
      top: 0;
      margin-top: 2.5%;
      margin-right: 10%;
      @media (max-width: 768px) {
        font-size: medium;
        width: 70%;
        margin: auto;
        top: 13rem;
        left: 0;
        padding: 2rem;
        &:focus {
          outline: none;
        }
      }
      .title {
        text-align: center;
        margin-bottom: 5%;
        color: white;
        &:hover {
          color: #e6cc00;
          list-style-position: inside;
          box-shadow: rgba(0, 0, 0, 1);
        }
      }
      input {
        color: black;
        border: none;
        padding: 1rem;
        border-radius: 1rem 2rem;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        border: 1.5px solid black;
        @media (max-width: 768px) {
          font-size: small;
          display: grid;
          padding: 1rem;
          height: 2.5rem;
          &:focus {
            outline: none;
          }
        }
        &:focus {
          outline: none;
        }
        width: 100%;
      }
      .hesap {
        color: white;
        margin-top: 3%;
        display: flex;
        justify-content: flex-start;
        gap: 0.5rem;
        .link {
          color: #ffe600;
          &:hover {
            color: #e6cc00;
            list-style-position: outside;
            box-shadow: rgba(0, 0, 0, 1);
          }
        }
      }
      button {
        padding: 0.5rem 1.5rem;
        background-color: #e6cc00;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.3rem;
        font-weight: bolder;
        font-size: 1.05rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0.5rem;
        @media (max-width: 768px) {
          font-size: small;
          display: grid;
          height: 2rem;
          &:focus {
            outline: none;
          }
        }
        &:hover {
          color: #a89d37;
          list-style-position: outside;
          box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
`;

export default Signup;
