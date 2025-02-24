const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { createTable } = require('./entreprise/entrepriseModel');
const entrepriseRoutes = require('./entreprise/entrepriseRoutes');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de CORS pour autoriser les requêtes depuis React
app.use(cors({
    origin: 'http://localhost:3000', // Autorise uniquement React en développement
    methods: 'GET,POST,PUT,DELETE', // Autorise ces méthodes HTTP
    credentials: true // Autorise les cookies et les headers d'authentification
}));

app.use(express.json()); // Pour traiter les requêtes JSON

app.get('/', (req, res) => {
    res.send('Hello depuis Express avec CORS activé !');
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// Permet d'accéder aux images depuis le frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

createTable(); // Exécute la création de la table
app.use('/api', entrepriseRoutes);