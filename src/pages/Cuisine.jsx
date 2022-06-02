import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);

  let params = useParams();

  useEffect(() => {
    getRecipes(params.type);
  }, [params.type]);

  const getRecipes = async (name) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API}&cuisine=${name}`
      );
      if (!api.ok) {
        throw Error(
          "Could not connect to database, please refresh or try again later"
        );
      }
      const recipes = await api.json();
      console.log(recipes);

      setCuisine(recipes.results);
    } catch (error) {}
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((recipe) => {
        return (
          <Link to={"/recipe/" + recipe.id}>
            <Card key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Card>
          </Link>
        );
      })}
    </Grid>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 3rem;
  border: 1px solid red;
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
export default Cuisine;
