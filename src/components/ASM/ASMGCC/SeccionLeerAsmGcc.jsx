// src/components/ASMplusGCC/SeccionLeerAsmGcc.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionLeerAsmGcc.css";

/* Snippet ASM + GCC: leer.asm */
const asmCode = `section .data
    prompt db "Ingrese un valor: ", 0
    fmt_in db "%d", 0
    fmt_out db "Valor ingresado: %d", 10, 0

section .bss
    num resd 1  ; Espacio para almacenar el número ingresado

section .text
    global main
    extern printf, scanf

main:
    ; Mostrar mensaje de entrada
    push prompt
    call printf
    add esp, 4

    ; Leer el valor desde la consola
    push num
    push fmt_in
    call scanf
    add esp, 8

    ; Imprimir el valor ingresado
    push dword [num]
    push fmt_out
    call printf
    add esp, 8

    ; Terminar el programa
    xor eax, eax
    ret
`;

/* Snippet de comandos: ensamblar + enlazar con GCC */
const commandsCode = `# Ensamblar (modo 32 bits)
nasm -f elf32 leer.asm -o leer.o

# Compilar/Enlazar con GCC (32 bits)
gcc -m32 leer.o -o leer -no-pie

# Ejecutar
./leer
`;

function SeccionLeerAsmGcc() {
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
      <h2 className="asm-gcc__title">Leer un valor con ASM + GCC (32 bits)</h2>

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
        Este programa combina <strong>NASM</strong> y <strong>GCC</strong>. Usa
        las funciones <code>printf</code> y <code>scanf</code> (de la libc) para
        leer y mostrar un valor. Ensamblamos el código en formato ELF de 32 bits
        y luego lo enlazamos con GCC, incluyendo la librería C.
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

export default SeccionLeerAsmGcc;
