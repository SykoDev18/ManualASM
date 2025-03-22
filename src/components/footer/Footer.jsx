import React from "react";
import "./Footer.css";

import logoWomakers from "../../assets/Hehe.png"

function Footer() {
  return (
    <footer className="footer">
      {/* Contenedor principal del footer */}
      <div className="footer__container">
        {/* Sección con logo y texto */}
        <div className="footer__logo-section">
          <img src={logoWomakers} alt="WomakersCode Logo" className="footer__logo" />
          <p className="footer__description">
          NASM (Netwide Assembler) es un ensamblador de código abierto para la arquitectura x86 y x86-64, ampliamente utilizado en la programación de bajo nivel y en la creación de código optimizado para sistemas operativos como Linux y Windows. Su sintaxis es sencilla y flexible, permitiendo escribir código en ensamblador con mayor claridad y control sobre el hardware.
          </p>
        </div>

        {/* Sección con enlaces de “Institucional” */}
        <div className="footer__links-block">
          <h3 className="footer__title">Recursos</h3>
          <ul className="footer__links">
            <li><a href="#">CODIGO</a></li>
            <li><a href="#">DOCUMENTACION</a></li>
            <li><a href="#">EJERCICIOS</a></li>
          </ul>
        </div>

        {/* Sección con enlaces de “Plataforma” */}
        <div className="footer__links-block">
          <h3 className="footer__title">Plataforma</h3>
          <ul className="footer__links">
            <li><a href="#">BLOG</a></li>
            <li><a href="#">APOYO</a></li>
            <li><a href="#">VIDEOS</a></li>
          </ul>
        </div>
      </div>

      {/* Barra inferior de copyright */}
      <div className="footer__bottom">
        <span>© Derechos de autor Manual NASM 2021-2025. Reservados todos los derechos.</span>
        <span className="footer__bottom-right">Hablar es barato. !Ensename el codigo!</span>
      </div>
    </footer>
  );
}

export default Footer;
