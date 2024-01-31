import React from "react";
import { handleInputChange } from "../../services/tools.service";
import { login } from "../../services/auth.service";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password, setUser);

      if (response.success) {
        setIsLoggedIn(true);
        console.log("setIsLoggedIn:", isLoggedIn);
        navigate("/");
      }
    } catch (error) {
      console.log("Unable to login:", error);

      if (error.response.data.message) {
        setMessage(error.response.data.message);
      }

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleLogInSubmit} className="login-form-container">
      <div className="login-form-smaller-container">
        <input
          type="email"
          placeholder="e-mail"
          onChange={handleInputChange(setEmail)}
          value={email}
          className="login-email"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={handleInputChange(setPassword)}
          value={password}
          className="signup-password"
        />
        <p className="forgot-password">Forgot Password?</p>

        <button type="submit" className="login-btn">
          Enter
        </button>

        <p className="signup-prompt">
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </p>

        {message && <p className="login-errormsg">{message}</p>}

        <div className="spotMeUpIcon"></div>

        <h1 className="login-text">LOG IN</h1>
        <div className="bubble-light"></div>
      </div>
    </form>
  );
};

export default LogInForm;
