import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEntreprise.css";

const AddEntreprise = () => {
    const [nom, setNom] = useState("");
    const [activite, setActivite] = useState("");
    const [siege, setSiege] = useState("");
    const [apropos, setApropos] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("entreprise_nom", nom);
        formData.append("entreprise_activite", activite);
        formData.append("entreprise_siege", siege);
        formData.append("entreprise_apropos", apropos);
        if (image) formData.append("entreprise_image", image);

        try {
            await axios.post("http://localhost:5000/api/entreprises", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/entreprise");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'entreprise :", error);
        }
    };

    return (
        <div className="add-entreprise-container">
            <h2>Ajouter une entreprise</h2>

            {/* Zone d'upload stylée */}
            <label className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                {imagePreview ? (
                    <img src={imagePreview} alt="Aperçu" className="image-preview" />
                ) : (
                    <span>Ajouter une image</span>
                )}
            </label>

            <form onSubmit={handleSubmit} className="add-entreprise-form">
                <label>Nom de l'entreprise :</label>
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />

                <label>Activité :</label>
                <input type="text" value={activite} onChange={(e) => setActivite(e.target.value)} required />

                <label>Siège :</label>
                <input type="text" value={siege} onChange={(e) => setSiege(e.target.value)} required />

                <label>À propos :</label>
                <textarea value={apropos} onChange={(e) => setApropos(e.target.value)} rows="4" required />

                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </div>
    );
};

export default AddEntreprise;
