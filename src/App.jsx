import "./App.css";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import MyEvents from "./pages/MyEvents";
import AdminVenueDetail from "./pages/AdminVenueDetail";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/login" element={<LogIn />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/myevents" element={<MyEvents />}/>
      <Route path="/admin/venuedetails/:venueIdParam" element={<AdminVenueDetail />}/>
    </Routes>
  )
}

export default App;
