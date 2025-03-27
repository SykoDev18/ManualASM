// src/components/Instalacion/SeccionInstalacion.jsx
import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./SeccionInstalacion.css";

function SeccionInstalacion() {
  return (
    <div className="instalacion__container">
      <h2 className="instalacion__title">Instalación de NASM y GCC en Linux</h2>

      <h3 className="instalacion__subtitle">1. Instalación usando la terminal</h3>
      <p className="instalacion__text">
        En la mayoría de distribuciones de Linux, puedes instalar <strong>NASM</strong> 
        y <strong>GCC</strong> usando el gestor de paquetes predeterminado. A continuación, 
        algunos ejemplos según tu distribución:
      </p>

      <div className="instalacion__code-container">
        <h4>Debian / Ubuntu / Linux Mint</h4>
        <SyntaxHighlighter language="bash" style={atomOneDark}>
{`sudo apt update
sudo apt install nasm gcc
`}
        </SyntaxHighlighter>
      </div>

      <div className="instalacion__code-container">
        <h4>Fedora / CentOS / RHEL</h4>
        <SyntaxHighlighter language="bash" style={atomOneDark}>
{`sudo dnf install nasm gcc
`}
        </SyntaxHighlighter>
      </div>

      <div className="instalacion__code-container">
        <h4>Arch / Manjaro</h4>
        <SyntaxHighlighter language="bash" style={atomOneDark}>
{`sudo pacman -S nasm gcc
`}
        </SyntaxHighlighter>
      </div>

      <p className="instalacion__text">
        Con estos comandos, estarás instalando tanto el ensamblador <strong>NASM</strong> 
        como el compilador <strong>GCC</strong> para C, necesario para enlazar proyectos 
        en modo 32 o 64 bits, según tu arquitectura.
      </p>

      <h3 className="instalacion__subtitle">2. Descarga directa de NASM (opcional)</h3>
      <p className="instalacion__text">
        Si necesitas una versión específica o la más reciente de NASM, puedes descargarla 
        directamente desde su sitio oficial:
      </p>
      <p className="instalacion__text">
        <a 
          href="https://www.nasm.us/pub/nasm/releasebuilds/" 
          target="_blank" 
          rel="noreferrer"
        >
          https://www.nasm.us/pub/nasm/releasebuilds/
        </a>
      </p>
      <p className="instalacion__text">
        Allí encontrarás paquetes para diferentes plataformas, así como el código fuente 
        de NASM. En muchos casos, puedes compilarlo manualmente con:
      </p>
      <div className="instalacion__code-container">
        <SyntaxHighlighter language="bash" style={atomOneDark}>
{`# Ejemplo (resumido):
tar xvf nasm-X.XX.tar.gz
cd nasm-X.XX
./configure
make
sudo make install
`}
        </SyntaxHighlighter>
      </div>

      <h3 className="instalacion__subtitle">3. Verificación de la instalación</h3>
      <p className="instalacion__text">
        Una vez instalados, puedes verificar las versiones en consola:
      </p>
      <div className="instalacion__code-container">
        <SyntaxHighlighter language="bash" style={atomOneDark}>
{`nasm -v
gcc --version
`}
        </SyntaxHighlighter>
      </div>
      <p className="instalacion__text">
        Si aparecen números de versión y no errores, ¡ya tienes <strong>NASM</strong> 
        y <strong>GCC</strong> listos para usar en tu sistema Linux!
      </p>
    </div>
  );
}

export default SeccionInstalacion;
