// src/components/ASM/SeccionCicloAsmPuro.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionCicloAsmPuro.css"; // Estilos específicos

// Snippet: ciclo.asm
const asmCode = `section .data
    hello db "Hello", 10  ; "Hello" seguido de un salto de línea
    hello_len equ $ - hello
    N equ 10              ; Número de repeticiones

section .text
    global _start

_start:
    mov ecx, N      ; Usamos ECX como contador

.loop:
    push ecx
    mov edx, hello_len
    mov ecx, hello
    mov ebx, 1      ; stdout
    mov eax, 4      ; sys_write
    int 0x80
    pop ecx
    loop .loop      ; Decrementa ECX y salta si no es 0

    mov eax, 1      ; sys_exit
    xor ebx, ebx
    int 0x80
`;

// Snippet de comandos
const commandsCode = `# 1. Ensamblar
nasm -f elf32 ciclo.asm -o ciclo.o

# 2. Enlazar
ld -m elf_i386 -s -o ciclo ciclo.o

# 3. Ejecutar
./ciclo
`;

function SeccionCicloAsmPuro() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copia el asmCode
  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (error) {
      console.error("Error copiando ASM:", error);
    }
  };

  // Copia el commandsCode
  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText(commandsCode);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch (error) {
      console.error("Error copiando comandos:", error);
    }
  };

  return (
    <div className="ciclo-asm__container">
      <h2 className="ciclo-asm__title">Programa con ciclo en NASM (loop)</h2>

      {/* Bloque del código ASM */}
      <div className="ciclo-asm__code-container">
        <div className="ciclo-asm__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        <button className="ciclo-asm__copy-button" onClick={handleCopyAsm}>
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción breve */}
      <h3 className="ciclo-asm__subtitle">Descripción</h3>
      <p className="ciclo-asm__text">
        Este programa imprime la palabra <code>Hello</code> tantas veces como
        indique la constante <code>N</code> (en este caso, 10). Se utiliza el
        registro <code>ECX</code> como contador, y la instrucción{" "}
        <code>loop .loop</code> para decrementar <code>ECX</code> y saltar
        mientras no sea cero.
      </p>

      {/* Cómo ejecutarlo */}
      <h3 className="ciclo-asm__subtitle">Cómo ejecutarlo</h3>
      <div className="ciclo-asm__code-container">
        <div className="ciclo-asm__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button className="ciclo-asm__copy-button" onClick={handleCopyCmd}>
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default SeccionCicloAsmPuro;
