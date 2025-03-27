// src/components/ASMplusGCC/SeccionEsParAsmGcc.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionEsParAsmGcc.css";

/* Snippet ASM: es_par.asm */
const asmCode = `section .data
    num dd 10
    par db "El número es par", 10, 0
    inpar db "El número es impar", 10, 0

section .text
    global main
    extern printf

main:
    mov eax, dword [num]
    test eax, 1         ; Comprueba el bit menos significativo
    jz print_par        ; Salta si ZF=1 (significa que el bit era 0 -> par)
    push inpar
    call printf
    add esp, 4
    jmp end_programa

print_par:
    push par
    call printf
    add esp, 4

end_programa:
    xor eax, eax
    ret
`;

/* Snippet de comandos */
const commandsCode = `# Ensamblar en modo 32 bits
nasm -f elf32 es_par.asm -o es_par.o

# Enlazar con GCC (32 bits)
gcc -m32 es_par.o -o es_par -no-pie

# Ejecutar
./es_par
`;

function SeccionEsParAsmGcc() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copiar asmCode
  const handleCopyAsm = async () => {
    try {
      await navigator.clipboard.writeText(asmCode);
      setCopiedAsm(true);
      setTimeout(() => setCopiedAsm(false), 2000);
    } catch (error) {
      console.error("Error copiando asmCode:", error);
    }
  };

  // Copiar commandsCode
  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText(commandsCode);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch (error) {
      console.error("Error copiando commandsCode:", error);
    }
  };

  return (
    <div className="asm-gcc__container">
      <h2 className="asm-gcc__title">Verificar número par/impar con ASM + GCC</h2>

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
        Este programa verifica si el valor definido en <code>num</code> es par o
        impar usando la instrucción <code>test eax, 1</code>. Si el bit menos
        significativo (LSB) es 0, el número es <strong>par</strong>; si es 1, es{" "}
        <strong>impar</strong>. La salida se muestra con <code>printf</code>.
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

export default SeccionEsParAsmGcc;
