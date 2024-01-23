const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importez le package cors

// Importez la connexion à la base de données
const db = require('./database/database');

const app = express();
// Middleware pour ignorer les requêtes favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// ... le reste de votre code ...

// Configuration du CORS
// Note : En production, vous devriez remplacer '*' par l'URL de votre frontend
app.use(cors({
  origin: '*' // Autorise toutes les origines (à ajuster selon vos besoins)
}));

// Body parser pour analyser les requêtes JSON
app.use(bodyParser.json());

// Importez les routes
const employeeRoutes = require('./src/routes/employee');
const poubelleRoutes = require('./src/routes/poubelle');

// Utilisez les routes
app.use('/api/employee', employeeRoutes);
app.use('/api/poubelle', poubelleRoutes);

// Gestion des erreurs 404 (Route non trouvée)
app.use((req, res, next) => {
  const error = new Error('Route non trouvée');
  error.status = 404;
  next(error);
});

// Gestionnaire d'erreurs (toutes les erreurs)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    erreur: {
      message: error.message
    }
  });
});

// Démarrez le serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
