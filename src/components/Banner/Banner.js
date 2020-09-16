import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/Logo.png";
import "./Banner.css";

const Banner = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        justifyContent: "space-around",
        color: `${props.color}`,
      }}
    >
      <Link to="/">
        <img style={{ height: "60px" }} src={props.img || logo} alt="" />
      </Link>
      <input
        className="input-style"
        style={{ height: "25px" }}
        type="text"
        placeholder="search your destination"
      />
      <b>News</b>
      <b>Destination</b>
      <b>Blog</b>
      <b>Contact</b>
      <Button size="small" style={{ background: "orange", color: "white" }}>
        Login
      </Button>
    </div>
  );
};

export default Banner;
