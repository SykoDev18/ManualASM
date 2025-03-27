// AsmDocsPage.jsx
import React, { useState } from "react";
import "./AsmDocsPage.css";

// Instalación
import Inst from "./SeccionInstalacion";
// ASM Puro
import LeerPuro from "./SeccionLeerAsmPuro";
import Seccion1AsmPuro from "./Seccion1AsmPuro";
import CicloPuro from "./SeccionCicloAsmPuro";
import SumaPuro from "./SeccionSumaAsmPuro";
import CicloSuma from "./SeccionSumaCicloAsmPuro";
import Calculadora from "./SeccionCalculadoraAsmPuro";
// ASM + GCC
import LeerGCC from "./ASMGCC/SeccionLeerAsmGcc";
import SumaGCC from "./ASMGCC/SeccionSumaAsmGcc";
import Raiz from "./ASMGCC/SeccionRaizAsmGcc";
import Piramide from "./ASMGCC/SeccionPiramideAsmGcc";
import Factorial from "./ASMGCC/SeccionFactorialAsmGcc";
import Espar from "./ASMGCC/SeccionEsParAsmGcc";
import Calc from "./ASMGCC/SeccionCalcExtendidaAsmGcc";

const sidebarData = [
  {
    title: "Empieza",
    subsections: ["Instalación"],
  },
  {
    title: "ASM Puro",
    subsections: [
      "Hola Mundo",
      "Leer",
      "Ciclo",
      "Suma",
      "Suma y Ciclo",
      "Calculadora",
    ],
  },
  {
    title: "ASM + GCC",
    subsections: [
      "Leer with C",
      "Suma GCC",
      "Raiz",
      "Piramide",
      "Factorial",
      "Es par",
      "Calculadora GCC",
    ],
  },
];

const contentData = {
  // Empieza
  "Instalación": <Inst />,
  // ASM Puro
  "Hola Mundo": <Seccion1AsmPuro />,
  "Leer": <LeerPuro />,
  "Ciclo": <CicloPuro />,
  "Suma": <SumaPuro />,
  "Suma y Ciclo": <CicloSuma />,
  "Calculadora": <Calculadora />,
  // ASM + GCC
  "Leer with C": <LeerGCC />,
  "Suma GCC": <SumaGCC />,
  "Raiz": <Raiz />,
  "Piramide": <Piramide />,
  "Factorial": <Factorial />,
  "Es par": <Espar />,
  "Calculadora GCC": <Calc />,
};

function AsmDocsPage() {
  const [openSectionIndex, setOpenSectionIndex] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState("");

  const handleToggleSection = (index) => {
    setOpenSectionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSubsectionClick = (sub) => {
    setSelectedSubsection(sub);
  };

  const selectedContent = contentData[selectedSubsection] || null;

  return (
    <div className="asm-docs__layout">
      {/* Barra lateral */}
      <aside className="asm-docs__sidebar">
        <h3 className="sidebar__title">Documentación ASM</h3>
        <ul className="sidebar__list">
          {sidebarData.map((section, idx) => (
            <li key={section.title} className="sidebar__section">
              <button
                className="section__title"
                onClick={() => handleToggleSection(idx)}
              >
                {section.title}
              </button>
              {openSectionIndex === idx && (
                <ul className="subsection__list">
                  {section.subsections.map((sub) => (
                    <li key={sub}>
                      <button
                        onClick={() => handleSubsectionClick(sub)}
                        className={
                          selectedSubsection === sub ? "subsection__active" : ""
                        }
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="asm-docs__content">
        {/* Intro estilo “Next.js” en español si no se ha seleccionado subsección */}
        {!selectedSubsection && (
          <div className="asm-intro">
            <h1>Introducción</h1>
            <p>¡Bienvenido a la documentación de ASM!</p>

            <h2>¿Qué es ASM?</h2>
            <p>
              ASM (Assembly) es un lenguaje de programación de <em>bajo nivel</em> 
              que brinda control casi directo sobre el hardware. Se vincula 
              estrechamente a la arquitectura del procesador, exponiendo 
              registros, direcciones de memoria e instrucciones a nivel de CPU.
            </p>
            <p>
              Con ASM puedes optimizar secciones críticas de tu código, manejar 
              recursos de hardware directamente y entender cómo el procesador 
              ejecuta instrucciones. Ya sea que trabajes en sistemas embebidos 
              o enrutinas de alto desempeño, ASM te ayuda a exprimir la máxima 
              eficiencia.
            </p>

            <h2>Características Principales</h2>
            <p>Algunas de las características más destacadas de ASM incluyen:</p>

            <table className="asm-features-table">
              <thead>
                <tr>
                  <th>Funcionalidad</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Acceso Directo al Hardware</td>
                  <td>
                    Permite manipular registros de CPU, banderas y direcciones 
                    de memoria con gran precisión.
                  </td>
                </tr>
                <tr>
                  <td>Alto Rendimiento</td>
                  <td>
                    Al mapearse prácticamente 1:1 con el código máquina, ASM 
                    logra la mayor velocidad en partes críticas de un programa.
                  </td>
                </tr>
                <tr>
                  <td>Tamaño de Programa Pequeño</td>
                  <td>
                    Ideal para entornos embebidos o con restricciones 
                    estrictas, donde cada byte es valioso.
                  </td>
                </tr>
                <tr>
                  <td>Dependencia de Arquitectura</td>
                  <td>
                    Cada procesador (x86, ARM, etc.) posee instrucciones 
                    específicas, lo que dificulta la portabilidad directa.
                  </td>
                </tr>
                <tr>
                  <td>Curva de Aprendizaje Empinada</td>
                  <td>
                    ASM carece de abstracciones propias de lenguajes de 
                    alto nivel, requiriendo cuidados extremos en su documentación 
                    y depuración.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Caso: subsección es string (no se usa, pero por si acaso) */}
        {typeof selectedContent === "string" && (
          <div dangerouslySetInnerHTML={{ __html: selectedContent }} />
        )}

        {/* Caso: subsección es un componente React */}
        {React.isValidElement(selectedContent) && selectedContent}
      </main>
    </div>
  );
}

export default AsmDocsPage;
