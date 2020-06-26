const Clientes = require('../models/Clientes');

//POST AGREGAR CLIENTE
exports.nuevoCliente = async (req,res, next) => {
    const cliente = new Clientes(req.body);

    try{
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'})

    }catch (e) {
        res.send(e);
        next();

    }

};


//GET - OBTENER CLIENTES
exports.obtenerClientes = async (req,res,next) => {
    try{
        const clientes = await Clientes.find({});
        res.json(clientes);
    }catch(e){
        console.log(e);
    }
};


//GET OBTIENE UN SOLO CLIENTE
exports.mostrarCliente = async (req,res,next) => {
    const cliente = await Clientes.findById(req.params.id);

    if (!cliente){
        res.json({mensaje: 'Ese cliente no existe'});
        next()
    }

    //Mostrar el cliente
    res.json(cliente);
};


//PUT ACTUALIZA UN CLIENTE POR EL ID
exports.actualizarCliente = async (req,res,next) => {
  try{
      const cliente = await Clientes.findOneAndUpdate({_id : req.params.id},
          req.body, {
          new: true
          });
      res.json(cliente);

  }catch (e) {
      res.send(e)
      next();
  }
};


//DELETE - ELIMINA UN CLIENTE POR SU ID
exports.eliminarCliente = async (req,res,next) => {
    try{
        await Clientes.findOneAndDelete({_id : req.params.id});
        res.json({mensaje : 'El cliente se ha eliminado'});
    }catch (e) {
        console.log(e);
        next();
    }
}
