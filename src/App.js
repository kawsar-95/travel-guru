import React, { createContext, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Booking from "./components/Booking/Booking";
import Hotels from "./components/Hotels/Hotels";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Auth from "./components/Auth/Auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import News from "./components/News/News";
import Blog from "./components/Blog/Blog";
import Contacts from "./components/Contacts/Contacts";
import Destination from "./components/Destination/Destination";
import Error from "./Error/Error";
export const MyContext = createContext();
firebase.initializeApp(firebaseConfig);

function App() {
  const [showArea, setShowArea] = useState({
    id: 1,
    title: "Cox's Bazar",
    description:
      "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ....",
    img: "https://i.ibb.co/p1Fm5yD/coxsbazar.png",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("user");
  return (
    <MyContext.Provider
      value={[showArea, setShowArea, loggedIn, setLoggedIn, name, setName]}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="/booking">
            <Booking></Booking>
          </Route>

          <Route path="/auth">
            <Auth></Auth>
          </Route>

          <PrivateRoute path="/see-hotel">
            <Hotels></Hotels>
          </PrivateRoute>

          <Route path="/news">
            <News></News>
          </Route>

          <Route path="/blog">
            <Blog></Blog>
          </Route>

          <Route path="/contact">
            <Contacts></Contacts>
          </Route>

          <Route path="/destination">
            <Destination></Destination>
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
