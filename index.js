const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'})

//CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});


//crea el servidor
const app = express();


//habilita bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//definir un dominio para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        //revisar si la peticion viene de un servidor que esta en whitelist
        const existe = whitelist.some(dominio => dominio === origin);

        if (existe){
            callback(null, true);
        }
        else{
            callback(new Error('No permitido'));
        }
    }
}


//Habilitar cors
app.use(cors(corsOptions));


//Rutas de la app
app.use('/', routes());

//carpeta publica
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5001;


//puerto
app.listen(port, () => {
    console.log('el servidor esta funcionando')
});


