import React, { useState } from "react";
import "./CarouselF.css";

function TestimonialCarousel() {
  // Array de citas relacionadas con NASM/Linux
  const quotes = [
    {
      id: 1,
      text: `"NASM me ha permitido entender cómo funciona el hardware a bajo nivel. Es sencillo y poderoso a la vez."`,
      author: "— Jane Smith, Desarrolladora de Sistemas"
    },
    {
      id: 2,
      text: `"Desde que usamos Linux en nuestro entorno de desarrollo, nos beneficiamos de la estabilidad y la gran comunidad que lo respalda."`,
      author: "— John Doe, Sysadmin en Initech"
    },
    {
      id: 3,
      text: `"La sintaxis de NASM es clara y nos ha facilitado la escritura de rutinas de alto rendimiento para aplicaciones críticas."`,
      author: "— Alice Brown, Ingeniera de Software en ASM Corp"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Maneja siguiente
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Maneja anterior
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonial-carousel">
      {/* Flecha izquierda */}
      <button className="carousel-btn left" onClick={handlePrev}>
        &#8249;
      </button>

      {/* Contenedor de cita */}
      <div className="testimonial-container">
        {quotes.map((quote, index) => (
          <div
            key={quote.id}
            className={`testimonial-slide ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <p className="testimonial-text">{quote.text}</p>
            <p className="testimonial-author">{quote.author}</p>
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      <button className="carousel-btn right" onClick={handleNext}>
        &#8250;
      </button>
    </div>
  );
}

export default TestimonialCarousel;
