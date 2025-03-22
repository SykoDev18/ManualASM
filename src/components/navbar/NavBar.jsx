import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="nasm-navbar">
      {/* Logo e ícono a la izquierda */}
      <div className="nasm-navbar__brand">
        <span className="nasm-logo">&#9650;</span>
        <span className="nasm-title">NASM</span>
      </div>

      <nav className={`nasm-navbar__links ${isMobileMenuOpen ? "open" : ""}`}>
        <a href="#" className="nasm-link nasm-active">Codigo</a>
        <a href="#">Documentacion</a>
        <a href="#">Blog</a>
        <a href="#">Videos</a>
      </nav>

      {/* Buscador + Botón a la derecha */}
      <div className="nasm-navbar__actions">
        <input
          type="text"
          placeholder="Buscar documentación..."
          className="nasm-navbar__search"
        />
        <button className="nasm-navbar__btn nasm-btn-transparent">
          &#9650; Repositorios
        </button>
        <button className="nasm-navbar__btn nasm-btn-dark">
          Aprender
        </button>
      </div>

      {/* Botón hamburguesa para mobile */}
      <button className="nasm-navbar__hamburger" onClick={toggleMobileMenu}>
        &#9776; {/* ícono hamburguesa */}
      </button>
    </header>
  );
}

export default Navbar;
