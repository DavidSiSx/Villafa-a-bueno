"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LandingStyles.css"

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to trigger the entrance animation after component mounts
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)
  }, [])

  return (
    <div className={`invitation-container ${isLoaded ? "loaded" : ""}`}>
      <div className="invitation-card">
        <div className="card-decoration top-left"></div>
        <div className="card-decoration top-right"></div>
        <div className="card-decoration bottom-left"></div>
        <div className="card-decoration bottom-right"></div>

        <div className="invitation-content">
          <div className="invitation-header">
            <div className="ornament left"></div>
            <h2 className="pre-title">Te invito a mi</h2>
            <div className="ornament right"></div>
          </div>

          <h1 className="main-title">Fiesta de 15 años</h1>
          <div className="name-container">
            <h2 className="name">Zoe Samira</h2>
          </div>

          <div className="divider"></div>

          <div className="details">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span className="detail-text">Sábado 22 de Septiembre, 2026</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🕗</span>
              <span className="detail-text">20:00 horas</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span className="detail-text">Salón de Eventos "El Dorado"</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🗺️</span>
              <span className="detail-text">Av. Libertad 1500, Ciudad</span>
            </div>
          </div>

          <p className="invitation-message">
            Te invitamos a celebrar una noche mágica llena de música, baile y recuerdos inolvidables.
          </p>

          <button className="confirm-button" onClick={() => navigate("/buscar")}>
            Confirmar Asistencia
          </button>

          <p className="dress-code">Código de vestimenta: Formal elegante</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

