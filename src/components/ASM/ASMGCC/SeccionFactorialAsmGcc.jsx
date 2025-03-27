// src/components/ASMplusGCC/SeccionFactorialAsmGcc.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionFactorialAsmGcc.css";

// Snippet ASM: factorial.asm
const asmCode = `section .data
    num dd 5
    fmt db "Factorial: %d", 10, 0

section .bss
    res resb 4

section .text
    global main
    extern printf

main:
    mov eax, 1            ; Inicializar resultado en 1
    mov ecx, dword [num]  ; Cargar número

factorial_loop:
    cmp ecx, 1       ; Si ecx <= 1, termina
    jle end_loop
    imul eax, ecx    ; eax *= ecx
    dec ecx
    jmp factorial_loop

end_loop:
    mov [res], eax   ; Guardar resultado en res

    ; Llamar a printf para mostrarlo
    push dword [res]
    push fmt
    call printf
    add esp, 8

    xor eax, eax
    ret
`;

// Snippet de comandos
const commandsCode = `# Ensamblar (modo 32 bits)
nasm -f elf32 factorial.asm -o factorial.o

# Enlazar con GCC 32 bits
gcc -m32 factorial.o -o factorial -no-pie

# Ejecutar
./factorial
`;

function SeccionFactorialAsmGcc() {
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
      <h2 className="asm-gcc__title">Factorial en ASM + GCC (32 bits)</h2>

      {/* Bloque de código ASM */}
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
        Este programa en NASM calcula el <strong>factorial</strong> de un número 
        definido en la sección <code>.data</code> (por defecto, <code>num=5</code>). 
        Utiliza <code>ECX</code> como contador y <code>EAX</code> para ir acumulando 
        la multiplicación (<code>imul eax, ecx</code>). El resultado se almacena en{" "}
        <code>res</code> y se muestra con <code>printf</code>.
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

export default SeccionFactorialAsmGcc;
