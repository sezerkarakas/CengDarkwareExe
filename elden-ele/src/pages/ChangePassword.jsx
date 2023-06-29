import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { Link, useNavigate } from "react-router-dom";
import { DB_URL } from "../store/URL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const navigate = useNavigate();

  const changePassword = async () => {
    try {
      if (!email || !password || !newPassword || !newPassword2) {
        toast.error("Lütfen email, eski şifre ve yeni şifre giriniz.");
        return;
      }
      if (newPassword !== newPassword2) {
        toast.error("Yeni şifreler eşleşmiyor.");
        return;
      }
      // Eski şifrenin doğruluğunu kontrol etmek için
      const checkPasswordResponse = await axios.post(
        `${DB_URL}/checkPassword`,
        {
          email,
          password,
        }
      );
      if (checkPasswordResponse.data && checkPasswordResponse.data.correct) {
        // Şifre doğrulama işlemi başarılı ise şifre değiştirme işlemi gerçekleştirilir
        const response = await axios.put(`${DB_URL}/changepassword/${email}`, {
          email,
          password,
          newPassword,
          newPassword2,
        });

        if (response.data && response.data.exists) {
          toast.success(
            "Şifre başarıyla değiştirildi. Giriş yap sayfasına yönlendiriliyorsunuz."
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          toast.warning("Email kayıtlı değildir, lütfen hesap oluşturun!");
        }
      } else {
        toast.error("Eski şifre yanlıştır.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Şifre değiştirme işlemi sırasında bir hata oluştu.");
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
              <h3>Şifre Sıfırlama</h3>
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
                placeholder="Eski Şifre"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type="Password"
                placeholder="Yeni Şifre "
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <input
                type="Password"
                placeholder="Yeni Şifre "
                autoComplete="new-password"
                onChange={(e) => setNewPassword2(e.target.value)}
                value={newPassword2}
              />
              <div className="buttons">
                <button onClick={() => changePassword()}>
                  Şifremi Değiştir
                </button>
                <Link className="login" to={"/login"}>
                  Giriş Yap
                </Link>
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
    padding: 6.2rem;
    background-color: #000000b0;
    border-radius: 2rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
    @media (max-width: 768px) {
      padding: 2rem;
      justify-content: space-between;
      align-items: center;
    }
  }
  .title {
    text-align: center;
    margin-bottom: 2%;
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
    gap: 4%;
    align-items: center;
  }
  input {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.5rem 1rem;
    width: 90%;
    height: 14%;
  }
  .buttons {
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    width: 100%;
  }
  .login {
    padding: 0.5rem 3.5rem;
    background-color: #e6cc00;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.3rem;
    font-weight: bolder;
    font-size: 1.05rem;
    position: relative;
    text-decoration: none;
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

export default ChangePassword;
