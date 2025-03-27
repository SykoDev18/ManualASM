// src/components/ASM/SeccionSumaCicloAsmPuro.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionSumaCicloAsmPuro.css";

/* Snippet del código ASM */
const asmCode = `section .bss
    num1 resb 1
    num2 resb 1
    resultado resb 1
    aux resb 1

section .data
    msg1 db "Ingresa el primer número?", 0
    msg2 db "Ingresa el segundo número?", 0
    msg_result db "La suma es: ", 0
    newline db 10, 0

    hello db "Hello", 10
    hello_len equ $ - hello

section .text
    global _start

_start:
    ; Mensaje 1
    mov eax, 4
    mov ebx, 1
    mov ecx, msg1
    mov edx, 25
    int 0x80

    ; Leer primer número
    mov eax, 3
    mov ebx, 0
    mov ecx, num1
    mov edx, 2
    int 0x80

    ; Mensaje 2
    mov eax, 4
    mov ebx, 1
    mov ecx, msg2
    mov edx, 26
    int 0x80

    ; Leer segundo número
    mov eax, 3
    mov ebx, 0
    mov ecx, num2
    mov edx, 2
    int 0x80

    ; Sumar
    mov al, [num1]
    sub al, '0'
    mov bl, [num2]
    sub bl, '0'
    add al, bl
    add al, '0'
    mov [resultado], al

    ; Mostrar "La suma es: "
    mov eax, 4
    mov ebx, 1
    mov ecx, msg_result
    mov edx, 13
    int 0x80

    ; Mostrar el resultado
    mov eax, 4
    mov ebx, 1
    mov ecx, resultado
    mov edx, 1
    int 0x80

    ; Salto de línea
    mov eax, 4
    mov ebx, 1
    mov ecx, newline
    mov edx, 1
    int 0x80

    ; Preparar la suma para usarla como contador (loop)
    mov al, [num1]
    sub al, '0'
    mov bl, [num2]
    sub bl, '0'
    add al, bl
    mov [resultado], al
    movzx ecx, byte [resultado]  ; zero-extender para ECX

.loop:
    push ecx
    mov edx, hello_len
    mov ecx, hello
    mov ebx, 1
    mov eax, 4
    int 0x80
    pop ecx
    loop .loop

    mov eax, 1
    xor ebx, ebx
    int 0x80
`;

/* Snippet de comandos */
const commandsCode = `# 1. Ensamblar
nasm -f elf32 suma_y_ciclo.asm -o suma_y_ciclo.o

# 2. Enlazar
ld -m elf_i386 -s -o suma_y_ciclo suma_y_ciclo.o

# 3. Ejecutar
./suma_y_ciclo
`;

function SeccionSumaCicloAsmPuro() {
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

  // Copiar los comandos
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
    <div className="suma-ciclo-asm__container">
      <h2 className="suma-ciclo-asm__title">
        Programa de Suma + Ciclo en NASM
      </h2>

      {/* Bloque del código ASM */}
      <div className="suma-ciclo-asm__code-container">
        <div className="suma-ciclo-asm__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        <button className="suma-ciclo-asm__copy-button" onClick={handleCopyAsm}>
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción breve */}
      <h3 className="suma-ciclo-asm__subtitle">Descripción</h3>
      <p className="suma-ciclo-asm__text">
        Este programa pide dos dígitos (en ASCII), los suma, muestra el resultado
        y luego **usa la suma como contador** para imprimir "Hello" tantas veces
        como indique el resultado. Utiliza syscalls para entrada/salida y
        el registro <code>ECX</code> para implementar el loop.
      </p>

      {/* Bloque de comandos (ensamblar, enlazar, ejecutar) */}
      <h3 className="suma-ciclo-asm__subtitle">Cómo ejecutarlo</h3>
      <div className="suma-ciclo-asm__code-container">
        <div className="suma-ciclo-asm__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button className="suma-ciclo-asm__copy-button" onClick={handleCopyCmd}>
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default SeccionSumaCicloAsmPuro;
