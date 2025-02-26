const db = require('../db'); // Connexion MySQL 

// Créer la table si elle n'existe pas
const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS entreprise (
            entreprise_id VARCHAR(10) PRIMARY KEY,
            entreprise_nom VARCHAR(255) NOT NULL,
            entreprise_activite VARCHAR(255) NOT NULL,
            entreprise_siege VARCHAR(255) NOT NULL,
            entreprise_image VARCHAR(255),
            apropos TEXT
        )
    `;
    db.query(sql, (err, result) => {
        if (err) console.error('Erreur lors de la création de la table entreprise:', err);
    });
};

// Ajouter une entreprise avec ID auto-généré
const ajouterEntreprise = (nom, activite, siege, image, apropos, callback) => {
    db.query(
        "SELECT entreprise_id FROM entreprise ORDER BY CAST(SUBSTRING_INDEX(entreprise_id, '_', -1) AS UNSIGNED) DESC LIMIT 1",
        (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération du dernier ID :", err);
                return callback(err, null);
            }

            let nextId = 1;
            if (result.length > 0) {
                const lastId = parseInt(result[0].entreprise_id.split('_')[1], 10);
                if (!isNaN(lastId)) {
                    nextId = lastId + 1;
                }
            }

            let newId = `ent_${nextId}`;

            // Vérifier si l'ID existe déjà
            db.query("SELECT COUNT(*) AS count FROM entreprise WHERE entreprise_id = ?", [newId], (err, result) => {
                if (err) {
                    console.error("Erreur lors de la vérification de l'ID :", err);
                    return callback(err, null);
                }

                if (result[0].count > 0) {
                    console.error(`L'ID ${newId} existe déjà. Incrémentation forcée.`);
                    nextId++;
                    newId = `ent_${nextId}`;
                }

                const sql = "INSERT INTO entreprise (entreprise_id, entreprise_nom, entreprise_activite, entreprise_siege, entreprise_image, apropos) VALUES (?, ?, ?, ?, ?, ?)";
                const valeurs = [newId, nom || "", activite || "", siege || "", image || "", apropos || ""];

                db.query(sql, valeurs, (err, result) => {
                    if (err) {
                        console.error("Erreur lors de l'insertion de l'entreprise :", err);
                        return callback(err, null);
                    }
                    return callback(null, result);
                });
            });
        }
    );
};



// Récupérer toutes les entreprises
const getEntreprises = (callback) => {
    db.query("SELECT * FROM entreprise", callback);
};

// Récupérer une entreprise par ID
const getEntrepriseById = (id, callback) => {
    db.query("SELECT * FROM entreprise WHERE entreprise_id = ?", [id], callback);
};

// Modifier une entreprise
const updateEntreprise = (id, nom, activite, siege, image, apropos, callback) => {
    let sql = "UPDATE entreprise SET entreprise_nom = ?, entreprise_activite = ?, entreprise_siege = ?, apropos = ?";
    let values = [nom || "", activite || "", siege || "", apropos || ""];

    if (image) {
        sql += ", entreprise_image = ?";
        values.push(image);
    }

    sql += " WHERE entreprise_id = ?";
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de l'entreprise :", err);
            return callback(err, null);
        }
        return callback(null, result);
    });
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
