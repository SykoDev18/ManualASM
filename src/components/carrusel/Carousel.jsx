import React, { useState } from "react";
import "./Carousel.css";

// Ejemplo de “slides” con imágenes (o íconos, etc.)
const slidesInfo = [
  {
    id: 1,
    // Puedes usar una imagen real o un ícono
    // Ejemplo: image: require("../../assets/slide1.png"),
    // O un link a un ícono: image: "https://via.placeholder.com/300x200"
    image: "https://via.placeholder.com/600x400/ff7f7f/333333?text=Slide+1",
    caption: "Slide 1",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/600x400/87ff87/333333?text=Slide+2",
    caption: "Slide 2",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/600x400/8787ff/333333?text=Slide+3",
    caption: "Slide 3",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/600x400/f7ff87/333333?text=Slide+4",
    caption: "Slide 4",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza una diapositiva
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slidesInfo.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Retrocede una diapositiva
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slidesInfo.length - 1 : prevIndex - 1
    );
  };

  // Ir a un slide específico cuando se da clic en un “punto”
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      {/* Botón "prev" */}
      <button className="carousel__button carousel__button--left" onClick={handlePrev}>
        &#8249;
      </button>

      {/* Contenedor de las “slides” */}
      <div className="carousel__slide-container">
        {slidesInfo.map((slide, index) => (
          <div
            className="carousel__slide"
            key={slide.id}
            // Si el index es distinto del currentIndex, ocultamos la diapositiva
            style={{
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            <img src={slide.image} alt={`slide-${slide.id}`} />
            <p className="carousel__caption">{slide.caption}</p>
          </div>
        ))}
      </div>

      {/* Botón "next" */}
      <button className="carousel__button carousel__button--right" onClick={handleNext}>
        &#8250;
      </button>

      {/* Indicadores (“puntos”) */}
      <div className="carousel__dots">
        {slidesInfo.map((slide, index) => (
          <span
            key={slide.id}
            className={`carousel__dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
