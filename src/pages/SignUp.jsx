import React from "react";
import SignUpForm from "../components/SignUpC/SignUpForm";
import SpotMeUpIcon from "../components/ToolsC/SpotMeUpIcon";

const SignUp = () => {
  return (
    <div className="signup-page">
      <h1 className="login-text">Sign Up</h1>
      <SpotMeUpIcon />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
