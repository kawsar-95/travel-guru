/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import Banner from "../Banner/Banner";
import TravelSection from "../TravelSection/TravelSection";

import "./Home.css";

const Home = () => {
  const [showArea] = useContext(MyContext);

  return (
    <div>
      <div
        className="home-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${showArea.img})`,
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <Banner color="white"></Banner>
        <TravelSection></TravelSection>
      </div>
    </div>
  );
};

export default Home;
