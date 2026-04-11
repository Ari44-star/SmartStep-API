const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Ruta principal para que sepas que la API funciona
app.get('/', (req, res) => {
  res.send('API de SmartStep funcionando correctamente');
});

// Esta es la ruta que consultará tu App de Visual Studio
app.get('/api/sensor', (req, res) => {
  res.json({
    dispositivo: "Guante-SmartStep-V1",
    usuario: "Ariatna Deloya",
    // Datos simulados del sensor que pide la Actividad 3
    obstaculo_detectado: true,
    distancia_cm: 15,
    alerta_caida: false,
    mensaje: "¡Cuidado! Obstáculo a 15cm",
    color_alerta: "#FF5F1F", // Naranja oficial de tu diseño
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});