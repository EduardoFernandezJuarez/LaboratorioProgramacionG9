const express = require("express");

const app = express();
const path = require('path');
const fs = require('fs');
const port = 4000;

const coso = (path.join(__dirname, '../public'));

app.use(express.static(coso));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(port, () => {
  console.log(`Pruebe el servidor en un navegador accediendo a http://localhost:4000`);
});