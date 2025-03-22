import React from "react";
import "./Posible.css";

const nasmCards = [
  {
    id: 1,
    icon: "🌐", 
    title: "Rutinas de bajo nivel",
    description:
      "Crea y optimiza rutinas directamente en x86/x86_64 para tareas que requieran un alto rendimiento. Ideal para control de hardware y manipulación de memoria.",
    packages: ["syscall", "multiboot", "libc-asm"],
    moreInfoLink: "#"
  },
  {
    id: 2,
    icon: "⚙️",
    title: "Sistemas operativos",
    description:
      "Con NASM puedes escribir partes críticas de un kernel o manejar interrupciones y drivers. Profundiza en cómo funciona tu sistema desde dentro.",
    packages: ["bootloaders", "interrupts", "drivers-lab"],
    moreInfoLink: "#"
  },
  {
    id: 3,
    icon: "🚀",
    title: "Optimización de código",
    description:
      "Para secciones donde C o C++ no rinden lo suficiente, inserta NASM en tu proyecto y maximiza la velocidad en algoritmos intensivos.",
    packages: ["sse-avx", "multimedia", "crypto-accel"],
    moreInfoLink: "#"
  },
  {
    id: 4,
    icon: "💻",
    title: "Interfaces híbridas",
    description:
      "Integra ensamblador con otros lenguajes de alto nivel, creando librerías compartidas y funciones ensambladas. Control total, máximo desempeño.",
    packages: ["ffi-asm", "stack-calls", "linking-tools"],
    moreInfoLink: "#"
  }
];

function WhatIsPossibleWithNasm() {
  return (
    <section className="nasm-possible">
      <div className="nasm-possible__header">
        <h2>¿Qué es posible con NASM?</h2>
        <p className="nasm-possible__subtitle">
          Utiliza NASM para una gran variedad de propósitos en la programación de bajo nivel
        </p>
      </div>

      <div className="nasm-possible__cards">
        {nasmCards.map((card) => (
          <article key={card.id} className="nasm-card">
            <div className="nasm-card__icon">{card.icon}</div>
            <h3 className="nasm-card__title">{card.title}</h3>
            <p className="nasm-card__description">{card.description}</p>

            <div className="nasm-card__packages">
              <p>Paquetes populares:</p>
              <div className="nasm-card__tags">
                {card.packages.map((pkg, idx) => (
                  <span key={idx} className="nasm-card__tag">{pkg}</span>
                ))}
              </div>
            </div>

            <a href={card.moreInfoLink} className="nasm-card__more-info">
              Más información
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WhatIsPossibleWithNasm;
