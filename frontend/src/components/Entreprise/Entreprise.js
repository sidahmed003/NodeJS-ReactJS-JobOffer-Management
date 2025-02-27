import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Entreprise.css";  

function Entreprise() {
    const [searchTerm, setSearchTerm] = useState("");
    const [entreprises, setEntreprises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEntreprises();
    }, []);

    const fetchEntreprises = () => {
        axios.get("http://localhost:5000/api/entreprises")
            .then(response => { 
                setEntreprises(response.data);
            })
            .catch(error => console.error("Erreur:", error));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette entreprise ?")) {
            try {
                await axios.delete(`http://localhost:5000/api/entreprises/${id}`);
                setEntreprises(entreprises.filter(entreprise => entreprise.entreprise_id !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
    };

    const handleMoreInfo = (id) => {
        navigate(`/entreprise/${id}`);
    };

    const filteredEntreprises = entreprises.filter(entreprise =>
        entreprise.entreprise_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entreprise.entreprise_activite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entreprise.entreprise_siege.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="entreprise-container">
            {/* Barre de recherche + Bouton Ajouter */}
            <div className="search-add">
                <input 
                    type="text"
                    className="search-bar"
                    placeholder="Rechercher une entreprise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to="/ajouter-entreprise" className="add-button">+ Ajouter une entreprise</Link>
            </div>

            {/* Liste des entreprises affichées en grille */}
            <div className="entreprise-grid">
                {filteredEntreprises.map((entreprise) => (
                    <div key={entreprise.entreprise_id} className="entreprise-card">
                        <div className="options">
                            <span className="dots">⋮</span>
                            <div className="dropdown">
                                <Link to={`/modifier-entreprise/${entreprise.entreprise_id}`} className="edit-button">Modifier</Link>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(entreprise.entreprise_id)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>

                        <img 
                            src={`http://localhost:5000/${entreprise.entreprise_image}`} 
                            alt={entreprise.entreprise_nom} 
                            className="entreprise-image" 
                            onError={(e) => e.target.src = "/default-image.jpg"} 
                        />

                        <div className="entreprise-details">
                            <h3>{entreprise.entreprise_nom}</h3>
                            <p><strong>Activité :</strong> {entreprise.entreprise_activite}</p>
                            <p><strong>Siège :</strong> {entreprise.entreprise_siege}</p>
                        </div>

                        <div className="entreprise-actions">
                            <button 
                                className="action-button" 
                                onClick={() => handleMoreInfo(entreprise.entreprise_id)}
                            >
                                En savoir plus
                            </button>
                            <Link to={`/offres-emplois/${entreprise.entreprise_id}`} className="action-button">Offres d'emplois</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Entreprise;
