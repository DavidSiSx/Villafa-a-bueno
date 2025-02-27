import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

interface Invitado {
  id: number;
  nombre: string;
}

const Busqueda: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState<Invitado[]>([]);
  const navigate = useNavigate();

  const buscarInvitado = async () => {
    if (!nombre.trim()) {
      alert("Ingresa un nombre para buscar.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3002/invitados?nombre=${encodeURIComponent(nombre)}`
      );
      const data = await response.json();
      setResultados(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al buscar invitado:", error);
    }
  };

  return (
    <div className="container fade-in center">
      <h2>Búsqueda de Invitado</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa tu nombre"
        />
        <button onClick={buscarInvitado}>
          <FaSearch /> Buscar
        </button>
      </div>
      <ul className="resultado">
        {resultados.map((invitado, index) => (
          <li
            key={invitado.id}
            className="slide-in-left"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/confirmacion/${invitado.id}`)}
          >
            {invitado.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Busqueda;
