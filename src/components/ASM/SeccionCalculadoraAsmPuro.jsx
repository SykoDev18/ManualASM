// src/components/ASM/SeccionCalculadoraAsmPuro.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionCalculadoraAsmPuro.css";

// Snippet ASM: calculadora.asm
const asmCode = `section .data
   msg1 db 10,'-Calculadora-',10,0
   lmsg1 equ $ - msg1

   msg2 db 10,'Numero 1: ',0
   lmsg2 equ $ - msg2

   msg3 db 'Numero 2: ',0
   lmsg3 equ $ - msg3

   msg4 db 10,'1. Sumar',10,0
   lmsg4 equ $ - msg4

   msg5 db '2. Restar',10,0
   lmsg5 equ $ - msg5

   msg6 db '3. Multiplicar',10,0
   lmsg6 equ $ - msg6

   msg7 db '4. Dividir',10,0
   lmsg7 equ $ - msg7

   msg8 db 'Operacion: ',0
   lmsg8 equ $ - msg8

   msg9 db 10,'Resultado: ',0
   lmsg9 equ $ - msg9

   msg10 db 10,'Opcion Invalida',10,0
   lmsg10 equ $ - msg10

   nlinea db 10,10,0
   lnlinea equ $ - nlinea

section .bss
   opcion resb 2
   num1 resb 2
   num2 resb 2
   resultado resb 2

section .text
   global _start

_start:
   ; Mensaje 1
   mov eax, 4
   mov ebx, 1
   mov ecx, msg1
   mov edx, lmsg1
   int 80h

   ; Mensaje 2 (Numero 1)
   mov eax, 4
   mov ebx, 1
   mov ecx, msg2
   mov edx, lmsg2
   int 80h

   ; Leer num1
   mov eax, 3
   mov ebx, 0
   mov ecx, num1
   mov edx, 2
   int 80h

   ; Mensaje 3 (Numero 2)
   mov eax, 4
   mov ebx, 1
   mov ecx, msg3
   mov edx, lmsg3
   int 80h

   ; Leer num2
   mov eax, 3
   mov ebx, 0
   mov ecx, num2
   mov edx, 2
   int 80h

   ; Msg 4 (1. Sumar)
   mov eax, 4
   mov ebx, 1
   mov ecx, msg4
   mov edx, lmsg4
   int 80h

   ; Msg 5 (2. Restar)
   mov eax, 4
   mov ebx, 1
   mov ecx, msg5
   mov edx, lmsg5
   int 80h

   ; Msg 6 (3. Multiplicar)
   mov eax, 4
   mov ebx, 1
   mov ecx, msg6
   mov edx, lmsg6
   int 80h

   ; Msg 7 (4. Dividir)
   mov eax, 4
   mov ebx, 1
   mov ecx, msg7
   mov edx, lmsg7
   int 80h

   ; Msg 8 (Operacion)
   mov eax, 4
   mov ebx, 1
   mov ecx, msg8
   mov edx, lmsg8
   int 80h

   ; Leer opcion
   mov ebx, 0
   mov ecx, opcion
   mov edx, 2
   mov eax, 3
   int 80h

   mov ah, [opcion]
   sub ah, '0'

   cmp ah, 1
   je sumar

   cmp ah, 2
   je restar

   cmp ah, 3
   je multiplicar

   cmp ah, 4
   je dividir

   ; Opcion invalida
   mov eax, 4
   mov ebx, 1
   mov ecx, msg10
   mov edx, lmsg10
   int 80h

   jmp salir

sumar:
   mov al, [num1]
   mov bl, [num2]
   sub al, '0'
   sub bl, '0'
   add al, bl
   add al, '0'
   mov [resultado], al
   ; Mostrar "Resultado"
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
   ; Mostrar valor
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 2
   int 80h
   jmp salir

restar:
   mov al, [num1]
   mov bl, [num2]
   sub al, '0'
   sub bl, '0'
   sub al, bl
   add al, '0'
   mov [resultado], al
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 1
   int 80h
   jmp salir

multiplicar:
   mov al, [num1]
   mov bl, [num2]
   sub al, '0'
   sub bl, '0'
   mul bl
   add ax, '0'
   mov [resultado], ax
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 1
   int 80h
   jmp salir

dividir:
   mov al, [num1]
   mov bl, [num2]
   mov dx, 0
   mov ah, 0
   sub al, '0'
   sub bl, '0'
   div bl
   add ax, '0'
   mov [resultado], ax
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 1
   int 80h
   jmp salir

salir:
   mov eax, 4
   mov ebx, 1
   mov ecx, nlinea
   mov edx, lnlinea
   int 80h

   mov eax, 1
   mov ebx, 0
   int 80h
`;

// Snippet de comandos para ensamblar y ejecutar la calculadora
const commandsCode = `# 1. Ensamblar
nasm -f elf32 calculadora.asm -o calculadora.o

# 2. Enlazar
ld -m elf_i386 -s -o calculadora calculadora.o

# 3. Ejecutar
./calculadora
`;

function SeccionCalculadoraAsmPuro() {
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
    <div className="calc-asm__container">
      <h2 className="calc-asm__title">Calculadora en NASM</h2>

      {/* Bloque de código */}
      <div className="calc-asm__code-container">
        <div className="calc-asm__code-snippet">
          <SyntaxHighlighter language="asm" style={atomOneDark} showLineNumbers>
            {asmCode}
          </SyntaxHighlighter>
        </div>
        <button className="calc-asm__copy-button" onClick={handleCopyAsm}>
          {copiedAsm ? "¡Copiado!" : "Copiar Código"}
        </button>
      </div>

      {/* Descripción */}
      <h3 className="calc-asm__subtitle">Descripción</h3>
      <p className="calc-asm__text">
        Este programa simple en NASM actúa como una calculadora para dos dígitos: 
        <strong> Suma</strong>, <strong>Resta</strong>, <strong>Multiplica</strong> 
        y <strong>Divide</strong>. Usa interrupciones de Linux (syscalls) para leer 
        la entrada y escribir la salida, y conversión de ASCII a decimal (y viceversa) 
        para operar.
      </p>

      {/* Comandos de ejecución */}
      <h3 className="calc-asm__subtitle">Cómo ejecutarlo</h3>
      <div className="calc-asm__code-container">
        <div className="calc-asm__code-snippet">
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {commandsCode}
          </SyntaxHighlighter>
        </div>
        <button className="calc-asm__copy-button" onClick={handleCopyCmd}>
          {copiedCmd ? "¡Copiado!" : "Copiar Comandos"}
        </button>
      </div>
    </div>
  );
}

export default SeccionCalculadoraAsmPuro;
