import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ModifyEntreprise.css";

function ModifyEntreprise() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [nom, setNom] = useState("");
    const [activite, setActivite] = useState("");
    const [siege, setSiege] = useState("");

    // Charger les informations de l'entreprise
    useEffect(() => {
        axios.get(`http://localhost:5000/api/entreprises/${id}`)
            .then(response => {
                setNom(response.data.entreprise_nom);
                setActivite(response.data.entreprise_activite);
                setSiege(response.data.entreprise_siege);
            })
            .catch(error => console.error("Erreur:", error));
    }, [id]);

    // Envoyer la mise à jour
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/entreprises/${id}`, {
            entreprise_nom: nom,
            entreprise_activite: activite,
            entreprise_siege: siege
        })
        .then(() => {
            navigate("/entreprise");
        })
        .catch(error => console.error("Erreur:", error));
    };

    return (
        <div className="modify-entreprise-container">
            <h2>Modifier l'entreprise</h2>
            <form className="modify-entreprise-form" onSubmit={handleSubmit}>
                <label>Nom de l'entreprise</label>
                <input 
                    type="text" 
                    value={nom} 
                    onChange={(e) => setNom(e.target.value)} 
                    required 
                />

                <label>Activité</label>
                <input 
                    type="text" 
                    value={activite} 
                    onChange={(e) => setActivite(e.target.value)} 
                    required 
                />

                <label>Siège</label>
                <input 
                    type="text" 
                    value={siege} 
                    onChange={(e) => setSiege(e.target.value)} 
                    required 
                />

                <button type="submit" className="submit-button">Modifier</button>
            </form>
        </div>
    );
}

export default ModifyEntreprise;
