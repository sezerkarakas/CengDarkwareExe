import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { name: "Emlak", link: "/Emlak" },
    { name: "Vasıta", link: "/Vasita" },
    { name: "Ev & Bahçe", link: "/EvBahce" },
    { name: "Elektronik", link: "/Elektronik" },
    { name: "Moda", link: "/Moda" },
    { name: "Yedek Parça", link: "/YedekParca" },
    { name: "İkinci el", link: "/İkinciEl" },
  ];
  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <SidebarContainer>
      <Categories>
        {links.map(({ name, link }) => {
          return (
            <Link style={linkStyle} to={link}>
              <CategoryItem>{name}</CategoryItem>
            </Link>
          );
        })}
      </Categories>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  flex: 0 0 15%;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
`;

const Categories = styled.ul`
  list-style: inside;
  padding: 0;
  padding-left: 1rem;
`;

const CategoryItem = styled.li`
  padding: 0.7rem 0;
  cursor: pointer;

  &:hover {
    color: #a89d37;
    list-style-position: outside;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export default Sidebar;
