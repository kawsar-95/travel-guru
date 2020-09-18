/* eslint-disable no-unused-vars */
import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/Icon/Logo.png";
import "./Banner.css";
import { MyContext } from "../../App";

const Banner = (props) => {
  const [showArea, setShowArea, loggedIn, setLoggedIn, name] = useContext(
    MyContext
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: `${props.color}`,
        height: "50px",
      }}
    >
      <div>
        <Link to="/">
          <img style={{ height: "40px" }} src={props.img || logo} alt="" />
        </Link>
      </div>

      <div
        className="header-right"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link
          style={{ textDecoration: "none", color: `${props.color}` }}
          to="/news"
        >
          <p>News</p>
        </Link>

        <Link
          style={{ textDecoration: "none", color: `${props.color}` }}
          to="/destination"
        >
          <p>Destination</p>
        </Link>

        <Link
          style={{ textDecoration: "none", color: `${props.color}` }}
          to="/blog"
        >
          <p>Blog</p>
        </Link>

        <Link
          style={{ textDecoration: "none", color: `${props.color}` }}
          to="/contacts"
        >
          <p>Contacts</p>
        </Link>

        {loggedIn ? (
          <h4>
            <span style={{ color: "orange" }}>||</span> Hello,{name}
          </h4>
        ) : (
          <>
            <Link style={{ textDecoration: "none", color: "white" }} to="/auth">
              <Button
                size="small"
                style={{ background: "orange", color: "white" }}
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
