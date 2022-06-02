import React from "react";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav>
          <AiFillHome></AiFillHome>
          <Logo to={"/"}>Foodie</Logo>
        </Nav>
        <Search></Search>
        <Category></Category>
        <Pages></Pages>
      </Router>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default App;
