import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urban">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
);
