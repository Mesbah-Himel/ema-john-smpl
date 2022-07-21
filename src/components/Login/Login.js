import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import {
  handleGoogleSignIn,
  handleSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  initializeLoginFramework,
} from "./loginManager";
// import { createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [newUser, setNewuser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from.pathname || "/*";

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  // const googleSignIn = () => {
  //   handleGoogleSignIn().then((res) => {
  //     setUser(res);
  //     setLoggedInUser(res);
  //     navigate(from, { replace: true });
  //   });
  // };

  // const signOut = () => {
  //   handleSignOut().then((res) => {
  //     setUser(res);
  //     setLoggedInUser(res);
  //   });
  // };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      navigate.replace(from);
    }
  };

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  // const handleSubmit = (e) => {
  //   if (newUser && user.email && user.password) {
  //     // firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  //     createUserWithEmailAndPassword(user.name, user.email, user.password).then(
  //       (res) => {
  //         setUser(res);
  //         setLoggedInUser(res);
  //         navigate(from, { replace: true });
  //       }
  //     );
  //   }
  //   if (!newUser && user.email && user.password) {
  //     signInWithEmailAndPassword(user.email, user.password).then((res) => {
  //       setUser(res);
  //       setLoggedInUser(res);
  //       navigate(from, { replace: true });
  //     });
  //   }
  //   e.preventDefault();
  // };

  return (
    <div style={{textAlign: 'center'}}>
      { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewuser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;
