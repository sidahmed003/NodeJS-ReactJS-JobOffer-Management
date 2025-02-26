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
    const [message, setMessage] = useState("");

    // Charger les informations de l'entreprise
    useEffect(() => {
        axios.get(`http://localhost:5000/api/entreprises/${id}`)
            .then(response => {
                console.log("Données récupérées :", response.data);
                setNom(response.data.entreprise_nom || "");
                setActivite(response.data.entreprise_activite || "");
                setSiege(response.data.entreprise_siege || "");
                setApropos(response.data.apropos || ""); // Correction ici
                if (response.data.entreprise_image) {
                    setImagePreview(`http://localhost:5000/${response.data.entreprise_image}`);
                } else {
                    setImagePreview(null);
                }
            })
            .catch(error => console.error("Erreur lors du chargement des données :", error));
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nom || !activite || !siege || !apropos) {
            setMessage("Tous les champs sont obligatoires !");
            return;
        }

        const formData = new FormData();
        formData.append("entreprise_nom", nom);
        formData.append("entreprise_activite", activite);
        formData.append("entreprise_siege", siege);
        formData.append("apropos", apropos); // Correction ici
        if (image) formData.append("entreprise_image", image);

        try {
            await axios.put(`http://localhost:5000/api/entreprises/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("Entreprise modifiée avec succès !");
            setTimeout(() => navigate("/entreprise"), 2000); // Redirection après 2 secondes
        } catch (error) {
            console.error("Erreur lors de la modification :", error);
            setMessage("Une erreur est survenue.");
        }
    };

    return (
        <div className="modify-entreprise-container">
            <h2>Modifier l'entreprise</h2>
            {message && <p className="message">{message}</p>}

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
