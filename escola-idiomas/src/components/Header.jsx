import PropTypes from 'prop-types';
import { useState } from "react";
import '../styles/styles.css';

function Header({ button }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <nav className="navbar">
                <button className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </button>
                <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
                    <li className="nav-item"><a href="/student/">Alunos</a></li>
                    <li className="nav-item"><a href="/teacher/">Professores</a></li>
                    <li className="nav-item"><a href="/course/">Cursos</a></li>
                    <li className="nav-item"><a href="/class/">Turmas</a></li>
                    <li className="nav-item"><a href="/">Início</a></li>
                </ul>
            </nav>

            {button && (
                <div className="header-button">
                    {button}
                </div>
            )}
        </header>
    );

    
};

Header.propTypes = {
    button: PropTypes.element
};

export default Header;
