const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Adresse du serveur MySQL
    user: 'root', // Remplace par ton utilisateur MySQL si différent
    password: '', // Mets ton mot de passe MySQL si tu en as un
    database: 'employees' // Assure-toi que c'est bien le nom de ta base
});

// Connecter à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

module.exports = db;
