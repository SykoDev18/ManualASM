import React from "react";
import "./Welcome.css"; 

function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-section__container">
        <h1 className="welcome-section__title">El manual de NASM para Linux</h1>

        <p className="welcome-section__subtitle">
          Utilizado por entusiastas y profesionales del bajo nivel, NASM permite crear
          programas y rutinas de <strong>alto rendimiento</strong> en plataformas x86/x86_64
          gracias a su sintaxis clara y potente.
        </p>

        <div className="welcome-section__buttons">
          <button className="nasm-btn nasm-btn-dark">Empezar</button>
          <button className="nasm-btn nasm-btn-light">Aprenda NASM</button>
        </div>

        <p className="welcome-section__snippet">
          ▲ ~ <code>nasm -f elf64 hello.asm &amp;&amp; ld hello.o -o hello</code>
        </p>
      </div>
    </section>
  );
}

export default WelcomeSection;
