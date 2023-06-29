import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { name: "Emlak", link: "/category" },
    { name: "Vasıta", link: "/category" },
    { name: "Ev & Bahçe", link: "/category" },
    { name: "Elektronik", link: "/category" },
    { name: "Moda", link: "/category" },
    { name: "Yedek Parça", link: "/category" },
    { name: "İkinci el", link: "/category" },
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