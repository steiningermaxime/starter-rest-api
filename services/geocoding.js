const axios = require('axios');

async function geocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erreur de géocodage inverse:', error);
    throw error;
  }
}

module.exports = { geocode };
