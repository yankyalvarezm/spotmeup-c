import React from "react";
import { handleInputChange } from "../../services/tools.service";
import { signup } from "../../services/auth.service";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsloggedIn, isLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await signup(
        name,
        lastName,
        email,
        password,
        telephone,
        address,
        nationalId,
        setUser
      );

      console.log("response:", response);

      if (response.data.success) {
        setIsloggedIn(true);
        navigate("/");
        console.log("isLoggedIn:", isLoggedIn);
      }
    } catch (error) {
      console.log("Error completo:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Ocurrió un error inesperado.");
      }

      let timerId = setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUpSubmit} className="signup-form-container">
        <div className="signup-form">
          <input
            type="text"
            placeholder="Name"
            onChange={handleInputChange(setName)}
            value={name}
            className="signup-name"
            autoComplete="given-name"
          />

          <input
            type="text"
            placeholder="Last Name"
            onChange={handleInputChange(setLastName)}
            value={lastName}
            className="signup-lastname"
            autoComplete="family-name"
          />

          <input
            type="email"
            placeholder="e-mail"
            onChange={handleInputChange(setEmail)}
            value={email}
            className="signup-email"
            autoComplete="email"
          />

          <input
            type="telephone"
            placeholder="Phone Number"
            onChange={handleInputChange(setTelephone)}
            value={telephone}
            className="signup-telephone"
            autoComplete="telephone"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={handleInputChange(setPassword)}
            value={password}
            className="signup-password"
            autoComplete="off"
          />

          <input
            type="text"
            placeholder="Address"
            onChange={handleInputChange(setAddress)}
            value={address}
            className="signup-address"
            autoComplete="address"
          />

          <input
            type="text"
            placeholder="nationalId"
            onChange={handleInputChange(setNationalId)}
            value={nationalId}
            className="signup-nationalId"
            autoComplete="id"
          />

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </div>
      </form>

      <div className="icons-tabs-container">
        <div className="icon-minimize"></div>
        <div className="icon-maximize"></div>
        <div className="icon-close"></div>
      </div>

      {message && <h1>{message}</h1>}
    </>
  );
};

export default SignUpForm;
