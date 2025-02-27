// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import InvitadoDetalles from "./components/InvitadoDetalles";
import PerfilInvitado from "./components/PerfilInvitado";
// Opcional: Si deseas estilos globales en este archivo
import "./App.css"; // o "./styles.css", según prefieras

function App() {
  return (
    <Router>
      <Routes>
        {/* Vista principal (Dashboard) */}
        <Route path="/" element={<Dashboard />} />

        {/* Vista de detalles de un invitado */}
        <Route path="/detalles/:id" element={<InvitadoDetalles />} />

        {/* Vista de perfil editable de un invitado */}
        <Route path="/perfil/:id" element={<PerfilInvitado />} />
      </Routes>
    </Router>
  );
}

export default App;
