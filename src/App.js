import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./components/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <GlobalStyles />

      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <FontAwesomeIcon icon={faCode} />
            Thread Yönetim Sistemi
          </div>
          <div></div>
        </div>
      </nav>

      <main className="main-content">
        <Dashboard />
      </main>

      <footer className="footer">
        <p>Thread Yönetim Sistemi &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
