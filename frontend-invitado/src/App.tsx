import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Busqueda from "./components/Busqueda";
import Confirmacion from "./components/Confirmacion";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/buscar" element={<Busqueda />} />
        <Route path="/confirmacion/:id" element={<Confirmacion />} />
      </Routes>
    </Router>
  );
};

export default App;
