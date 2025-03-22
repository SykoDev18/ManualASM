import React, { useState } from "react";
import "./Cookie.css";

function CookiePopup() {
  // Estado para mostrar/ocultar la ventana emergente
  const [isOpen, setIsOpen] = useState(true);

  // Ejemplo simple de cómo cerrar el popup
  const handleClose = () => {
    setIsOpen(false);
    // Aquí podrías guardar la elección en localStorage o cookies
  };

  // Aceptar todas las cookies (ejemplo)
  const handleAcceptAll = () => {
    // Lógica para aceptar o guardar preferencia
    setIsOpen(false);
  };

  // Abrir opciones de configuración (ejemplo)
  const handleManageSettings = () => {
    alert("Aquí podrías mostrar opciones de configuración de cookies");
  };

  if (!isOpen) {
    return null; // No se muestra nada si está cerrado
  }

  return (
    <div className="cookie-popup__overlay">
      <div className="cookie-popup__container">
        <div className="cookie-popup__header">Cookie Settings</div>

        <div className="cookie-popup__section">
          <p>
            Our website uses some cookies and records your IP address for the
            purposes of accessibility, security, and managing your access to the
            telecommunication network. You can disable data collection and
            cookies by changing your browser settings, but it may affect how
            this website functions. <a href="#">Learn more.</a>
          </p>
        </div>

        <div className="cookie-popup__section">
          <p>
            With your consent, we may also use cookies and your IP address to
            collect individual statistics and provide you with personalized
            offers and ads subject to the <a href="#">Privacy Notice</a> and the{" "}
            <a href="#">Terms of Use</a>. We may use <a href="#">third-party services</a> 
            for this purpose. You can adjust or withdraw your consent at any time 
            by visiting the <a href="#">Opt-Out page</a>.
          </p>
        </div>

        <div className="cookie-popup__buttons">
          <button className="cookie-popup__btn accept-btn" onClick={handleAcceptAll}>
            Accept All
          </button>
          <button className="cookie-popup__btn manage-btn" onClick={handleManageSettings}>
            Manage Settings
          </button>
          <button className="cookie-popup__btn close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookiePopup;
