// src/components/AsmDocsPage.jsx
import React, { useState } from "react";
import "./AsmDocsPage.css";

/* Data de las secciones y sus subsecciones */
const sidebarData = [
  {
    title: "Empieza",
    subsections: ["Instalación"],
  },
  {
    title: "ASM Puro",
    subsections: [
      "Subsección 1",
      "Subsección 2",
      "Subsección 3",
      "Subsección 4",
      "Subsección 5",
      "Subsección 6",
    ],
  },
  {
    title: "ASM + GCC",
    subsections: [
      "Subsección A",
      "Subsección B",
      "Subsección C",
      "Subsección D",
      "Subsección E",
    ],
  },
];

/* Contenido simulado para cada subsección (podrías cargarlo dinámicamente) */
const contentData = {
  "Instalación": "<h2>Instalación de NASM</h2><p>Aquí va cómo instalar NASM...</p>",
  "Subsección 1": "<h2>ASM Puro - Tema 1</h2><p>Contenido de la subsección 1</p>",
  "Subsección 2": "<h2>ASM Puro - Tema 2</h2><p>Contenido de la subsección 2</p>",
  "Subsección 3": "<h2>ASM Puro - Tema 3</h2><p>Contenido de la subsección 3</p>",
  "Subsección 4": "<h2>ASM Puro - Tema 4</h2><p>Contenido de la subsección 4</p>",
  "Subsección 5": "<h2>ASM Puro - Tema 5</h2><p>Contenido de la subsección 5</p>",
  "Subsección 6": "<h2>ASM Puro - Tema 6</h2><p>Contenido de la subsección 6</p>",
  "Subsección A": "<h2>ASM + GCC - Tema A</h2><p>Contenido de la subsección A</p>",
  "Subsección B": "<h2>ASM + GCC - Tema B</h2><p>Contenido de la subsección B</p>",
  "Subsección C": "<h2>ASM + GCC - Tema C</h2><p>Contenido de la subsección C</p>",
  "Subsección D": "<h2>ASM + GCC - Tema D</h2><p>Contenido de la subsección D</p>",
  "Subsección E": "<h2>ASM + GCC - Tema E</h2><p>Contenido de la subsección E</p>",
};

function AsmDocsPage() {
  // Sección y subsección activas
  const [openSectionIndex, setOpenSectionIndex] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState("");

  // Toggle para abrir/cerrar la sección (acordeón)
  const handleToggleSection = (index) => {
    setOpenSectionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Manejar clic en subsección
  const handleSubsectionClick = (subsection) => {
    setSelectedSubsection(subsection);
  };

  // Contenido HTML que vamos a renderizar (si existe en contentData)
  const selectedContentHtml = contentData[selectedSubsection] || `
    <h2>Bienvenido a la Documentación de NASM</h2>
    <p>Selecciona una subsección en la barra lateral para ver su contenido.</p>
  `;

  return (
    <div className="asm-docs__layout">
      {/* Barra lateral izquierda */}
      <aside className="asm-docs__sidebar">
        <h3 className="sidebar__title">Documentación ASM</h3>
        <ul className="sidebar__list">
          {sidebarData.map((section, idx) => (
            <li key={section.title} className="sidebar__section">
              {/* Título de la sección */}
              <button
                className="section__title"
                onClick={() => handleToggleSection(idx)}
              >
                {section.title}
              </button>

              {/* Listado de subsecciones (acordeón) */}
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
        {/* Renderizamos el HTML con dangerouslySetInnerHTML */}
        <div
          className="content__wrapper"
          dangerouslySetInnerHTML={{ __html: selectedContentHtml }}
        />
      </main>
    </div>
  );
}

export default AsmDocsPage;
