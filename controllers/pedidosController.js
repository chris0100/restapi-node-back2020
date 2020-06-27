const Pedidos = require('../models/Pedidos');

// POST - AGREGAR PEDIDOS
exports.nuevoPedido = async (req,res,next) => {
    const pedido = new Pedidos(req.body);
    try{
        await pedido.save();
        res.json({mensaje: 'Se agrego nuevo pedido'})
    }catch (e) {
        console.log(e);
        next();
    }
};



//GET - MOSTRAR LOS PEDIDOS, el populate muestra info del selector
exports.mostrarPedidos = async (req,res,next) => {
    try{
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    }catch (e) {
        console.log(e);
        next();
    }
};


//GET - MUESTRA UN SOLO PEDIDO POR ID
exports.mostrarUnPedido = async (req,res,next) => {
    const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
        path : 'pedido.producto',
        model: 'Productos'
    });
    try{
        if (!pedido){
            res.json({mensaje : 'Ese pedido no existe'});
            return next();
        }

        //mostrar el pedido
        res.json(pedido);
    }catch(e){
        console.log(e);
        next();
    }
};

//PUT ACTUALIZAR EL PEDIDO POR ID
exports.actualizarPedido = async (req,res,next) => {
    try{
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.id}, req.body, {
            new: true
        }).populate('cliente').populate({
            path : 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido);
    }catch (e) {
        console.log(error);
        next();
    }
};



//ELIMINAR PEDIDO POR ID
exports.eliminarPedido = async (req,res,next) => {
  try{
      await Pedidos.findOneAndDelete({_id : req.params.id});
      res.json({ mensaje : 'El pedido se ha eliminado'});
  }catch(e){
      console.log(e);
      next();
  }
};

















