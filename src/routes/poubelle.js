const express = require('express');
const router = express.Router();
const db = require('../../database/database'); // Assurez-vous que le chemin est correct
const { geocode } = require('../../services/geocoding'); // Importez la fonction de géocodage

// GET toutes les poubelles
router.get('/', (req, res) => {
  db.query('SELECT * FROM poubelle', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// GET une poubelle par ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM poubelle WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});

// POST une nouvelle poubelle
router.post('/', async (req, res) => {
  const { nom, etat, latitude, longitude } = req.body;

  try {
    const addressData = await geocode(latitude, longitude);
    
    // Assurez-vous que ces champs correspondent à la structure de la réponse Nominatim
    const { house_number, road, neighbourhood, suburb,town,postcode, county } = addressData.address;

    const query = 'INSERT INTO poubelle (nom, etat, latitude, longitude, numero_maison, rue, quartier, secteur, ville, code_postal, pays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nom, etat, latitude, longitude, house_number, road, neighbourhood, suburb,town,postcode,county ], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Poubelle ajoutée', id: result.insertId });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur de géocodage: ' + error.message });
  }
});


// PUT pour mettre à jour une poubelle
router.put('/:id', async (req, res) => {
  const { id, nom, etat, latitude, longitude } = req.body;

  try {
    const addressData = await geocode(latitude, longitude);
    const { numero_maison, rue, quartier, secteur, ville, code_postal, pays } = addressData.address; // Décomposez l'adresse retournée

    const query = 'UPDATE poubelle SET nom = ?, etat = ?, latitude = ?, longitude = ?, numero_maison = ?, rue = ?, quartier = ?, secteur = ?, ville = ?, code_postal = ?, pays = ? WHERE id = ?';
    db.query(query, [nom, etat, latitude, longitude, numero_maison, rue, quartier, secteur, ville, code_postal, pays, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Poubelle mise à jour' });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur de géocodage' });
  }
});
// DELETE une poubelle
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM poubelle WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Poubelle supprimée' });
  });
});

module.exports = router;
