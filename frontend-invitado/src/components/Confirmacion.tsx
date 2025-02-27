import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUserPlus, FaTrash } from "react-icons/fa";

interface Invitado {
  id: number;
  nombre: string;
  numero: string;
  numPersonas: number;
  confirmado: boolean;
  codigo: string;
  acompanantes?: string[];
}

const Confirmacion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invitado, setInvitado] = useState<Invitado | null>(null);
  const [codigo, setCodigo] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [extras, setExtras] = useState<string[]>([]);
  const [nuevoAcompanante, setNuevoAcompanante] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3002/invitados/${id}`)
      .then((res) => res.json())
      .then((data) => setInvitado(data))
      .catch((error) =>
        console.error("Error al obtener los datos del invitado:", error)
      );
  }, [id]);

  const verificarCodigo = () => {
    if (!invitado) return;
    if (codigo.trim() === invitado.codigo.trim()) {
      setAutenticado(true);
    } else {
      alert("Código incorrecto.");
    }
  };

  const agregarAcompanante = () => {
    if (!invitado) return;
    if (!nuevoAcompanante.trim()) {
      alert("Ingresa el nombre de un acompañante.");
      return;
    }
    if (extras.length >= invitado.numPersonas - 1) {
      alert(`Solo puedes agregar hasta ${invitado.numPersonas - 1} acompañantes.`);
      return;
    }
    setExtras([...extras, nuevoAcompanante.trim()]);
    setNuevoAcompanante("");
  };

  const eliminarAcompanante = (index: number) => {
    const nuevosExtras = extras.filter((_, i) => i !== index);
    setExtras(nuevosExtras);
  };

  const confirmarAsistencia = async () => {
    if (!invitado) return;
    try {
      const response = await fetch(`http://localhost:3002/invitados/${invitado.id}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, extras }),
      });
      if (response.ok) {
        alert("Confirmación exitosa.");
      } else {
        const result = await response.json();
        alert(result.message || "Error al confirmar.");
      }
    } catch (error) {
      console.error("Error al confirmar la asistencia:", error);
      alert("Ocurrió un error al confirmar la asistencia.");
    }
  };

  return (
    <div className="container fade-in center confirm-container">
      {!invitado ? (
        <p>Cargando datos del invitado...</p>
      ) : !autenticado ? (
        <>
          <h2>Verificación de Asistencia</h2>
          <p>Ingresa tu código de invitación para proceder</p>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código de invitación"
          />
          <button onClick={verificarCodigo}>Verificar</button>
        </>
      ) : (
        <>
          <h2>Confirmar Asistencia</h2>
          <div className="card-info">
            <p>
              <strong>Nombre:</strong> {invitado.nombre}
            </p>
            <p>
              <strong>Teléfono:</strong> {invitado.numero}
            </p>
            <p>
              <strong>Cupos Totales:</strong> {invitado.numPersonas}{" "}
              <span>(Tú + {invitado.numPersonas - 1} acompañantes)</span>
            </p>
          </div>

          <div className="accompaniment-section">
            <h3>Agregar Acompañantes</h3>
            <div className="input-group">
              <input
                type="text"
                value={nuevoAcompanante}
                onChange={(e) => setNuevoAcompanante(e.target.value)}
                placeholder="Nombre del acompañante"
                disabled={extras.length >= invitado.numPersonas - 1}
              />
              <button
                onClick={agregarAcompanante}
                disabled={extras.length >= invitado.numPersonas - 1}
              >
                <FaUserPlus /> Agregar
              </button>
            </div>
            {extras.length > 0 && (
              <ul className="accompaniment-list">
                {extras.map((nombre, index) => (
                  <li key={index}>
                    {nombre}
                    <button
                      className="icon-btn"
                      onClick={() => eliminarAcompanante(index)}
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={confirmarAsistencia}>Confirmar Asistencia</button>
        </>
      )}
    </div>
  );
};

export default Confirmacion;
