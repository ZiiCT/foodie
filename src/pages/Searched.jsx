import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  let params = useParams();
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const getSearched = async (name) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API}&query=${name}`
      );
      if (!api.ok) {
        throw Error(
          "Could not connect to database, please refresh or try again later"
        );
      }
      const recipes = await api.json();
      setSearchedRecipes(recipes.results);
    } catch (error) {}
  };

  return (
    <Grid>
      {searchedRecipes.map((item) => {
        return (
          <Link to={"/recipe/" + item.id}>
            <Card key={item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Card>
          </Link>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    max-width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
export default Searched;
