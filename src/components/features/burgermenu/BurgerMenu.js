import React, { useState } from "react";
import "./BurgerMenu.css";

export const BurgerMenu = ({
  linkOneClick,
  linkTwoClick,
  linkThreeClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Burger Icon */}
      <button className="burger-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}

      {/* Slide-out Panel */}
      <div className={`side-panel ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          ✕
        </button>
        <nav className="menu-content">
          <h2>Menu</h2>
          <ul>
            <li onClick={() => {
              linkOneClick();
              toggleMenu();
            }}>
              <a href="#">Add Board</a>
            </li>
            
            <li onClick={() => {
              linkTwoClick();
              toggleMenu();
            }}>
              <a href="#">Add Tag</a>
            </li>

            <li onClick={() => {
              linkThreeClick();
              toggleMenu();
            }}>
              <a href="#">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}