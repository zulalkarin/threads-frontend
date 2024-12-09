import React from "react";
import Dashboard from "./components/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <img className="logo-img" src={logo} alt="logo" />
          <div className="navbar-text">
            <h1>Thread Management System</h1>
          </div>
          <div></div>
        </div>
      </nav>

      <main className="main-content">
        <Dashboard />
      </main>

      <footer className="footer">
        <p>Thread Management System &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
