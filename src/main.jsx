import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context.jsx";
import { GoogleMapsProvider } from "./context/GoogleMapsContext.jsx";
import { MyEventsProvider } from "./context/MyEvents.context.jsx";
import { VenuesProvider } from "./context/venues.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleMapsProvider>
          <MyEventsProvider>
            <VenuesProvider>
              <App />
            </VenuesProvider>
          </MyEventsProvider>
        </GoogleMapsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
