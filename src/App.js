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

export const MyContext = createContext();
firebase.initializeApp(firebaseConfig);
function App() {
  const [showArea, setShowArea] = useState({
    id: 1,
    title: "Cox's Bazar",
    description:
      "Why Cox's Bazar is a Great Tourist Attraction Cox's Bazar Review. Cox's Bazar is famous for its long natural sandy sea beach. ... Cox's Bazar has the world's largest unbroken sea beach which stretches more than 120 km. The entire beach is a stretch of golden sandy sea beach which is reachable by motorbike.",
    img: "https://i.ibb.co/p1Fm5yD/coxsbazar.png",
  });

  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <MyContext.Provider value={[showArea, setShowArea, loggedIn, setLoggedIn]}>
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
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
