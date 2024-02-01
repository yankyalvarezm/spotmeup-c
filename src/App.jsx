import "./App.css";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<LogIn />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  )
}

export default App;
