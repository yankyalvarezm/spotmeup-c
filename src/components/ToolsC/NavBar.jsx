import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SpotMeUpIcon from "./SpotMeUpIcon";
import { AuthContext } from "../../context/auth.context";

const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="navbar-container">
      <div className="navbar-subcontainer">
        <div className="nav-img-container">
          <Link to={isLoggedIn ? "/" : "signup"} className="navlink-signup">
            <div className="nav-user-img"></div>
            <h1 className="login-signup-navtext">
              {isLoggedIn ? "Log Out" : "Log In or Sign Up"}
            </h1>
          </Link>
        </div>

        <div>
          <Link to="/" className="navlink">
            Home
          </Link>
        </div>

        <div>
          <Link to="/profile" className="navlink">
            Profile
          </Link>
        </div>

        <div>
          <Link to="/" className="navlink">
            Places
          </Link>
        </div>

        <div>
          <Link to="/myevents" className="navlink">
            My Events
          </Link>
        </div>

        <div>
          <Link to="/about" className="navlink">
            About Us
          </Link>
        </div>
      </div>
      <div className="nav-spotmeupicon">
        <SpotMeUpIcon />
      </div>
    </nav>
  );
};

export default NavBar;
