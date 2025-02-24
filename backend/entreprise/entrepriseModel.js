const db = require('../db'); // Connexion MySQL

// Créer la table si elle n'existe pas
const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS entreprise (
            entreprise_id VARCHAR(10) PRIMARY KEY,
            entreprise_nom VARCHAR(255) NOT NULL,
            entreprise_activite VARCHAR(255) NOT NULL,
            entreprise_siege VARCHAR(255) NOT NULL
        )
    `;
    db.query(sql, (err, result) => {
        if (err) console.error('Erreur lors de la création de la table entreprise:', err);
    });
};

// Ajouter une entreprise avec ID auto-généré
const ajouterEntreprise = (nom, activite, siege, image, callback) => {
    db.query("SELECT entreprise_id FROM entreprise ORDER BY entreprise_id DESC LIMIT 1", (err, result) => {
        if (err) return callback(err, null);

        let nextId = 1;
        if (result.length > 0) {
            const lastId = parseInt(result[0].entreprise_id.split('_')[1]);
            nextId = lastId + 1;
        }
        const newId = `ent_${nextId}`;

        const sql = "INSERT INTO entreprise (entreprise_id, entreprise_nom, entreprise_activite, entreprise_siege, entreprise_image) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [newId, nom, activite, siege, image], callback);
    });
};

// Récupérer toutes les entreprises
const getEntreprises = (callback) => {
    db.query("SELECT * FROM entreprise", callback);
};

// Récupérer une entreprise par ID
const getEntrepriseById = (id, callback) => {
    db.query("SELECT * FROM entreprise WHERE entreprise_id = ?", [id], callback);
};

const updateEntreprise = (id, nom, activite, siege, image, callback) => {
    let sql = "UPDATE entreprise SET entreprise_nom = ?, entreprise_activite = ?, entreprise_siege = ?";
    let values = [nom, activite, siege];

    if (image) {
        sql += ", entreprise_image = ?";
        values.push(image);
    }

    sql += " WHERE entreprise_id = ?";
    values.push(id);

    db.query(sql, values, callback);
};

// Supprimer une entreprise
const deleteEntreprise = (id, callback) => {
    db.query("DELETE FROM entreprise WHERE entreprise_id = ?", [id], callback);
};

module.exports = {
    createTable,
    ajouterEntreprise,
    getEntreprises,
    getEntrepriseById,
    updateEntreprise,
    deleteEntreprise
};
