// src/components/ASMplusGCC/SeccionPiramideAsmGcc.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionPiramideAsmGcc.css";

// Snippet ASM: piramide.asm
const asmCode = `section .data
    prompt db "Ingrese el numero de filas: ", 0
    fmt_in db "%d", 0
    fmt_out db "%c", 0
    newline db 10, 0
    space db " ", 0
    asterisk db " * ", 0

section .bss
    filas resd 1

section .text
    global main
    extern printf, scanf

main:
    ; Pedir el número de filas
    push prompt
    call printf
    add esp, 4

    push filas
    push fmt_in
    call scanf
    add esp, 8

    ; Cargar el número de filas en ECX
    mov ecx, [filas]
    mov edi, 1   ; Controla la cantidad de asteriscos por fila

fila_loop:
    push ecx

    ; Imprimir espacios antes de los asteriscos
    mov eax, [filas]
    sub eax, edi
    mov ebx, eax

espacio_loop:
    cmp ebx, 0
    je imprimir_asteriscos
    push space
    call printf
    add esp, 4
    dec ebx
    jmp espacio_loop

imprimir_asteriscos:
    mov ebx, edi

asterisco_loop:
    cmp ebx, 0
    je nueva_linea
    push asterisk
    call printf
    add esp, 4
    dec ebx
    jmp asterisco_loop

nueva_linea:
    push newline
    call printf
    add esp, 4

    pop ecx
    inc edi
    loop fila_loop

    xor eax, eax
    ret
`;

// Snippet de comandos (ensamblar + enlazar con GCC)
const commandsCode = `# Ensamblar (modo 32 bits)
nasm -f elf32 piramide.asm -o piramide.o

# Enlazar con GCC 32 bits
gcc -m32 piramide.o -o piramide -no-pie

# Ejecutar
./piramide
`;

function SeccionPiramideAsmGcc() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (err) {
      console.error("Error copiando asmCode:", err);
    }
  };

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
      <h2 className="asm-gcc__title">Pirámide de Asteriscos con ASM + GCC</h2>

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

      {/* Descripción */}
      <h3 className="asm-gcc__subtitle">Descripción</h3>
      <p className="asm-gcc__text">
        Este programa solicita al usuario el número de filas y, usando **scanf**
        para leer y **printf** para imprimir, genera una <strong>pirámide</strong>{" "}
        de asteriscos. Se combina <code>NASM</code> (formato 32 bits) con{" "}
        <code>GCC -m32</code> y se aprovecha un bucle <code>loop</code> en
        ensamblador para iterar por cada fila. La lógica imprime espacios a la
        izquierda y, luego, una cantidad creciente de asteriscos.
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

export default SeccionPiramideAsmGcc;
