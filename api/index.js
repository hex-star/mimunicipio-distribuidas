//index.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 8000;
const cors = require('cors');
const barrios = require('./routes/barrios');
const rubros = require('./routes/rubros');
const usuarios = require('./routes/usuarios');
const sitios = require('./routes/sitios');
const denuncias = require('./routes/denuncias');
const reclamos = require('./routes/reclamos');
const publicaciones = require('./routes/publicaciones');

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('..', 'client', 'build')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req, res) => res.send('Hello world'));
app.use('/api/barrios', barrios);
app.use('/api/rubros', rubros);
app.use('/api/usuarios', usuarios);
app.use('/api/sitios', sitios);
app.use('/api/denuncias', denuncias);
app.use('/api/reclamos', reclamos);
app.use('/api/publicaciones', publicaciones);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
