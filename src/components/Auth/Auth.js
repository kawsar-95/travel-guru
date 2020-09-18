/* eslint-disable no-unused-vars */
import { FormGroup } from "@material-ui/core";
import React, { useContext, useState } from "react";
import "./Auth.css";
import Banner from "../Banner/Banner";
import logoBlack from "../../Images/Icon/Logo.png";
import fb from "../../Images/Icon/fb.png";
import google from "../../Images/Icon/google.png";
import * as firebase from "firebase/app";
import { MyContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

const Auth = () => {
  const [
    showArea,
    setShowArea,
    loggedIn,
    setLoggedIn,
    name,
    setName,
  ] = useContext(MyContext);

  const [confirmationError, setConfirmationError] = useState(false);
  const [isSignedUp, setSignedUp] = useState(false);
  const [submitter, setSubmitter] = useState("");
  const [user, setUser] = useState({});
  const location = useLocation().location?.pathname;
  const history = useHistory();

  const formHandler = (event) => {
    event.preventDefault();

    if (submitter === "signUp") {
      user.password === user.confirmationPassword
        ? firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((response) => {
              setConfirmationError(false);
              setUser({ ...user, signupError: "" });
              setSignedUp(true);

              const currentUser = firebase.auth().currentUser;
              currentUser.updateProfile({
                displayName: `${user.fname} ${user.lname}`,
              });
            })
            .catch((error) => {
              setUser({ ...user, signupError: error.message });
            })
        : setConfirmationError(true);
    }

    submitter === "signIn" &&
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((response) => {
          const currentUser = firebase.auth().currentUser;
          setName(currentUser.displayName);
          setLoggedIn(true);
          history.replace(location || "/");
        })
        .catch((error) => {
          setUser({ ...user, signInError: error.message });
        });
  };

  const facebookSignInHandler = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        const currentUser = firebase.auth().currentUser;
        setName(currentUser.displayName);
        setLoggedIn(true);
        history.replace(location || "/");
      })
      .catch((error) => {
        setUser({ ...user, signInError: error.message });
      });
  };

  const googleSignInHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        const currentUser = firebase.auth().currentUser;
        setName(currentUser.displayName);
        setLoggedIn(true);
        history.replace(location || "/");
      })
      .catch((error) => {
        setUser({ ...user, signInError: error.message });
      });
  };

  const loginToggleHandler = () => {
    setSignedUp(true);
    setConfirmationError(false);
    setUser({ ...user, signUpError: "" });
  };

  const signupToggleHandler = () => {
    setSignedUp(false);
    setUser({ ...user, signInError: "" });
  };

  return (
    <div>
      <Banner color="black" img={logoBlack}></Banner>

      <form onSubmit={formHandler} className="form-group auth-form-group">
        <FormGroup>
          {isSignedUp ? (
            <h2 style={{ textAlign: "left" }}>Login</h2>
          ) : (
            <h2 style={{ textAlign: "left" }}>Create an account</h2>
          )}

          {!isSignedUp && (
            <>
              <input
                onBlur={(event) =>
                  setUser({ ...user, fname: event.target.value })
                }
                type="text"
                placeholder="First name"
                required
              />
              <input
                onBlur={(event) =>
                  setUser({ ...user, lname: event.target.value })
                }
                type="text"
                placeholder="Last name"
                required
              />
            </>
          )}

          <input
            onBlur={(event) => setUser({ ...user, email: event.target.value })}
            type="email"
            placeholder="Email address"
            required
          />

          <input
            onBlur={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            type="password"
            placeholder="Password"
            required
          />
          {!isSignedUp && (
            <input
              onBlur={(event) =>
                setUser({ ...user, confirmationPassword: event.target.value })
              }
              type="password"
              placeholder="Confirm Password"
              required
            />
          )}

          {isSignedUp && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input id="checkbox" type="Checkbox" />
                <label for="checkbox" style={{ marginBottom: "6px" }}>
                  Remember me
                </label>
              </div>
              <p style={{ color: "orange", cursor: "pointer" }}>
                Forgot Password
              </p>
            </div>
          )}

          {user.signInError ? (
            <p style={{ color: "red", fontSize: "13px" }}>{user.signInError}</p>
          ) : (
            ""
          )}
          {user.signupError ? (
            <p style={{ color: "red", fontSize: "13px" }}>{user.signUpError}</p>
          ) : (
            ""
          )}
          {confirmationError ? (
            <p style={{ color: "red", fontSize: "13px" }}>
              Doesn't match your password
            </p>
          ) : (
            ""
          )}
          {isSignedUp ? (
            <input
              name="SignIn"
              type="submit"
              value="SignIn"
              onClick={(event) => setSubmitter(event.target.name)}
            />
          ) : (
            <input
              name="SignUp"
              type="submit"
              value="SignUp"
              onClick={(event) => setSubmitter(event.target.name)}
            />
          )}
        </FormGroup>
        {isSignedUp ? (
          <>
            <span>Don't have an account? </span>
            <span
              onClick={signupToggleHandler}
              style={{ color: "orange", cursor: "pointer" }}
            >
              SignUp
            </span>
          </>
        ) : (
          <>
            <span>Already have an account? </span>
            <span
              onClick={loginToggleHandler}
              style={{ color: "orange", cursor: "pointer" }}
            >
              LogIn
            </span>
          </>
        )}
      </form>

      <div style={{ width: "300px", margin: "auto" }}>
        <p style={{ textAlign: "center" }}>---------- Or -----------</p>

        <div
          onClick={facebookSignInHandler}
          style={{ cursor: "pointer" }}
          className="auth-provider-section"
        >
          <img
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
            src={fb}
            alt=""
          />
          <p>Continue with Facebook</p>
        </div>
        <div
          onClick={googleSignInHandler}
          style={{ cursor: "pointer" }}
          className="auth-provider-section"
        >
          <img
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
            src={google}
            alt=""
          />
          <p>Continue with Google</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
