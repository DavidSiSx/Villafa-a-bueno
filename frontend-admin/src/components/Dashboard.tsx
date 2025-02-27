import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaUserPlus, FaTrash } from "react-icons/fa";

interface Invitado {
  id: number;
  nombre: string;
  numero: string;
  numPersonas: number;
  confirmado: boolean;
  codigo: string;
}

const Dashboard: React.FC = () => {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    numero: "",
    numPersonas: 1,
    codigo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchInvitados();
  }, []);

  // Obtiene la lista de invitados desde el backend
  const fetchInvitados = async () => {
    try {
      const response = await fetch("http://localhost:3002/invitados");
      const data = await response.json();
      if (Array.isArray(data)) {
        setInvitados(data);
      } else {
        setInvitados([]);
      }
    } catch (error) {
      console.error("Error al obtener invitados:", error);
    }
  };

  // Maneja el cambio en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agrega un nuevo invitado
  const agregarInvitado = async () => {
    try {
      const response = await fetch("http://localhost:3002/invitados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          numero: formData.numero,
          numPersonas: Number(formData.numPersonas),
          codigo: formData.codigo,
        }),
      });

      if (response.ok) {
        alert("Invitado agregado correctamente.");
        setFormData({ nombre: "", numero: "", numPersonas: 1, codigo: "" });
        fetchInvitados(); // Refresca la lista
      } else {
        alert("Error al agregar invitado.");
      }
    } catch (error) {
      console.error("Error al agregar invitado:", error);
    }
  };

  // Elimina un invitado por su ID
  const eliminarInvitado = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este invitado?")) {
      try {
        const response = await fetch(`http://localhost:3002/invitados/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Invitado eliminado correctamente.");
          fetchInvitados(); // Refresca la lista
        } else {
          alert("Error al eliminar invitado.");
        }
      } catch (error) {
        console.error("Error al eliminar invitado:", error);
      }
    }
  };

  return (
    <div className="container fade-in">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
      </div>

      <div className="form-container">
        <h3>
          <FaUserPlus style={{ marginRight: "0.5rem" }} />
          Agregar Nuevo Invitado
        </h3>
        <div className="input-group">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del invitado"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="numero"
            placeholder="Número de teléfono"
            value={formData.numero}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="numPersonas"
            placeholder="Número de cupos"
            value={formData.numPersonas}
            onChange={handleChange}
          />
          <input
            type="text"
            name="codigo"
            placeholder="Código de autenticación"
            value={formData.codigo}
            onChange={handleChange}
          />
        </div>
        <button onClick={agregarInvitado}>Agregar Invitado</button>
      </div>

      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        Lista de Invitados
      </h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Cupos</th>
              <th>Confirmado</th>
              <th>Código</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invitados.length > 0 ? (
              invitados.map((inv, index) => (
                <tr
                  key={inv.id}
                  className="slide-in-left-table"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td>{inv.id}</td>
                  <td>{inv.nombre}</td>
                  <td>{inv.numero}</td>
                  <td>{inv.numPersonas}</td>
                  <td>{inv.confirmado ? "✅" : "❌"}</td>
                  <td>{inv.codigo}</td>
                  <td style={{ textAlign: "center" }}>
                    {/* Icono para ver el perfil del invitado */}
                    <button
                      className="icon-btn"
                      onClick={() => navigate(`/detalles/${inv.id}`)}
                    >
                      <FaEye />
                    </button>
                    {/* Icono para eliminar el invitado */}
                    <button
                      className="icon-btn icon-trash"
                      onClick={() => eliminarInvitado(inv.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No hay invitados disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
