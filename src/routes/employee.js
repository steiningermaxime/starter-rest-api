// api/routes/employee.js
const express = require('express');
const router = express.Router();
const db = require('../../database/database'); // Assurez-vous que le chemin est correct

router.get('/', (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
