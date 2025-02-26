import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEntreprise.css";

const AddEntreprise = () => {
    const navigate = useNavigate();

    const [entrepriseNom, setEntrepriseNom] = useState("");
    const [entrepriseActivite, setEntrepriseActivite] = useState("");
    const [entrepriseSiege, setEntrepriseSiege] = useState("");
    const [apropos, setApropos] = useState(""); 
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState("");

    // Gérer l'ajout d'une image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Envoyer les données du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!entrepriseNom || !entrepriseActivite || !entrepriseSiege || !apropos) {
            setMessage("Tous les champs sont obligatoires !");
            return;
        }

        const formData = new FormData();
        formData.append("entreprise_nom", entrepriseNom);
        formData.append("entreprise_activite", entrepriseActivite);
        formData.append("entreprise_siege", entrepriseSiege);
        formData.append("apropos", apropos); 
        if (image) formData.append("entreprise_image", image);

        try {
            await axios.post("http://localhost:5000/api/entreprises", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage("Entreprise ajoutée avec succès !");
            navigate("/entreprise");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'entreprise :", error);
            setMessage("Une erreur est survenue.");
        }
    };

    return (
        <div className="add-entreprise-container">
            <h2>Ajouter une entreprise</h2>
            {message && <p className="message">{message}</p>}

            {/* Aperçu de l'image */}
            <label className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                {imagePreview ? (
                    <img src={imagePreview} alt="Aperçu" className="image-preview" />
                ) : (
                    <span>Ajouter une image</span>
                )}
            </label>

            <form className="add-entreprise-form" onSubmit={handleSubmit}>
                <label>Nom de l'entreprise</label>
                <input 
                    type="text" 
                    value={entrepriseNom} 
                    onChange={(e) => setEntrepriseNom(e.target.value)} 
                    required 
                />

                <label>Activité</label>
                <input 
                    type="text" 
                    value={entrepriseActivite} 
                    onChange={(e) => setEntrepriseActivite(e.target.value)} 
                    required 
                />

                <label>Siège</label>
                <input 
                    type="text" 
                    value={entrepriseSiege} 
                    onChange={(e) => setEntrepriseSiege(e.target.value)} 
                    required 
                />

                <label>À propos</label>
                <textarea 
                    value={apropos} 
                    onChange={(e) => setApropos(e.target.value)} 
                    rows="4" 
                    required 
                />

                <button type="submit" className="submit-button">Ajouter</button>
            </form>
        </div>
    );
};

export default AddEntreprise;
