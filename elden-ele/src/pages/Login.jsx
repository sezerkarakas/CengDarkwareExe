//*****************************************
//loinin kodunun üstüne ekleme yaptım satır 44-45te
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { Link, useNavigate } from "react-router-dom";
import { DB_URL } from "../store/URL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const emailRegistered = await axios.get(`${DB_URL}/checkEmail/${email}`);
      if (!emailRegistered.data.exists) {
        toast.warning("Email Kayıtlı değildir, Lütfen hesap oluşturun!");
        return;
      }
      if (!email || !password) {
        toast.error("Lütfen email ve şifre giriniz.");
        return;
      }
      const response = await axios.post(`${DB_URL}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("email", response.data.email);
        const { _id } = response.data;
        localStorage.setItem("userId", _id);
        navigate("/");
      }
    } catch (error) {
      toast.error("Email ya da şifre yanlıştır.");
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Giriş Yap</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                autoComplete="current-email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Şifre"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="buttons">
                <Link className="changepassword" to={"/changepassword"}>
                  Şifremi Değiştir{" "}
                </Link>
                <button onClick={handleLogin}>Giriş Yap</button>
              </div>
              <div className="hesap">
                <p>Hesabınız yok mu? Hemen oluşturun</p>
                <Link className="link" to={"/signup"}>
                  Kayıt Ol
                </Link>
              </div>
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
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-container {
    display: flex;
    justify-content: center;
  }
  .form {
    padding: 7rem;
    background-color: #000000b0;
    border-radius: 2rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
    @media (max-width: 768px) {
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .title {
    text-align: center;
    &:hover {
      color: #e6cc00;
      list-style-position: inside;
      box-shadow: rgba(0, 0, 0, 1);
    }
  }
  .container {
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  input {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.5rem 1rem;
    width: 90%;
    height: 17%;
  }
  .buttons {
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    width: 100%;
  }
  .changepassword {
    padding: 0.5rem 1.5rem;
    background-color: #e6cc00;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.3rem;
    text-decoration: none;
    font-weight: bolder;
    font-size: 1.05rem;
    position: relative;
    margin-top: 0.7rem;
    &:hover {
      color: #a89d37;
      list-style-position: outside;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
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
    margin-top: 0.7rem;
    &:hover {
      color: #a89d37;
      list-style-position: outside;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
    }
  }
  .hesap {
    color: white;
    margin-top: 2%;
    display: flex;
    justify-content: center;
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
`;

export default Login;
