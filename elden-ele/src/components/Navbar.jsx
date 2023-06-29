import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo2.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

export default function Navbar({ isScrolled, handleSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [isWindowSmall, setIsWindowSmall] = useState(false);

  const onSearch = (word) => {
    handleSearch(word);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmall(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (window.innerWidth < 900) {
        setIsWindowSmall(true);
      }
    };
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleMessagesClick = () => {
    setShowMessages(!showMessages);
    setShowNotifications(false);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    setShowMessages(false);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowLinks(!showLinks);
  };

  const closeMenu = () => {
    setShowMenu(false);
    setShowLinks(true);
  };

  const handleSignOut = async () => {
    try {
      // Kullanıcının token'ını ve kimlik doğrulama durumunu silme işlemi
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.setItem("isLoggedIn", false);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  const links = [
    { name: "Ana sayfa", link: "/" },
    { name: "İndirimli ürünler", link: "/iu" },
    { name: "Kayıt ol", link: "/signup" },
    { name: "Giriş yap", link: "/login" },
    { name: "Profilim", link: "/profile" },
    { name: "Favori ilanlar", link: "/mylist" },
    { name: "Detaylı Arama", link: "/search" },
  ];

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand">
            <img src={logo} alt="Logo" />
          </div>
          {isWindowSmall && (
            <>
              <div className="burger-menu" onClick={handleMenuClick}>
                <div className="line" />
                <div className="line" />
                <div className="line" />
              </div>
              {showMenu && (
                <div className="burger-menu-window">
                  {links.map(({ name, link }) => {
                    if (isLoggedIn && name === "Giriş yap") {
                      return null;
                    }
                    if (!isLoggedIn && name === "Profilim") {
                      return null;
                    }
                    return (
                      <Link key={name} to={link} onClick={closeMenu}>
                        {name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {!isWindowSmall && (
            <div className={`links "" : "show-menu"}`}>
              {links.map(({ name, link }) => {
                if (isLoggedIn && name === "Giriş yap") {
                  return null;
                }
                if (!isLoggedIn && name === "Profilim") {
                  return null;
                }
                return (
                  <Link key={name} to={link} onClick={closeMenu}>
                    {name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="right flex a-center">
          <div className="message-button">
            <button onClick={handleMessagesClick}>
              <AiFillMessage />
            </button>
            {showMessages && (
              <div className="messages-container">
                <div className="messages">
                  <h4 style={{ textDecoration: "underline" }}>Mesajlar</h4>
                  <span>
                    <b>
                      <Link to={"/message"}>Zeynep</Link>
                    </b>
                  </span>
                  <h6>Mesajlar kısmı</h6>
                </div>
                <button
                  className="notification-button"
                  onClick={handleNotificationsClick}
                >
                  <h4>Bilgilendirmeler</h4>
                </button>
              </div>
            )}
            {showNotifications && (
              <div className="messages-container">
                <h6>Bu bir bilgilendirme</h6>
              </div>
            )}
          </div>
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Ara"
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
              onChange={(e) => onSearch(e.target.value)}
            />
            <button onClick={handleSignOut}>
              <FaPowerOff />
            </button>
          </div>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: rgba(0, 0, 0, 0.25);
    filter: brightness(97%);
  }

  nav {
    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      top: 0;
      left: 0;
      z-index: 1;
      padding: 0;
    }
    display: flex;
    position: sticky;
    top: 0;
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 1rem 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;

    .left {
      gap: 2rem;
      display: flex;
      align-items: center;

      .brand {
        display: flex;
        align-items: center;

        img {
          height: 4rem;
        }

        img:hover {
          transform: rotate(360deg);
          transition: transform 0.45s ease-in-out;
        }
      }

      .links {
        margin-top: auto;
        list-style-type: none;
        gap: 2.5rem;
        display: flex;
        justify-content: space-between;

        a {
          color: black;
          text-decoration: none;

          &:hover {
            color: #a89d37;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.01);
          }
        }
      }

      .show-menu {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        z-index: 3;

        a {
          font-size: 1.5rem;
        }
      }

      .burger-menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 20px;
        height: 16px;
        cursor: pointer;

        .line {
          width: 100%;
          height: 2px;
          background-color: black;
          transition: transform 0.3s ease-in-out;

          &.active {
            transform: rotate(45deg);
          }

          &:nth-child(2) {
            transform-origin: center;
            transition: transform 0.3s ease-in-out;

            &.active {
              transform: scaleX(0);
            }
          }

          &:last-child {
            transform-origin: center;
            transition: transform 0.3s ease-in-out;

            &.active {
              transform: rotate(-45deg);
            }
          }
        }
      }
      .burger-menu-window {
        position: fixed;
        top: 6rem;
        background-color: white;
        border: 1px solid black;
        border-radius: 0.5rem;
        padding: 1rem;
        z-index: 3;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        a {
          color: #a89d37;
          font-size: 115%;
        }
      }
    }
    .right {
      gap: 1rem;
      display: flex;
      align-items: center;

      .message-button {
        position: relative;

        button {
          background-color: transparent;
          border: none;
          cursor: pointer;

          &:focus {
            outline: none;
          }

          svg {
            color: black;
            font-size: 1.2rem;
          }
        }
        h4 {
          margin-bottom: 20%;
        }
        .messages-container {
          position: absolute;
          top: 2rem;
          right: 0;
          display: flexbox;
          flex-direction: row;
          justify-content: space-between;
          gap: 1rem;
          width: 25rem;
          padding: 1rem;
          background-color: white;
          border-radius: 0.4px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

          .notification-button {
            margin: 0;
            padding: 0;
            text-decoration: underline;
          }
        }
      }
      .search {
        display: flex;
        gap: 0.6rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        border-radius: 0.3rem;

        button {
          background-color: transparent;
          border: none;

          &:focus {
            outline: none;
          }

          svg {
            color: black;
            font-size: 1.2rem;
          }
        }

        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;

          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);

        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
