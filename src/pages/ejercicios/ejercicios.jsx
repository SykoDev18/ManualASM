// src/pages/ejercicios.jsx
import React from "react";
import "./ejercicios.css"; // Importa el CSS que acabas de crear

function Ejercicios() {
  return (
    <div className="ejercicios-container">
      <h2>Ejercicios de ASM</h2>
      <p>
        Bienvenido a la sección de ejercicios. Aquí encontrarás diversos 
        ejemplos para practicar ensamblador (NASM) y mejorar tus 
        habilidades en bajo nivel.
      </p>

      <div className="ejercicios-list">
        <div className="ejercicio-item">
          <h3>Ejercicio 1: Hello World</h3>
          <p>
            Aprende a imprimir "Hello World" en consola usando NASM y 
            llamadas al sistema en Linux.
          </p>
        </div>

        <div className="ejercicio-item">
          <h3>Ejercicio 2: Manejo de funciones</h3>
          <p>
            Crea un programa que llame funciones y manipule registros. 
            Practica con la pila y los parámetros de funciones.
          </p>
        </div>
        {/* Agrega más ejercicios si quieres */}
      </div>
    </div>
  );
}

export default Ejercicios;
