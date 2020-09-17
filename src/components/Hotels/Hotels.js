import React from "react";
import Banner from "../Banner/Banner";
import blackLogo from "../../Images/Icon/Logo.png";
import { Grid } from "@material-ui/core";

import { hotelsInfo } from "../../Data/Data";
import HotelDetails from "./HotelDetails";
import Map from "../Map/Map";
const Hotels = () => {
  return (
    <div>
      <Banner color="black" img={blackLogo}></Banner>

      <Grid
        container
        item
        xs={12}
        justify="space-between"
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={12} md={6}>
          <div style={{ marginLeft: "15px" }}>
            <b style={{ color: "grey" }}>252 Stays Sep 17-20</b>
            <h3 style={{ margin: 0 }}>Stay in Cox's Bazar</h3>
          </div>
          {hotelsInfo.map((hotel) => {
            return <HotelDetails hotel={hotel}></HotelDetails>;
          })}
        </Grid>

        <Grid item xs={12} md={6}>
          <Map></Map>
        </Grid>
      </Grid>
    </div>
  );
};

export default Hotels;
