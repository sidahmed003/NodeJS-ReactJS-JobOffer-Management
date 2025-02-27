import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SpecifiedEntreprise.css";

const SpecifiedEntreprise = () => {
    const { id } = useParams();
    const [entreprise, setEntreprise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/entreprises/${id}`)
            .then(response => {
                setEntreprise(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
                setError("Impossible de charger les informations de l'entreprise.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="loading">Chargement...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="specified-entreprise-container">
            <h2>{entreprise.entreprise_nom}</h2>
            <img 
                src={`http://localhost:5000/${entreprise.entreprise_image}`} 
                alt={entreprise.entreprise_nom} 
                className="entreprise-image" 
                onError={(e) => e.target.src = "/default-image.jpg"} 
            />
            <p><strong>Activité :</strong> {entreprise.entreprise_activite}</p>
            <p><strong>Siège :</strong> {entreprise.entreprise_siege}</p>
            <p><strong>À propos :</strong> {entreprise.apropos}</p>
        </div>
    );
};

export default SpecifiedEntreprise;
