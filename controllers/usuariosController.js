const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.RegistrarUsuario = async (req, res) => {
    //leer los datos del usuario
    const usuario = new Usuarios(req.body);

    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'})
    } catch (e) {
        console.log(e);
        res.json({mensaje: 'Hubo un error'});
    }

}


exports.autenticarUsuario = async (req, res, next) => {
    //buscar el usuario
    const {email, password} = req.body;
    const usuario = await Usuarios.findOne({email: req.body.email});

    if (!usuario) {
        //si el usuario no existe
        await res.status(401).json({mensaje: 'Ese usuario no existe'});
        next();
    } else {
        //el usuario existe, verifica el password
        if (!bcrypt.compareSync(password, usuario.password)) {
            await res.status(401).json({mensaje: 'Password incorrecto'});
            next();
        } else {
            const token = jwt.sign({
                    email: usuario.email,
                    nombre: usuario.nombre,
                    _id: usuario._id
                }, 'LLAVESECRETA',
                {
                    expiresIn: '4h'
                });

            //retornar el TOKEN
            res.json({token});
        }
    }


}