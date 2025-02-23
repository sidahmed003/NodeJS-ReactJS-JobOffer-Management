import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEntreprise.css";

const AddEntreprise = () => {
    const [nom, setNom] = useState("");
    const [activite, setActivite] = useState("");
    const [siege, setSiege] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/entreprises", {
                entreprise_nom: nom,
                entreprise_activite: activite,
                entreprise_siege: siege
            });
            navigate("/entreprise");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'entreprise :", error);
        }
    };

    return (
        <div className="add-entreprise-container">
            <h2>Ajouter une entreprise</h2>
            <form onSubmit={handleSubmit} className="add-entreprise-form">
                <label>Nom de l'entreprise :</label>
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />

                <label>Activité :</label>
                <input type="text" value={activite} onChange={(e) => setActivite(e.target.value)} required />

                <label>Siège :</label>
                <input type="text" value={siege} onChange={(e) => setSiege(e.target.value)} required />

                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </div>
    );
};

export default AddEntreprise;
