import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

interface Invitado {
  id: number;
  nombre: string;
  numero: string;
  numPersonas: number;
  confirmado: boolean;
  acompanantes: string[];
}

const PerfilInvitado: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invitado, setInvitado] = useState<Invitado | null>(null);

  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [numPersonas, setNumPersonas] = useState(1);
  const [confirmado, setConfirmado] = useState(false);
  const [acompanantes, setAcompanantes] = useState<string[]>([]);
  const [nuevoAcompanante, setNuevoAcompanante] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3002/invitados/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInvitado(data);
        setNombre(data.nombre);
        setNumero(data.numero);
        setNumPersonas(data.numPersonas);
        setConfirmado(data.confirmado);
        setAcompanantes(data.acompanantes || []);
      })
      .catch((error) => console.error("Error al obtener invitado:", error));
  }, [id]);

  const agregarAcompanante = () => {
    if (!nuevoAcompanante.trim()) {
      alert("Ingresa un nombre de acompañante.");
      return;
    }
    setAcompanantes([...acompanantes, nuevoAcompanante.trim()]);
    setNuevoAcompanante("");
  };

  const eliminarAcompanante = (index: number) => {
    const nuevos = [...acompanantes];
    nuevos.splice(index, 1);
    setAcompanantes(nuevos);
  };

  const actualizarInvitado = async () => {
    if (!invitado) return;
    try {
      const response = await fetch(`http://localhost:3002/invitados/${invitado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          numero,
          numPersonas,
          confirmado,
          acompanantes,
        }),
      });
      if (response.ok) {
        alert("Datos actualizados correctamente.");
      } else {
        alert("Error al actualizar.");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Ocurrió un error al actualizar.");
    }
  };

  return (
    <div className="container fade-in">
      {!invitado ? (
        <p>Cargando datos del invitado...</p>
      ) : (
        <>
          <h2>Perfil del Invitado #{invitado.id}</h2>
          <div className="input-group" style={{ marginBottom: "1rem" }}>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-group" style={{ marginBottom: "1rem" }}>
            <label>Teléfono:</label>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <div className="input-group" style={{ marginBottom: "1rem" }}>
            <label>Cupos Totales:</label>
            <input
              type="number"
              value={numPersonas}
              onChange={(e) => setNumPersonas(Number(e.target.value))}
            />
          </div>
          <div className="input-group" style={{ marginBottom: "1rem" }}>
            <label>Confirmado:</label>
            <input
              type="checkbox"
              checked={confirmado}
              onChange={(e) => setConfirmado(e.target.checked)}
            />
          </div>
          <h3>Acompañantes</h3>
          <ul className="accompaniment-list">
            {acompanantes.map((ac, index) => (
              <li key={index}>
                {ac}
                <button
                  className="icon-btn"
                  onClick={() => eliminarAcompanante(index)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="input-group" style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              value={nuevoAcompanante}
              onChange={(e) => setNuevoAcompanante(e.target.value)}
              placeholder="Nuevo acompañante"
            />
            <button onClick={agregarAcompanante}>Agregar</button>
          </div>
          <button onClick={actualizarInvitado}>Actualizar</button>
        </>
      )}
    </div>
  );
};

export default PerfilInvitado;
