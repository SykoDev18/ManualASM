import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/hola.png'
import './App.css'
import Navbar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import Welcome from './components/Bienvenida/Welcome'
import Frases from './components/Carrusel frases/CarouselF'
import Posible from './components/Posible/Posible'
import Cookie from './components/Cookies/Cookie'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Welcome />
      <Frases />
      <Posible />
      <Cookie />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://github.com/las-nish/NASM-Assembly-Collection" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hola Mundo desde Oaxaca</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          HOLAS {count}
        </button>
        <p>
          Esto pronto sera un manual de asm, neta me lo dijo un tio
        </p>
      </div>
      <p className="read-the-docs">
        No clickes en el logo de React, es una trampa
      </p>
      <Footer />
    </>
  )
}

export default App
