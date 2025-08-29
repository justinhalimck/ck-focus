import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import { Dashboard } from "./pages/Dashboard.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import End from "./pages/End.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import { getMyProfile } from "./lib/api.js";

(async () => {
  let profile = await getMyProfile();
  localStorage.setItem('profile', profile);
})()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/work" element={<Work />} />
          <Route path="/end" element={<End />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </StrictMode>,
);
