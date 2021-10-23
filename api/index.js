//index.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const barrios = require('./routes/barrios');
const rubros = require('./routes/rubros');
const usuarios = require('./routes/usuarios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('..', 'client', 'build')));

app.get('/api', (req, res) => res.send('Hello world'));
app.use('/api/barrios', barrios);
app.use('/api/rubros', rubros);
app.use('/api/usuarios', usuarios);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
