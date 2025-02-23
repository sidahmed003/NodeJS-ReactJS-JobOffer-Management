const express = require('express');
const {
    ajouterNouvelleEntreprise,
    afficherEntreprises,
    afficherEntrepriseParId,
    modifierEntreprise,
    supprimerEntreprise
} = require('./entrepriseController');

const router = express.Router();

router.post('/entreprises', ajouterNouvelleEntreprise);
router.get('/entreprises', afficherEntreprises);
router.get('/entreprises/:id', afficherEntrepriseParId);
router.put('/entreprises/:id', modifierEntreprise);
router.delete('/entreprises/:id', supprimerEntreprise);

module.exports = router;
