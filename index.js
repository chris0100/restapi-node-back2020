const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//crea el servidor
const app = express();

//habilita bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Habilitar cors
app.use(cors());


//Rutas de la app
app.use('/', routes());

//puerto
app.listen(5001);


