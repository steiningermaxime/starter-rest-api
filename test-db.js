// Importez le module mysql2
const mysql = require('mysql2');

// Configurez la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost', // Remplacez par l'hôte de votre base de données
  user: 'root', // Remplacez par votre nom d'utilisateur
  password: '', // Remplacez par votre mot de passe
  database: 'gestion_eboueurs', // Remplacez par le nom de votre base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

