import React, { useState, useEffect } from "react";
import "./login.styles.css";
import axios from "axios"; 
import { Navigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  let [registered, setRegistered] = useState("a");
  let [loggedin, setLoggedin] = useState("a");  
  
  let [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const login = (e) => {
    e.preventDefault();
    const data = { username, password };

    axios.post("http://localhost:5000/login", data)
     .then((response) => {
        if (response.status === 200) {
          setLoggedin("s");
          window.localStorage.setItem('token', response.data.token);
          setUserToken(response.data.token);
        }
        else setLoggedin("f");
      })
      .catch((e) => {
        console.log(e);
        setLoggedin("f");
      });
    
  }
    const register = (e) => {
    e.preventDefault();
    const data = { email, username, password };
    axios
      .post("http://localhost:5000/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setRegistered("s")
          window.localStorage.setItem('token', response.data.token);
          setUserToken(response.data.token);;
        }
        else setRegistered("f");
      })
      .catch((e) => {
        console.log(e);
        setRegistered("f");
      });
  };
  return (
    <div className="main">
      {userToken !== null && (<Navigate to="/memes"/>)}
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form>
          <label for="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="txt"
            placeholder="Username"
            required=""
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            required=""
          />
          <input
            type="password"
            name="pswd"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required=""
          />

          {registered === "s" && (
            <div className="green">Registered Succesfully!</div>
          )}
          {registered === "f" && (
            <div className="red">
              Registration Failed! Try different email and username
            </div>
          )}

          <button onClick={(e) => register(e)}>Sign up</button>
        </form>
      </div>

      <div className="login">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Username"
            required=""
          />
          <input
            type="password"
            name="pswd"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required=""
          />
          {loggedin === "f" && (
            <div className="red">Wrong username or password</div>
          )}
          {loggedin === 's' && (
            <Navigate to="/memes"/> 
            )}
         
          <button onClick={(e) => login(e)}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

