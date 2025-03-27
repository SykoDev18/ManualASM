// src/components/ASM/Seccion1AsmPuro.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
/* Elige un tema: puede ser atomOneDark, dracula, etc.
   Encuentras temas en "react-syntax-highlighter/dist/esm/styles/hljs" */
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import "./Seccion1AsmPuro.css"; // CSS para embellecer el layout

// Snippet: Hola Mundo en NASM
const asmCode = `section .data
    mensaje db "Hola, mundo!", 0xA   ; Mensaje con salto de línea
    len equ $ - mensaje

section .text
    global _start

_start:
    mov eax, 4       ; syscall write
    mov ebx, 1       ; fd = stdout
    mov ecx, mensaje ; dirección del msg
    mov edx, len     ; longitud
    int 0x80

    mov eax, 1       ; syscall exit
    xor ebx, ebx     ; exit code 0
    int 0x80
`;

// Snippet: Comandos de ejecución
const commandsCode = `# Ensamblar (formato 32-bit)
nasm -f elf32 hola.asm -o hola.o

# Enlazar
ld -m elf_i386 -s -o hola hola.o

# Ejecutar
./hola
`;

function Seccion1AsmPuro() {
  // Estados para mostrar “¡Copiado!” en cada snippet
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copiar el asmCode
  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (err) {
      console.error("Error copiando ASM:", err);
    }
  };

  // Copiar los commands
  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText(commandsCode);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch (err) {
      console.error("Error copiando comandos:", err);
    }
  };

  return (
    <div className="seccion1__container">
      {/* Título */}
      <h2 className="seccion1__title">Programa "Hola Mundo" en NASM</h2>

      {/* Contenedor principal: código a la izquierda, botón de copiar arriba-derecha */}
      <div className="seccion1__code-container">
        <div className="seccion1__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        {/* Botón de copiar */}
        <button className="seccion1__copy-button" onClick={handleCopyAsm}>
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción */}
      <h3 className="seccion1__subtitle">Descripción</h3>
      <p className="seccion1__text">
        <code>db</code> define variables byte; <code>dw</code> define palabras
        de 16 bits; <code>dd</code> define double-words de 32 bits; etc.  
        Para sistemas de 64 bits, podrías requerir bibliotecas de 32 bits:
      </p>
      <pre className="seccion1__pre">
        sudo apt install gcc-multilib
      </pre>

      {/* Cómo ejecutarlo (otro snippet) */}
      <h3 className="seccion1__subtitle">Cómo ejecutarlo</h3>
      <div className="seccion1__code-container">
        <div className="seccion1__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button className="seccion1__copy-button" onClick={handleCopyCmd}>
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default Seccion1AsmPuro;
