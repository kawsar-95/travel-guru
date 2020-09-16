import React, { createContext, useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Booking from "./components/Booking/Booking";

export const MyContext = createContext();
function App() {
  const [showArea, setShowArea] = useState({
    id: 1,
    title: "Cox's Bazar",
    description:
      "Why Cox's Bazar is a Great Tourist Attraction Cox's Bazar Review. Cox's Bazar is famous for its long natural sandy sea beach. ... Cox's Bazar has the world's largest unbroken sea beach which stretches more than 120 km. The entire beach is a stretch of golden sandy sea beach which is reachable by motorbike.",
    img: "https://i.ibb.co/p1Fm5yD/coxsbazar.png",
  });
  return (
    <MyContext.Provider value={[showArea, setShowArea]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="/booking">
            <Booking></Booking>
          </Route>
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
