import React from "react";
import { handleInputChange } from "../../services/tools.service";
import { login } from "../../services/auth.service";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password, setUser);

      if (response.success) {
        setIsLoggedIn(true);
        navigate("/");
        console.log("setIsLoggedIn:", isLoggedIn);
      }
    } catch (error) {
      console.log("Unable to login:", error);
    }
  };

  return (
    <form onSubmit={handleLogInSubmit}>
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

      <button type="submit" className="login-btn">
        Enter
      </button>
    </form>
  );
};

export default LogInForm;
