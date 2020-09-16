import React from "react";
import Banner from "../Banner/Banner";
import blackLogo from "../../Images/Logo.png";
import { Grid } from "@material-ui/core";

import { hotelsInfo } from "../../Data/Destination";
import HotelDetails from "./HotelDetails";
const Hotels = () => {
  return (
    <div>
      <Banner img={blackLogo}></Banner>

      <Grid container item xs={12} justify="space-between">
        <Grid item xs={12} md={6}>
          {hotelsInfo.map((hotel) => {
            return <HotelDetails hotel={hotel}></HotelDetails>;
          })}
        </Grid>

        <Grid item xs={12} md={6}>
          a
        </Grid>
      </Grid>
    </div>
  );
};

export default Hotels;
