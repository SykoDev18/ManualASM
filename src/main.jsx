import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ScrollToTop/>
    <App />
  </HashRouter>
);