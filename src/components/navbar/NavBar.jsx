import React, { useState } from "react";
import "./NavBar.css";

function Navbar() {
  // Estado para mostrar/ocultar el menú principal
  const [openMenu, setOpenMenu] = useState(null);
  // Estado para modo de búsqueda
  const [searchActive, setSearchActive] = useState(false);

  // Maneja la apertura/cierre de un submenú
  const handleMenuClick = (menuId) => {
    // Si se hace clic en el mismo menú, lo cierra
    // si es diferente, abre el nuevo
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
  };

  // Al hacer clic en el botón de búsqueda
  // se oculta todo menos el input
  const handleSearchClick = () => {
    setSearchActive(!searchActive);
    // opcional: cerrar cualquier menú abierto
    setOpenMenu(null);
  };

  return (
    <nav className="navbar">
      {/* Logo / Marca */}
      <div className="navbar__brand">NASM</div>

      {/* Botón de búsqueda */}
      <button className="navbar__search-btn" onClick={handleSearchClick}>
        {searchActive ? "Cerrar" : "Buscar"}
      </button>

      {/* Barra de búsqueda (sólo se muestra si searchActive es true) */}
      {searchActive && (
        <div className="navbar__search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            className="navbar__search-input"
          />
        </div>
      )}

      {/* Contenedor principal de links (oculto si searchActive es true) */}
      {!searchActive && (
        <ul className="navbar__links">
          <li className="navbar__item">
            <button
              className="navbar__item-btn"
              onClick={() => handleMenuClick("desarrolladores")}
            >
              Para Desarrolladores
            </button>
            {/* Submenú */}
            {openMenu === "desarrolladores" && (
              <ul className="navbar__submenu">
                <li>Para uso particular</li>
                <li>Para equipos y organizaciones</li>
                <li>Programas y ofertas</li>
              </ul>
            )}
          </li>

          <li className="navbar__item">
            <button
              className="navbar__item-btn"
              onClick={() => handleMenuClick("equipos")}
            >
              Para Equipos
            </button>
            {openMenu === "equipos" && (
              <ul className="navbar__submenu">
                <li>TeamCity</li>
                <li>YouTrack</li>
                <li>Datalore</li>
                <li>Qodana</li>
                <li>CodeCanvas</li>
              </ul>
            )}
          </li>

          <li className="navbar__item">
            <button
              className="navbar__item-btn"
              onClick={() => handleMenuClick("educacion")}
            >
              Educación
            </button>
            {openMenu === "educacion" && (
              <ul className="navbar__submenu">
                <li>JetBrains Academy</li>
                <li>Cursos en línea</li>
              </ul>
            )}
          </li>

          <li className="navbar__item">
            <button
              className="navbar__item-btn"
              onClick={() => handleMenuClick("tienda")}
            >
              Tienda
            </button>
            {openMenu === "tienda" && (
              <ul className="navbar__submenu">
                <li>All Products Pack</li>
                <li>Ofertas especiales</li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
