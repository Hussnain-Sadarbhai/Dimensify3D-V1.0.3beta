import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './OnlineStoreLogin.css';
import logo from "../images/logo-1.png"

import logo2 from "../images/log.gif"

const OnlineStoreLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const correctPassword = process.env.REACT_APP_PASSWORD; // note updated env var name with REACT_APP_
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem("onlineStoreAccess", "true");
      navigate("/onlinestore");
    } else { 
      setError("Incorrect password, please try again.");
    }
  };

  return (<div className="body1">
                <header className="main">
                    <div className="container">
                        <div className="header-row">
                            {/* Logo and Brand */}
                            <div className="brand-container">
                                <div className="logo-wrapper">
                                   <img src={logo} alt="Dimensify3D Logo" className="brand-logo"/>
                                </div>
                                <div>
                                    <h1 className="brand-text">Dimensify3D</h1>
                                    <p className="brand-subtitle">3D Printing Solutions</p>
                                </div>
                            </div>
    
                           
                           
                        </div>
                    </div>
                </header>
                
    <form className="login-form" onSubmit={handleSubmit}>
  <div className="login-flex">
<img src={logo2} alt="Dimensify3D Logo" className="brand-logo2" />

<p className="centered-text">
  This Store is Password Protected. Please enter the password to view the Store. Contact Admin for more information:
</p>
</div>

        <div className="login-flex">
            <div className="login-rigtpanel">
      <label className="login-label">
        Enter Password:
        <input
        placeholder="Password"
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
     
      </label>
      <button className="login-button" type="submit">
        Enter
      </button>
      {error && <p className="login-error">{error}</p>}
      
      </div>
</div>

    </form>
    
    </div>

  );
};

export default OnlineStoreLogin;
