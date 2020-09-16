/* eslint-disable no-unused-vars */
import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { MyContext } from "../../App";

const TravelArea = (props) => {
  const [showArea, setShowArea] = useContext(MyContext);
  const { title, description, img } = props.place;

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "right top",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "border-box",
    width: "98%",
    border: "3px solid #ff9100",
    borderRadius: "10px",
    margin: "2px",
  };

  return (
    <Grid item xs={12} md={4}>
      <div
        onClick={() => setShowArea(props.place)}
        style={backgroundImageStyle}
      >
        <h2 style={{ marginTop: "250px", textAlign: "center", color: "white" }}>
          {title}
        </h2>
      </div>
    </Grid>
  );
};

export default TravelArea;
