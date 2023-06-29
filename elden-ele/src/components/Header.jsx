import React from "react";
import styled from "styled-components";
import logo from "../assets/logo2.png";

export default function Header() {

  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

    </StyledHeader>
  );
}
const StyledHeader = styled.header`
   padding: 0 4rem;
   position: absolute;
   top: 0;
   left: 0;
  .logo {
    img {
      height: 6rem;
      transition: transform 0.5s;
    }
    img:hover {
      transform: rotate(360deg);
    }
  } 
`;