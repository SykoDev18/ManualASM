import React from "react";
import "./Footer.css";

// Ejemplo de URL de logo (ajusta según tu ruta o URL real)
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
            Mais Mulheres em Tech es una iniciativa de WoMakersCode, una ONG brasileña
            sin fines de lucro con la misión de promover mujeres diversas en el sector
            tecnológico a través de cursos, mentorías en tecnología y soft skills, preparación
            para certificaciones, eventos e iniciativas enfocadas en la empleabilidad.
          </p>
        </div>

        {/* Sección con enlaces de “Institucional” */}
        <div className="footer__links-block">
          <h3 className="footer__title">Institucional</h3>
          <ul className="footer__links">
            <li><a href="#">CÓDIGO DE WOMAKERS</a></li>
            <li><a href="#">NUESTRO IMPACTO</a></li>
            <li><a href="#">CAPACITACIÓN EN TI</a></li>
            <li><a href="#">EVENTOS</a></li>
            <li><a href="#">PARA EMPRESAS</a></li>
          </ul>
        </div>

        {/* Sección con enlaces de “Plataforma” */}
        <div className="footer__links-block">
          <h3 className="footer__title">Plataforma</h3>
          <ul className="footer__links">
            <li><a href="#">CURSOS</a></li>
            <li><a href="#">APOYO</a></li>
            <li><a href="#">CÓDIGO DE CONDUCTA</a></li>
            <li><a href="#">CONDICIONES DE USO</a></li>
            <li><a href="#">POLÍTICA DE PRIVACIDAD</a></li>
          </ul>
        </div>
      </div>

      {/* Barra inferior de copyright */}
      <div className="footer__bottom">
        <span>© Derechos de autor Manual NASM 2021-2025. Reservados todos los derechos.</span>
        <span className="footer__bottom-right">Mujeres + Tecnología = &lt;fuerte&gt;</span>
      </div>
    </footer>
  );
}

export default Footer;
