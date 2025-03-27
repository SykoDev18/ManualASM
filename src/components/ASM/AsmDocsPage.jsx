import React, { useState } from "react";
import "./AsmDocsPage.css";
//Instalacion
import Inst from "./SeccionInstalacion"
//ASM PURO
import LeerPuro from"./SeccionLeerAsmPuro"
import Seccion1AsmPuro from "./Seccion1AsmPuro"
import CicloPuro from "./SeccionCicloAsmPuro"
import SumaPuro from "./SeccionSumaAsmPuro"
import CicloSuma from "./SeccionSumaCicloAsmPuro"
import Calculadora from "./SeccionCalculadoraAsmPuro"
//ASM + GCC
import LeerGCC from "./ASMGCC/SeccionLeerAsmGcc"
import SumaGCC from "./ASMGCC/SeccionSumaAsmGcc"
import Raiz from "./ASMGCC/SeccionRaizAsmGcc"
import Piramide from "./ASMGCC/SeccionPiramideAsmGcc"
import Factorial from "./ASMGCC/SeccionFactorialAsmGcc"
import Espar from "./ASMGCC/SeccionEsParAsmGcc"
import Calc from "./ASMGCC/SeccionCalcExtendidaAsmGcc"

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
  "Instalación": <Inst/>,
  "Hola Mundo": <Seccion1AsmPuro />,
  "Leer": <LeerPuro/>,
  "Ciclo": <CicloPuro/>,
  "Suma": <SumaPuro />,
  "Suma y Ciclo": <CicloSuma/>,
  "Calculadora":<Calculadora/>,
  //ASM+GCC
  "Leer with C": <LeerGCC/>,
  "Suma GCC":<SumaGCC/>,
  "Raiz":<Raiz/>,
  "Piramide":<Piramide/>,
  "Factorial":<Factorial/>,
  "Es par":<Espar/>,
  "Calculadora GCC":<Calc/>,
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

      <main className="asm-docs__content">
        {/* Si no hay nada seleccionado, mostramos un texto default */}
        {!selectedSubsection && (
          <div className="asm-intro">
            <h2 className="asm-intro__title">Bienvenido a la Documentación de ASM</h2>
            <p>
              <strong>El ensamblador (Assembly, ASM)</strong> es un lenguaje de 
              <em>muy bajo nivel</em> que permite un control casi directo sobre el 
              hardware. Cada instrucción corresponde de cerca a una instrucción 
              máquina específica del procesador.
            </p>
            <div className="asm-intro__features">
              <h3>Principales características de ASM</h3>
              <ul>
                <li>
                  <strong>Control absoluto:</strong> acceso directo a registros, memoria 
                  y todas las instrucciones CPU para optimizar procesos críticos.
                </li>
                <li>
                  <strong>Dependencia de la arquitectura:</strong> cada procesador 
                  (x86, x86_64, ARM, etc.) usa un conjunto de instrucciones único.
                </li>
                <li>
                  <strong>Alto rendimiento:</strong> útil para rutinas de muy bajo 
                  nivel que requieren máxima velocidad o tamaño mínimo.
                </li>
                <li>
                  <strong>Dificultad de mantenimiento:</strong> la ausencia de 
                  abstracciones lo hace menos legible y más propenso a errores 
                  si no se documenta correctamente.
                </li>
              </ul>
            </div>
            <p>
              En esta documentación encontrarás ejemplos y tutoriales de <em>ASM puro</em> 
              y proyectos que combinan <em>ASM + GCC</em>. ¡Explora la barra lateral para 
              comenzar!
            </p>
          </div>
        )}



        {/* Si la subsección actual es un string, usamos dangerouslySetInnerHTML */}
        {typeof selectedContent === "string" && (
          <div
            dangerouslySetInnerHTML={{ __html: selectedContent }}
          />
        )}

        {React.isValidElement(selectedContent) && selectedContent}
      </main>
    </div>
  );
}

export default AsmDocsPage;
