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
import Contact from "./components/Contacts/Contacts";
import Destination from "./components/Destination/Destination";
import Error from "./Error/Error";
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
            <Contact></Contact>
          </Route>

          <Route path="/destination"></Route>
          <Destination></Destination>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
