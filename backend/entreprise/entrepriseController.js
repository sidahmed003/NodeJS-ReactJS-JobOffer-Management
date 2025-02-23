const { ajouterEntreprise, getEntreprises, getEntrepriseById, updateEntreprise, deleteEntreprise } = require('./entrepriseModel');

// Ajouter une entreprise
const ajouterNouvelleEntreprise = (req, res) => {
    const { entreprise_nom, entreprise_activite, entreprise_siege } = req.body;

    if (!entreprise_nom || !entreprise_activite || !entreprise_siege) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    ajouterEntreprise(entreprise_nom, entreprise_activite, entreprise_siege, (err, result) => {
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

// Mettre à jour une entreprise
const modifierEntreprise = (req, res) => {
    const { id } = req.params;
    const { entreprise_nom, entreprise_activite, entreprise_siege } = req.body;

    updateEntreprise(id, entreprise_nom, entreprise_activite, entreprise_siege, (err, result) => {
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
    supprimerEntreprise
};
