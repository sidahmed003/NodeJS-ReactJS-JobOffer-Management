const express = require('express');
const multer = require('multer');
const path = require('path');


const {
    ajouterNouvelleEntreprise,
    afficherEntreprises,
    afficherEntrepriseParId,
    modifierEntreprise,
    supprimerEntreprise,
    upload // Import du middleware d'upload depuis entrepriseController.js
} = require('./entrepriseController');

const router = express.Router();

// Configuration Multer pour gérer les fichiers
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});


//  Permettre l'accès aux images stockées dans le dossier 'uploads'
router.use('/uploads', express.static('uploads'));

//  Routes pour gérer les entreprises
router.post('/entreprises', upload.single('entreprise_image'), ajouterNouvelleEntreprise); //  Ajout d'image possible
router.get('/entreprises', afficherEntreprises);
router.get('/entreprises/:id', afficherEntrepriseParId);
router.put('/entreprises/:id', upload.single('entreprise_image'), modifierEntreprise); //  Modification d'image possible
router.delete('/entreprises/:id', supprimerEntreprise);

module.exports = router;
