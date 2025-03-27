import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logoWomakers from "../../assets/Hehe.png"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-section">
          <img src={logoWomakers} alt="WomakersCode Logo" className="footer__logo" />
          <p className="footer__description">
          NASM (Netwide Assembler) es un ensamblador de código abierto para la arquitectura x86 y x86-64, ampliamente utilizado en la programación de bajo nivel y en la creación de código optimizado para sistemas operativos como Linux y Windows. Su sintaxis es sencilla y flexible, permitiendo escribir código en ensamblador con mayor claridad y control sobre el hardware.
          </p>
        </div>

        <div className="footer__links-block">
          <h3 className="footer__title">Recursos</h3>
          <ul className="footer__links">
            <li><Link to="/ejercicios" className="nasm-link nasm-active">CODIGO</Link></li>
            <li><a href="https://www.nasm.us/xdoc/2.16.03/html/nasmdoc0.html">DOCUMENTACION</a></li>
            <li><a href="https://github.com/netwide-assembler/nasm">REPOSITORIOS</a></li>
          </ul>
        </div>

        <div className="footer__links-block">
          <h3 className="footer__title">Plataforma</h3>
          <ul className="footer__links">
            <li><a href="https://forum.nasm.us/">BLOG</a></li>
            <li><a href="https://www.youtube.com/playlist?list=PL2EF13wm-hWCoj6tUBGUmrkJmH1972dBB">VIDEOS</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© Derechos de autor Manual NASM 2021-2025. Reservados todos los derechos.</span>
        <span className="footer__bottom-right">Hablar es barato. !Ensename el codigo!</span>
      </div>
    </footer>
  );
}

export default Footer;
