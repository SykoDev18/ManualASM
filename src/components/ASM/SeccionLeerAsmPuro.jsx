// src/components/ASM/SeccionLeerAsmPuro.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionLeerAsmPuro.css";

/** Snippet ASM: leer.asm */
const asmCode = `section .bss
    buffer resb 10  ; Buffer para almacenar el número ingresado

section .data
    msg db "Ingresa un número: ", 0
    msg_result db "Número ingresado: ", 0
    newline db 10, 0  ; Salto de línea

section .text
    global _start

_start:
    ; Mostrar mensaje
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, msg        ; Dirección del mensaje
    mov edx, 18         ; Longitud del mensaje
    int 0x80

    ; Leer número desde la entrada estándar
    mov eax, 3          ; syscall read
    mov ebx, 0          ; stdin
    mov ecx, buffer     ; Dirección donde guardar el número
    mov edx, 10         ; Longitud máxima
    int 0x80

    ; Mostrar mensaje del resultado
    mov eax, 4
    mov ebx, 1
    mov ecx, msg_result
    mov edx, 18
    int 0x80

    ; Mostrar el número ingresado
    mov eax, 4
    mov ebx, 1
    mov ecx, buffer
    mov edx, 10
    int 0x80

    ; Imprimir salto de línea
    mov eax, 4
    mov ebx, 1
    mov ecx, newline
    mov edx, 1
    int 0x80

    ; Salir del programa
    mov eax, 1
    xor ebx, ebx
    int 0x80
`;

/** Snippet de comandos de ensamblado, enlace y ejecución */
const commandsCode = `# Ensamblar:
nasm -f elf32 leer.asm -o leer.o

# Enlazar:
ld -m elf_i386 leer.o -o leer

# Ejecutar:
./leer
`;

function SeccionLeerAsmPuro() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copiar el snippet ASM al portapapeles
  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (err) {
      console.error("Error copiando ASM:", err);
    }
  };

  // Copiar el snippet de comandos
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
    <div className="leer-asm__container">
      <h2 className="leer-asm__title">Programa para Leer Números en NASM</h2>

      {/* Bloque del código ASM */}
      <div className="leer-asm__code-container">
        <div className="leer-asm__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        <button className="leer-asm__copy-button" onClick={handleCopyAsm}>
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción breve */}
      <h3 className="leer-asm__subtitle">Descripción</h3>
      <p className="leer-asm__text">
        Este programa solicita al usuario que ingrese un número mediante 
        la función <code>read</code> (syscall 3). Lo almacena en un buffer 
        (sección <code>.bss</code>) y luego lo muestra de nuevo por stdout.
        Para sistemas de 64 bits, podrías requerir las bibliotecas de 32 bits:
      </p>
      <pre className="leer-asm__pre">
        sudo apt install gcc-multilib
      </pre>

      {/* Cómo ejecutarlo (comandos) */}
      <h3 className="leer-asm__subtitle">Cómo ejecutarlo</h3>
      <div className="leer-asm__code-container">
        <div className="leer-asm__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button className="leer-asm__copy-button" onClick={handleCopyCmd}>
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default SeccionLeerAsmPuro;
