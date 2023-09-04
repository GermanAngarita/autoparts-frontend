import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import logo_imagen from "./logo.jpg";
import User from "./user.png";
import carro from "./autoTFM.jpg"



export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password, name);

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setUsername("");
        setPassword("");
        setName("");
        goTo("/");
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="contenedor">
      <div className="Header" >
        <img src={logo_imagen} className="logo img-fluid"/>
        <img src={User} className="user img-fluid"/>
      </div>
      <div className="login_body">        
          <div className="login-wrap">
          <div className="login-html">
          <form onSubmit={handleSubmit} className="login-form">
            <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
            <label htmlFor="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" />
            <label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
              <div className="sign-in-htm">
                <div className="group">
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                  <label htmlFor="user" className="label">Username</label>
                  <input id="user" type="text" className="input" />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input id="pass" type="password" className="input" data-type="password" 
                  />
                </div>
                {/* <div className="group">
                  <input id="check" type="checkbox" className="check" defaultChecked />
                  <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
                </div> */}
                <div className="group">
                  <input type="submit" className="button" value="Sign In" />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <a href="#forgot">Forgot Password?</a>
                </div>
              </div>
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Name</label>
                  <input id="user" type="text" className="input" 
                  onChange={(e) => setName(e.target.value)}
                  value={name}/>
                </div>
                <div className="group">
                <label htmlFor="user" className="label">Username</label>
                  <input id="user" type="text" className="input" 
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}/>
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input id="pass" type="password" className="input" data-type="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}/>
                </div>
                {/* <div className="group">
                  <label htmlFor="pass" className="label">Email Address</label>
                  <input id="pass" type="text" className="input" />
                </div> */}
                <div className="group">
                  <input type="submit" className="button" value="Sign Up" />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <label htmlFor="tab-1">Already Member?</label>
                </div>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
      
    
      
    
  );

}
