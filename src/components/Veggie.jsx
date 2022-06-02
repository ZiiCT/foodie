import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import styled from "styled-components";
import { Link } from "react-router-dom";

const Veggie = () => {
  const [veggies, setVeggies] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      setVeggies(JSON.parse(check));
    } else {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API}&number=9&tags=vegetarian`
        );
        if (!api.ok) {
          throw Error(
            "Could not connect to database, please refresh or try again later"
          );
        }
        const data = await api.json();
        console.log(data);
        localStorage.setItem("veggie", JSON.stringify(data.recipes));
        setVeggies(data.recipes);
      } catch (error) {}
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>

        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {veggies.map((veggie) => {
            return (
              <SplideSlide key={veggie.id}>
                <Card>
                  <Link to={"/recipe/" + veggie.id}>
                    <p>{veggie.title}</p>
                    <img src={veggie.image} alt={veggie.title} />
                    <Gradient></Gradient>
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  margin:right:1rem;
  overflow: hidden;
  position:relative;

  img {
    border-radius: 2rem;
    
    position:absolute;
    left:0;
    max-width:100%;
    height:100%;
    object-fit:cover;
  }
  p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
  
    transform:translate(-50%,0%);
    color:white;
    width:100%;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
