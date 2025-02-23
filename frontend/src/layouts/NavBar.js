import { Link } from "react-router-dom";
import "./NavBar.css"; // Style pour la barre de navigation

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/entreprise" className="nav-item">Entreprise</Link> 
            </div>
        </nav>
    );
}

export default Navbar;
