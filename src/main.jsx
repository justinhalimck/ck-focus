import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import CountdownTimer from "./components/CountdownTimer.jsx";
import Start from "./components/Start.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/dashboard" element={<App />} />
        <Route
          path="/timer"
          element={
            <CountdownTimer
              code="000000"
              name="Example Project"
              duration={10}
              onComplete={() => console.log("Complete.")}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
