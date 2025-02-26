const { ajouterEntreprise, getEntreprises, getEntrepriseById, updateEntreprise, deleteEntreprise } = require('./entrepriseModel');
const multer = require('multer');
const path = require('path');

// Configuration du stockage des images avec multer
const storage = multer.diskStorage({
    destination: './uploads/', // Stocke les images dans le dossier 'uploads'
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); // Génère un nom unique
    }
});

// Initialisation de multer
const upload = multer({ storage });

// Ajouter une entreprise (avec gestion des images)
const ajouterNouvelleEntreprise = (req, res) => {
    const { entreprise_nom, entreprise_activite, entreprise_siege, apropos } = req.body; // Ajout de "apropos"
    const entreprise_image = req.file ? req.file.path : null; // Récupère le chemin de l'image si elle existe

    if (!entreprise_nom || !entreprise_activite || !entreprise_siege || !apropos) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    ajouterEntreprise(entreprise_nom, entreprise_activite, entreprise_siege, entreprise_image, apropos, (err, result) => { // Ajout de "apropos"
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'entreprise.' });
        }
        res.json({ message: 'Entreprise ajoutée avec succès.', data: result });
    });
};

// Obtenir toutes les entreprises
const afficherEntreprises = (req, res) => {
    getEntreprises((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des entreprises.' });
        }
        res.json(result);
    });
};

// Obtenir une seule entreprise par ID
const afficherEntrepriseParId = (req, res) => {
    const { id } = req.params;

    getEntrepriseById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération de l\'entreprise.' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Entreprise non trouvée.' });
        }
        res.json(result[0]);
    });
};

// Mettre à jour une entreprise (ajout de l'image optionnelle)
const modifierEntreprise = (req, res) => {
    const { id } = req.params;
    const { entreprise_nom, entreprise_activite, entreprise_siege, apropos } = req.body; // Ajout de "apropos"
    const entreprise_image = req.file ? req.file.path : null; // Vérifie si une nouvelle image est envoyée

    updateEntreprise(id, entreprise_nom, entreprise_activite, entreprise_siege, entreprise_image, apropos, (err, result) => { // Ajout de "apropos"
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entreprise.' });
        }
        res.json({ message: 'Entreprise mise à jour avec succès.' });
    });
};

// Supprimer une entreprise
const supprimerEntreprise = (req, res) => {
    const { id } = req.params;

    deleteEntreprise(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'entreprise.' });
        }
        res.json({ message: 'Entreprise supprimée avec succès.' });
    });
};

module.exports = {
    ajouterNouvelleEntreprise,
    afficherEntreprises,
    afficherEntrepriseParId,
    modifierEntreprise,
    supprimerEntreprise,
    upload // Export de multer pour l'utiliser dans les routes
};
