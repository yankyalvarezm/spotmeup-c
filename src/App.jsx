import "./App.css";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
// import SignUp from "./pages/SignUp";
// import LogIn from "./pages/LogIn";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Profile from "./pages/Profile";
// import MyEvents from "./pages/MyEvents";
// import AdminVenueDetail from "./pages/AdminVenueDetail";
// import DesignPage from "./pages/DesignPage";
// import DesignBreakDown from "./pages/DesignBreakDown";
// import BDTickets from "./components/BreakDown/BDTickets";
// import 'bootstrap/dist/css/bootstrap.min.css';


const SignUp = lazy(() => import("./pages/SignUp"));
const LogIn = lazy(() => import("./pages/LogIn"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const MyEvents = lazy(() => import("./pages/MyEvents"));
const AdminVenueDetail = lazy(() => import("./pages/AdminVenueDetail"));
const DesignPage = lazy(() => import("./pages/DesignPage"));
const DesignBreakDown = lazy(() => import("./pages/DesignBreakDown"));
const BDTickets = lazy(() => import("./components/BreakDown/BDTickets"));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route
          path="/admin/venuedetails/:venueIdParam"
          element={<AdminVenueDetail />}
        />
        <Route path="/admin/designpage/:layoutIdParam" element={<DesignPage />} />
        <Route
          path="/admin/designpage/:layoutIdParam/:blockIdParam"
          element={<DesignPage />}
        />
        <Route
          path="/admin/designpage/:layoutIdParam/breakdown"
          element={<DesignBreakDown />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;