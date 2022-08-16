import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaList, FaPlus, FaClock,FaBook } from "react-icons/fa";

const MobileNav = () => {
  const data = [<FaHome />, <FaList />, <FaPlus />, <FaClock />];
  const links = [
    {
      icon: <FaHome />,
      url: "/",
    },
    {
      icon: <FaList />,
      url: "taskQueue",
    },
    {
      icon: <FaPlus />,
      url: "addTask",
    },
    {
      icon: <FaClock />,
      url: "postponed",
    },
    {
      icon:<FaBook/>,
      url: "history",
    },
  ];

  const initialState = () => {
    const navs = new Array(data.length);
    return navs.fill(false);
  };
  const [isOpen, setIsOpen] = useState(initialState);

  const handleClick = (index) => {
    const newState = [...isOpen];
    newState[index] = !newState[index];
    newState.forEach((item, i) => {
      if (i !== index) {
        newState[i] = false;
      }
    });
    setIsOpen(newState);
  };

  return (
    <StyledMobileNav active={false}>
      {links.map((item, index) => (
        <Link to={item.url} key={index} duration={1000}>
          <StyledNavIcon
            onClick={() => {
              handleClick(index);
            }}
            active={isOpen[index]}
          >
            {item.icon}
          </StyledNavIcon>
        </Link>
      ))}
    </StyledMobileNav>
  );
};

const StyledMobileNav = styled.div`
  z-index: 100;
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  background-color: #ffffff0f;
  backdrop-filter: blur(5px);
  width: 80%;
  max-width: 500px;
  padding: 0.25em 1.25rem;
  border-radius: 10rem;
  bottom: 1.25rem;
  right: 50%;
  transform: translateX(50%);
`;
const StyledNavIcon = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
  padding: 0.25em;
  ${({ active }) =>
    active &&
    `
    background: white; ;
    transition: background 0.2s ease-in-out;
  `}
`;
export default MobileNav;
