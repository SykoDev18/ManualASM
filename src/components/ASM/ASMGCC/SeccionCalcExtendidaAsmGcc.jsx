// src/components/ASMplusGCC/SeccionCalcExtendidaAsmGcc.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionCalcExtendidaAsmGcc.css";

/* Snippet ASM */
const asmCode = `section .data
    prompt1 db "Ingrese el primer numero: ", 0
    prompt2 db "Ingrese el segundo numero: ", 0
    prompt3 db "Ingrese la operacion (+, -, *, /): ", 0
    fmt_in_num db "%d", 0
    fmt_in_char db " %c", 0
    fmt_out db "Resultado: %d", 10, 0
    error_msg db "Error: Division por cero", 10, 0

section .bss
    num1 resd 1
    num2 resd 1
    oper resb 1
    result resd 1

section .text
    global main
    extern printf, scanf

main:
    ; Pedir primer número
    push prompt1
    call printf
    add esp, 4

    push num1
    push fmt_in_num
    call scanf
    add esp, 8

    ; Pedir segundo número
    push prompt2
    call printf
    add esp, 4

    push num2
    push fmt_in_num
    call scanf
    add esp, 8

    ; Pedir operación
    push prompt3
    call printf
    add esp, 4

    push oper
    push fmt_in_char
    call scanf
    add esp, 8

    ; Cargar operandos en registros
    mov eax, [num1]  ; Cargar primer número en EAX
    mov ebx, [num2]  ; Cargar segundo número en EBX

    ; Evaluar la operación ingresada
    mov cl, [oper]   
    cmp cl, '+'
    je sumar
    cmp cl, '-'
    je restar
    cmp cl, '*'
    je multiplicar
    cmp cl, '/'
    je dividir
    jmp fin          ; Si no es una operación válida, termina

sumar:
    add eax, ebx
    jmp guardar_resultado

restar:
    sub eax, ebx
    jmp guardar_resultado

multiplicar:
    imul ebx
    jmp guardar_resultado

dividir:
    cmp ebx, 0
    je error_division
    cdq
    idiv ebx
    jmp guardar_resultado

error_division:
    push error_msg
    call printf
    add esp, 4
    jmp fin

guardar_resultado:
    mov [result], eax

    ; Imprimir resultado
    push dword [result]
    push fmt_out
    call printf
    add esp, 8

fin:
    xor eax, eax
    ret
`;

/* Comandos para ensamblar + enlazar en 32 bits */
const commandsCode = `# Ensamblar (32 bits)
nasm -f elf32 calculadora.asm -o calculadora.o

# Enlazar con GCC (modo 32 bits)
gcc -m32 calculadora.o -o calculadora -no-pie

# Ejecutar
./calculadora
`;

function SeccionCalcExtendidaAsmGcc() {
  const [copiedAsm, setCopiedAsm] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Copiar el código ASM
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
    <div className="calc-extended-asm__container">
      <h2 className="calc-extended-asm__title">
        Calculadora extendida con ASM + GCC (32 bits)
      </h2>

      {/* Bloque del código ASM */}
      <div className="calc-extended-asm__code-container">
        <div className="calc-extended-asm__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        <button
          className="calc-extended-asm__copy-button"
          onClick={handleCopyAsm}
        >
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción */}
      <h3 className="calc-extended-asm__subtitle">Descripción</h3>
      <p className="calc-extended-asm__text">
        Esta calculadora solicita al usuario dos números y una operación (
        <code>+</code>, <code>-</code>, <code>*</code> o <code>/</code>).
        Realiza la operación en registros <code>EAX</code> (primer número) y{" "}
        <code>EBX</code> (segundo número), e imprime el resultado con{" "}
        <code>printf</code>. Maneja la <strong>división por cero</strong> con un
        mensaje de error.
      </p>

      {/* Bloque de comandos */}
      <h3 className="calc-extended-asm__subtitle">Cómo ejecutarlo</h3>
      <div className="calc-extended-asm__code-container">
        <div className="calc-extended-asm__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button
          className="calc-extended-asm__copy-button"
          onClick={handleCopyCmd}
        >
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default SeccionCalcExtendidaAsmGcc;
