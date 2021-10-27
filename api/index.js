//index.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;
const cors = require('cors');

const barrios = require('./routes/barrios');
const rubros = require('./routes/rubros');
const usuarios = require('./routes/usuarios');
var corsOptions = {

  origin: '*'

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('..', 'client', 'build')));

app.get('/api', (req, res) => res.send('Hello world'));
app.use('/api/barrios', barrios);
app.use('/api/rubros', rubros);
app.use('/api/usuarios', usuarios);
app.use(cors(corsOptions));
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('ok');
});

app.use((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

