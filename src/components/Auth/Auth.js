/* eslint-disable no-unused-vars */
import { FormGroup } from "@material-ui/core";
import React, { useContext, useState } from "react";
import "./Auth.css";
import Banner from "../Banner/Banner";
import logoBlack from "../../Images/Logo.png";
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

  const [signedUp, setSignedUp] = useState(false);
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
            .then((res) => {
              setConfirmationError(false);
              setUser({ ...user, signUpError: "" });
              setSignedUp(true);
            })
            .catch((err) => {
              setUser({ ...user, signUpError: err.message });
            })
        : setConfirmationError(true);
    }

    submitter === "signIn" &&
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const currentUser = firebase.auth().currentUser;
          setName(currentUser.displayName);
          setLoggedIn(true);
          history.replace(location || "/");
        })
        .catch((err) => {
          setUser({ ...user, signInError: err.message });
        });
  };

  const facebookSignInHandler = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const currentUser = firebase.auth().currentUser;
        setName(currentUser.displayName);
        setLoggedIn(true);
        history.replace(location || "/");
      })
      .catch((err) => {
        setUser({ ...user, signInError: err.message });
      });
  };

  const googleSignInHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const currentUser = firebase.auth().currentUser;
        setName(currentUser.displayName);
        setLoggedIn(true);
        history.replace(location || "/");
      })
      .catch((err) => {
        setUser({ ...user, signInError: err.message });
      });
  };

  const loginToggleHandler = () => {
    setSignedUp(true);
    setConfirmationError(false);

    setUser({ ...user, signUpError: "" });
  };
  const signUpToggleHandler = () => {
    setSignedUp(false);
    setUser({ ...user, signInError: "" });
  };

  return (
    <div>
      <Banner color="black" img={logoBlack}></Banner>

      <form onSubmit={formHandler} className="form-group auth-form-group">
        <FormGroup>
          {signedUp ? (
            <h2 style={{ textAlign: "left" }}>Login</h2>
          ) : (
            <h2 style={{ textAlign: "left" }}>Create an account</h2>
          )}
          {!signedUp && (
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

          {!signedUp && (
            <input
              onBlur={(event) =>
                setUser({ ...user, confirmationPassword: event.target.value })
              }
              type="password"
              placeholder="Confirm Password"
              required
            />
          )}

          {signedUp && (
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
          {user.signUpError ? (
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
          {signedUp ? (
            <input
              name="signIn"
              onClick={(event) => setSubmitter(event.target.name)}
              type="submit"
              value="signIn"
            />
          ) : (
            <input
              name="signUp"
              onClick={(event) => setSubmitter(event.target.name)}
              type="submit"
              value="signUp"
            />
          )}
        </FormGroup>

        {signedUp ? (
          <>
            <span>Don't have an account? </span>
            <span
              onClick={signUpToggleHandler}
              style={{ color: "orange", cursor: "pointer" }}
            >
              signUp
            </span>
          </>
        ) : (
          <>
            <span>Already have an account? </span>
            <span
              onClick={loginToggleHandler}
              style={{ color: "orange", cursor: "pointer" }}
            >
              Login
            </span>
          </>
        )}
      </form>

      <div style={{ width: "300px", margin: "auto" }}>
        <p style={{ textAlign: "center" }}>---------- Or -----------</p>

        <div onClick={facebookSignInHandler} className="auth-provider-section">
          <img
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
            src={fb}
            alt=""
          />
          <p>Continue with Facebook</p>
        </div>

        <div onClick={googleSignInHandler} className="auth-provider-section">
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
