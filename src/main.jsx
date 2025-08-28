import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import End from "./pages/End.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/work" element={<Work />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
