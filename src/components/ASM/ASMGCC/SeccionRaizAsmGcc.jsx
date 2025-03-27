// src/components/ASMplusGCC/SeccionRaizAsmGcc.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionRaizAsmGcc.css";

// Snippet ASM: raiz.asm
const asmCode = `section .data
    num dd 25.0             ; Número de entrada (float de 32 bits)
    fmt db "Raíz cuadrada: %lf", 10, 0

section .bss
    res resq 1              ; Espacio para un número de 8 bytes (double)

section .text
    global main
    extern printf

main:
    finit                   ; Inicializar la FPU
    fld dword [num]         ; Cargar el número (32 bits) a la FPU
    fsqrt                   ; Calcular raíz cuadrada
    fstp qword [res]        ; Guardar en 64 bits (double)

    push dword [res+4]      ; Parte alta del double
    push dword [res]        ; Parte baja del double
    push fmt
    call printf
    add esp, 12

    xor eax, eax
    ret
`;

// Snippet de comandos (ensamblar + enlazar con GCC)
const commandsCode = `# Ensamblar (modo 32 bits)
nasm -f elf32 raiz.asm -o raiz.o

# Enlazar con GCC 32 bits
gcc -m32 raiz.o -o raiz -no-pie

# Ejecutar
./raiz
`;

function SeccionRaizAsmGcc() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copiar asmCode
  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (err) {
      console.error("Error copiando asmCode:", err);
    }
  };

  // Copiar commandsCode
  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText(commandsCode);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch (err) {
      console.error("Error copiando commandsCode:", err);
    }
  };

  return (
    <div className="asm-gcc__container">
      <h2 className="asm-gcc__title">Raíz Cuadrada con ASM + GCC (FPU)</h2>

      {/* Bloque de código */}
      <div className="asm-gcc__code-container">
        <div className="asm-gcc__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        <button className="asm-gcc__copy-button" onClick={handleCopyAsm}>
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción breve */}
      <h3 className="asm-gcc__subtitle">Descripción</h3>
      <p className="asm-gcc__text">
        Este código **usa la FPU** para calcular la raíz cuadrada de <em>25.0</em>. 
        Primero <code>fld</code> carga el valor de 32 bits a la FPU, luego <code>fsqrt</code> 
        obtiene la raíz y <code>fstp</code> la guarda como <strong>double</strong> 
        (64 bits) en <code>res</code>. Finalmente, se imprime con <code>%lf</code> 
        usando <code>printf</code>.
      </p>

      {/* Bloque de comandos */}
      <h3 className="asm-gcc__subtitle">Cómo ejecutarlo</h3>
      <div className="asm-gcc__code-container">
        <div className="asm-gcc__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button className="asm-gcc__copy-button" onClick={handleCopyCmd}>
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default SeccionRaizAsmGcc;
