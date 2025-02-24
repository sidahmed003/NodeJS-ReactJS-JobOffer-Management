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
    const [apropos, setApropos] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Charger les informations de l'entreprise
    useEffect(() => {
        axios.get(`http://localhost:5000/api/entreprises/${id}`)
            .then(response => {
                console.log("Données récupérées :", response.data); // Ajout de log
                setNom(response.data.entreprise_nom);
                setActivite(response.data.entreprise_activite);
                setSiege(response.data.entreprise_siege);
                setApropos(response.data.entreprise_apropos || ""); // Ajout d'une valeur par défaut
                if (response.data.entreprise_image) {
                    setImagePreview(`http://localhost:5000/${response.data.entreprise_image}`);
                } else {
                    setImagePreview(null);
                }
            })
            .catch(error => console.error("Erreur:", error));
    }, [id]);
    

    // Gérer le changement d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Envoyer la mise à jour
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("entreprise_nom", nom);
        formData.append("entreprise_activite", activite);
        formData.append("entreprise_siege", siege);
        formData.append("entreprise_apropos", apropos);
        if (image) formData.append("entreprise_image", image);

        axios.put(`http://localhost:5000/api/entreprises/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
            navigate("/entreprise");
        })
        .catch(error => console.error("Erreur:", error));
    };

    return (
        <div className="modify-entreprise-container">
            <h2>Modifier l'entreprise</h2>

            {/* Zone d'affichage et de modification de l'image */}
            <label className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                {imagePreview ? (
                    <img src={imagePreview} alt="Entreprise" className="image-preview" />
                ) : (
                    <span>Ajouter une image</span>
                )}
            </label>

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

                <label>À propos</label>
                <textarea 
                    value={apropos} 
                    onChange={(e) => setApropos(e.target.value)} 
                    rows="4" 
                    required 
                />

                <button type="submit" className="submit-button">Modifier</button>
            </form>
        </div>
    );
}

export default ModifyEntreprise;
