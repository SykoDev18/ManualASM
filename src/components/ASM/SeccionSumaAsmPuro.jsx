// src/components/ASM/SeccionSumaAsmPuro.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionSumaAsmPuro.css";

// Snippet del código ASM
const asmCode = `section .bss
    num1 resb 2
    num2 resb 2
    resultado resb 64

section .data
    msg1 db "Ingresa el primer número?", 0
    msg2 db "Ingresa el segundo número?", 0
    msg_result db "La suma es: ", 0
    newline db 10, 0

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

    ; Convertir ASCII -> número
    mov al, [num1]
    sub al, '0'
    mov bl, [num2]
    sub bl, '0'

    ; Sumar
    add al, bl
    add al, '0'
    mov [resultado], al

    ; Mostrar "La suma es: "
    mov eax, 4
    mov ebx, 1
    mov ecx, msg_result
    mov edx, 13
    int 0x80

    ; Mostrar resultado
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

    ; Salir
    mov eax, 1
    xor ebx, ebx
    int 0x80
`;

// Snippet de comandos para ensamblar, enlazar y ejecutar
const commandsCode = `# Ensamblar
nasm -f elf32 suma.asm -o suma.o

# Enlazar
ld -m elf_i386 suma.o -o suma

# Ejecutar
./suma
`;

function SeccionSumaAsmPuro() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copiar el asmCode
  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (err) {
      console.error("Error copiando el código ASM:", err);
    }
  };

  // Copiar el commandsCode
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
    <div className="suma-asm__container">
      <h2 className="suma-asm__title">
        Programa para sumar 2 dígitos en NASM
      </h2>

      {/* Bloque del código ASM */}
      <div className="suma-asm__code-container">
        <div className="suma-asm__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        <button className="suma-asm__copy-button" onClick={handleCopyAsm}>
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción breve */}
      <h3 className="suma-asm__subtitle">Descripción</h3>
      <p className="suma-asm__text">
        Este programa pide al usuario dos dígitos (caracteres ASCII), los
        convierte a valores numéricos, realiza la suma y muestra el resultado
        final. Se hace uso de la sección <code>.bss</code> para reservar
        espacio, y de syscalls para entrada y salida.
      </p>

      {/* Bloque de comandos para ensamblar y ejecutar */}
      <h3 className="suma-asm__subtitle">Cómo ejecutarlo</h3>
      <div className="suma-asm__code-container">
        <div className="suma-asm__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button className="suma-asm__copy-button" onClick={handleCopyCmd}>
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default SeccionSumaAsmPuro;
