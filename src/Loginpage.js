import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ROUTE_ENDPOINTS } from "./RouterEndpoints";

const LoginPage = ({ onUserLoggedIn }) => {
  const classes = {
    LoginForm: "LoginPage_LoginForm__3_wtJ",
    InputField: "LoginPage_InputField__2lu1x",
    Button: "LoginPage_Button__qkLR7",
  };
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const onLoginClick = (e) => {
  //   e.preventDefault();
  //   if (username !== password) {
  //     alert("Please Enter Valid Credentials" + " " + username + " " + password);
  //   } else {
  //     Axios.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login", {
  //       username,
  //       password,
  //     })
  //       .then((res) => {
  //         alert("Login Successful!");
  //         localStorage.setItem("isLoggedIn", true);
  //         onUserLoggedIn();
  //         navigate("/");
  //       })
  //       .catch((error) => {
  //         console.error("Login Error:", error);
  //       });
  //   }
  // };
  const onLoginClick = (e) => {
    e.preventDefault();
    if (username !== password) {
      alert("Please Enter Valid Credentials");
    } else {
      Axios.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login", {
        username,
        password,
      })
        .then((res) => {
          alert("Login Successful!");
          localStorage.setItem("isLoggedIn", "true");
          onUserLoggedIn();
          navigate("/", { replace: true }); // Redirect to "/" after successful login
        })
        .catch((error) => {
          console.error("Login Error:", error);
        });
    }
  };

  return (
    <div className={classes.PageContainer}>
      <form className={classes.LoginForm} onSubmit={onLoginClick}>
        <h1>Sign In</h1>
        <input
          className={classes.InputField}
          type="text"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={classes.InputField}
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className={classes.Button} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
