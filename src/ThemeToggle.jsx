import React from "react";
import "./ThemeToggle.css";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className={`toggle-container ${theme}`} onClick={toggleTheme}>
      <div className="toggle-slider">
        {theme === "light" ? (
          <span className="icon sun">☀️</span>
        ) : (
          <span className="icon moon">🌙</span>
        )}
      </div>
    </div>
  );
}

export default ThemeToggle;
