import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context.jsx";
import { GoogleMapsProvider } from "./context/GoogleMapsContext.jsx";
import { MyEventsProvider } from "./context/myEvents.context.jsx";
import { VenuesProvider } from "./context/venues.context.jsx";
import { LayoutProvider } from "./context/layout.context.jsx";
import { ShapeProvider } from "./context/shape.context.jsx";
import { BlockProvider } from "./context/block.context.jsx";
import { TableProvider } from "./context/table.context.jsx";
import { BreakDownProvider } from "./context/breakdown.context.jsx";
import { TicketsProvider } from "./context/tickets.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleMapsProvider>
          <MyEventsProvider>
            <TicketsProvider>
              <VenuesProvider>
                <LayoutProvider>
                  <BreakDownProvider>
                    <ShapeProvider>
                      <BlockProvider>
                        <TableProvider>
                          <App />
                        </TableProvider>
                      </BlockProvider>
                    </ShapeProvider>
                  </BreakDownProvider>
                </LayoutProvider>
              </VenuesProvider>
            </TicketsProvider>
          </MyEventsProvider>
        </GoogleMapsProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
