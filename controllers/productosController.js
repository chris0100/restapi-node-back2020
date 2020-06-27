const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');


//SUBIR UNA IMAGEN
const configuracionMulter = {
    limits: {fileSize: 1000000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname + '/../uploads/');
        },
        filename: (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, next) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //El formato es valido
            next(null, true);

        }
        //el formato no es valido
        else {
            //crea el error, se va a if(error) y toma el message del error
            next(new Error('Formato no valido'), false);
        }
    }
};


const upload = multer(configuracionMulter).single('imagen');


//POST - CARGA UNA IMAGEN PARA EL NUEVO PRODUCTO
exports.subirImagen = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({mensaje: error});
        }
        return next(); //manda al siguiente middleware
    });
};


//POST - AGREGA NUEVOS PRODUCTOS
exports.nuevoProducto = async (req, res) => {
    const producto = new Productos(req.body);
    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Producto agregado correctamente'});

    } catch (e) {
        console.log(e);
        next();
    }
};


//GET - MUESTRA LOS PRODUCTOS
exports.mostrarProductos = async (req, res, next) => {
    try {
        //Obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (e) {
        console.log(e);
        next();
    }
};


//GET MUESTRA UN PRODUCTO POR ID
exports.mostrarUnProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.id);

    if (!producto) {
        res.json({mensaje: 'Ese producto no existe'});
        return next();
    }

    //Mostrar el producto
    res.json(producto);
};


//PUT ACTUALIZA UN PRODUCTO
exports.actualizarProducto = async (req, res, next) => {
    try {
        //construir un nuevo producto
        let nuevoProducto = req.body;
        console.log(req.body);

        //verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
            console.log('hay un nuevo archivo de imagen: ' + nuevoProducto.image);
        } else {
            let productoAnterior = await Productos.findById(req.params.id);
            nuevoProducto.imagen = productoAnterior.imagen;
            console.log('se mantiene el mismo producto: ' + nuevoProducto.imagen);
        }


        console.log(nuevoProducto)
        let producto = await Productos.findOneAndUpdate({_id: req.params.id}, nuevoProducto, {new: true});
        res.json(producto);
        //console.log(res.json(producto));

    } catch (e) {
        console.log(e);
        return next();
    }
};


//DELETE ELIMINA EL PRODUCTO POR ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({_id: req.params.id});
        res.json({mensaje: 'El producto ha sido eliminado'});
    } catch (e) {
        console.log(e)
    }
};


//POST BUSCAR PRODUCTOS
exports.buscarProductos = async (req,res,next) => {
    try{
        //obtener el query
        const{query} = req.params;

        const producto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(producto);

    }catch (e) {
        console.log(e);
        next();
    }
}








