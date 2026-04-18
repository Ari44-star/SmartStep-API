const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// IMPORTANTE: Esto permite que el servidor entienda los datos JSON que manda la ESP32
app.use(express.json());

// Variable para guardar el último dato recibido
let datosSensor = {
    dispositivo: "Guante-SmartStep-V1",
    usuario: "Ariatna Deloya",
    obstaculo_detectado: false,
    distancia_cm: 0,
    mensaje: "Esperando datos...",
    color_alerta: "#4CAF50",
    timestamp: new Date().toISOString()
};

app.get('/', (req, res) => {
  res.send('API de SmartStep funcionando correctamente');
});

// 1. RUTA PARA LA APP (Leer datos)
app.get('/api/sensor', (req, res) => {
  res.json(datosSensor);
});

// 2. NUEVA RUTA PARA LA ESP32 (Recibir datos)
app.post('/api/sensor', (req, res) => {
  const { distancia_cm, mensaje, color_alerta } = req.body;
  
  // Actualizamos la variable con lo que mandó la placa física
  datosSensor = {
    ...datosSensor,
    distancia_cm: distancia_cm,
    mensaje: mensaje,
    color_alerta: color_alerta,
    obstaculo_detectado: distancia_cm < 30,
    timestamp: new Date().toISOString()
  };

  console.log("Datos recibidos de la ESP32:", datosSensor);
  res.status(201).json({ estado: "Datos actualizados" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});