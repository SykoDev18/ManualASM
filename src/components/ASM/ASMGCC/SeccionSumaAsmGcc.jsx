// src/components/ASMplusGCC/SeccionSumaAsmGcc.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionSumaAsmGcc.css";

// Snippet del código ASM (suma.asm)
const asmCode = `section .data
    num1 dd 500
    num2 dd 10
    fmt db "Resultado: %d", 10, 0

section .bss
    res resb 4

section .text
    global main
    extern printf

main:
    mov eax, dword [num1]  ; Cargar num1 en eax
    add eax, dword [num2]  ; Sumar num2
    mov [res], eax         ; Guardar resultado

    push dword [res]       ; Pasar el resultado a printf
    push fmt
    call printf
    add esp, 8             ; Limpiar pila

    xor eax, eax
    ret
`;

// Snippet con los comandos (ensamblar + enlazar con GCC)
const commandsCode = `# Ensamblar (modo 32 bits)
nasm -f elf32 suma.asm -o suma.o

# Enlazar con GCC en 32 bits
gcc -m32 suma.o -o suma -no-pie

# Ejecutar
./suma

# Nota: Si tu sistema es 64 bits, instala bibliotecas 32 bits:
sudo apt install gcc-multilib
`;

function SeccionSumaAsmGcc() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copiar el asmCode
  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (err) {
      console.error("Error copiando asmCode:", err);
    }
  };

  // Copiar los commands
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
      <h2 className="asm-gcc__title">Suma en ASM + GCC (32 bits)</h2>

      {/* Bloque del código ASM */}
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
        Este programa define dos valores <code>(num1 = 500)</code> y{" "}
        <code>(num2 = 10)</code> en la sección <strong>.data</strong>, los suma
        cargándolos en <code>EAX</code>, y muestra el resultado con la función{" "}
        <code>printf</code> de la librería C. Para compilarlo en 32 bits,
        necesitamos <code>gcc -m32</code> y, en sistemas de 64 bits, 
        instalar las bibliotecas de 32 bits.
      </p>

      {/* Bloque de comandos para ensamblar y ejecutar */}
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

export default SeccionSumaAsmGcc;
