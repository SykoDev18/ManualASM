import React, { useState } from "react";
import "./Navbar.css";
import nasm from "../../assets/nasm.png";
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="nasm-navbar">
      <div className="nasm-navbar__brand">
        <span className="nasm-logo">
          <img 
            src={nasm} 
            alt="NASM Logo" 
            className="nasm-logo__img"
          />
        </span>
        <span className="nasm-title">NASM</span>
      </div>

      <nav className={`nasm-navbar__links ${isMobileMenuOpen ? "open" : ""}`}>
        <NavLink to="/ejercicios" className="nasm-link nasm-active">Codigo</NavLink>
        <a href="https://www.nasm.us/xdoc/2.16.03/html/nasmdoc0.html">Documentacion</a>
        <a href="https://forum.nasm.us/">Blog</a>
        <a href="https://www.youtube.com/playlist?list=PL2EF13wm-hWCoj6tUBGUmrkJmH1972dBB">Videos</a>
      </nav>

      <div className="nasm-navbar__actions">
        <a href="https://github.com/netwide-assembler/nasm" >
        <button className="nasm-navbar__btn nasm-btn-transparent">
          &#128060; Repositorios
        </button>
        </a>
        <a href="https://www.nasm.us/xdoc/2.16.03/nasmdoc.pdf">
        <button className="nasm-navbar__btn nasm-btn-dark">
          Aprender
        </button>
        </a>
      </div>


      <button className="nasm-navbar__hamburger" onClick={toggleMobileMenu}>
        &#9776; 
      </button>
    </header>
  );
}

export default Navbar;
